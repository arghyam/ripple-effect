import React, { useEffect, useRef, useState } from 'react';
import BarChart from '../components/Barchart';
import WFTBG from '../components/wft_calculator/wft_text_bg.png'
import { FaShareAlt } from 'react-icons/fa';
import { getUserTotalWft, getUserWftProgress } from '../api/apiService';
import { Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { display } from '@mui/system';



const DashboardScreen = () => {
  const [dayWfts, setDayWfts] = useState([]);

  const [mTotalWft, setMTotalWft] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [chartImage, setChartImage] = useState('');
  const chartRef = useRef(null);
  const shareButtonRef = useRef(null);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth);


  const fetchDayWfts = async (userId) => {
    try {

      const response = await getUserWftProgress(userId);
      setDayWfts(response.queryResult);
    } catch (error) {
      setDayWfts([]);
      
    }

  };

  const getmTotalWft = async (userId) => {
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
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
  }, []);


  const shortenUrl = async (longUrl) => {
    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      setShortenedUrl(response.data);
    } catch (error) {
      
    }
  };


  const generateChartImage = () => {
   
    // Temporarily hide the share button
    if (shareButtonRef.current) {
      shareButtonRef.current.style.display = 'none';
    }
    if (chartRef.current) {
      
      html2canvas(chartRef.current, {
        backgroundColor: '#00072D', 
        paddingLeft: 20, 
        width: chartRef.current.clientWidth + 20, 
        height: chartRef.current.clientHeight + 100
      }).then(canvas => {
        
        
        
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
        // console.log(`generate chart excuc start 2`)
        // const imageUrl = canvas.toDataURL('image/png');
        // setChartImage(imageUrl);
        // shortenUrl(imageUrl);
        // console.log(`generated chart url ${shortenedUrl}`)
        // setModalIsOpen(true);
      });
    }
  };

  const shareWaterFootprint = (platform, imageUrl) => {
    const url = `${platform.url}${encodeURIComponent(imageUrl)}`;
    window.open(url, '_blank');
  };


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
    <div style={styles.container}>
      <h2 style={styles.title}>Track Weekly water footprint progress</h2>
      <div style={styles.content} ref={chartRef}>
        <div style={styles.chartContainer}>
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
  );
    
};
const isMobile = window.innerWidth <= 600
const styles = {
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
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '100px',
    paddingTop: '100px',
    width: '100%',
    height:  isMobile ? '800px' : '300px',
    
  },
  chartContainer: {
    width: '100%',
    maxWidth: '600px',
    height: isMobile ? '300px' : '300px',
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
  },
  '@media (max-width: 760px)': {
      content: {
        flexDirection: 'column',
        
      
      },
    },
    
};

export default DashboardScreen;

