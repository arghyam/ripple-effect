import {CSSProperties, useEffect, useRef, useState } from 'react';
import BarChart from '../components/Barchart';
import WFTBG from '../components/wft_calculator/wft_text_bg.png'
import { FaShareAlt } from 'react-icons/fa';
import { getUserTotalWft, getUserWftProgress } from '../api/apiService';
import { Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import styled from 'styled-components';


interface DayWft {
  dayName: string;
  water_footprint: number;
}

interface Platform {
  url: string;
}

const DashboardScreen = () => {
  const [dayWfts, setDayWfts] = useState<DayWft[]>([]);
  const [mTotalWft, setMTotalWft] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [chartImage, setChartImage] = useState<string>('');
  const chartRef = useRef<HTMLDivElement | null>(null);
  const shareButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 760);


  const fetchDayWfts = async (userId: string) => {
    try {
      const response = await getUserWftProgress(userId);
      setDayWfts(response.queryResult);
    } catch (error) {
      setDayWfts([]);
    }
  };

  const getmTotalWft = async (userId: string) => {
    try {
      
      const response = await getUserTotalWft(userId);
      setMTotalWft(response.user_total_waterfootprint);
    } catch (error) {
      setMTotalWft(0);
      alert('error in calulating waterfootprint')
      
    }
  };

  const socialMediaOptions = [
    { name: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
    { name: 'Twitter', url: 'https://twitter.com/share?url=' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/shareArticle?mini=true&url=' }
  ];

  
  useEffect(() => {
    const userInfo: { id: string } | null = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      fetchDayWfts(userId);
      getmTotalWft(userId);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])





  const generateChartImage = () => {
    // Temporarily hide the share button
    if (shareButtonRef.current) {
      shareButtonRef.current.style.display = 'none';
    }

    if (chartRef.current) {
      chartRef.current.style.paddingLeft = '20px'
      html2canvas(chartRef.current, {
        backgroundColor: '#00072D',
        width: chartRef.current.clientWidth + 20,
        height: chartRef.current.clientHeight + 100,
      }).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'chart.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Image saved locally.');
  
        // Restore the share button
        if (shareButtonRef.current) {
          shareButtonRef.current.style.display = '';
        }
        setChartImage(imageUrl);
        setModalIsOpen(true);
      });
    }
  };
  
 
  
  const shareWaterFootprint = (platform: Platform, imageUrl: string) => {
    const url = `${platform.url}${encodeURIComponent(imageUrl)}`;
    window.open(url, '_blank')
  }


  const labels = dayWfts.map(day => day.dayName);
  const yAxisData = dayWfts.map(day => day.water_footprint);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Water footprint in liters',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: yAxisData,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <StyledDashboard>
    <div style={styles.container}>
      <h2 style={styles.title}>Track Weekly water footprint progress</h2>
      <div style={{ ...styles.content, flexDirection: isMobile ? 'column' : 'row', height:  isMobile ? '800px' : '300px' }} ref={chartRef}>
        <div style={{...styles.chartContainer, height: isMobile ? '300px' : '300px'}}>
          <BarChart data={data} options={options} />
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.imageContainer}>
            <img src={WFTBG} alt="Description" style={styles.image} />
            <div style={styles.waterFootprintText}>{mTotalWft} liters</div>
          </div>
          <div style={styles.description}>Latest diet water footprint</div>
          <button
            onClick={generateChartImage}
            style={styles.button}
            ref={shareButtonRef}
          >
            <FaShareAlt style={styles.icon} /> Share
          </button>
        </div>
      </div>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <ModalTitle>Share Your Water Footprint</ModalTitle>
        <ModalBody>
          <ul>
            {socialMediaOptions.map((platform) => (
              <li key={platform.name} onClick={() => shareWaterFootprint(platform, chartImage)} style={styles.socialMediaOption}>
                {platform.name}
              </li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </ModalFooter>
      </Modal>
    </div>
    </StyledDashboard>
  );
    
};

const StyledDashboard = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;
  flex-wrap: wrap;

  @media (max-width: 760px)': {
      content: {
        flexDirection: 'column',
        
      
      },
    }
`;


const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '50px',
    
  },
  title: {
    color: '#F2DFA4',
    marginBottom: '20px',
    paddingLeft: '0px',
    
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '100px',
    paddingTop: '100px',
    width: '100%',
    
  },
  chartContainer: {
    width: '100%',
    maxWidth: '600px',
    
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  image: {
    width: '180px',
    height: '180px',
  },
  waterFootprintText: {
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 22,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    marginTop: '10px',
    fontSize: 20,
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#F2DFA4',
    color: '#216869',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: '8px',
  },
  socialMediaOption: {
    cursor: 'pointer',
    margin: '10px 0',
  }
    
};

export default DashboardScreen;

