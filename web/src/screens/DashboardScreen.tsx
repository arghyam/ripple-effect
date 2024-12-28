import React, { useEffect, useRef, useState } from 'react';
import BarChart from '../components/Barchart';
import WFTBG from '../components/wft_calculator/wft_text_bg.png';
import { FaShareAlt } from 'react-icons/fa';
import { getUserTotalWft, getUserWftProgress } from '../api/apiService';
import { Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import ShareModal from '../components/ShareModel';

interface DayWft {
  dayName: string;
  water_footprint: number;
}

interface Platform {
  url: string;
}

const DashboardScreen: React.FC = () => {
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
      alert('Error in calculating water footprint');
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
  }, []);

  const generateChartImage = () => {
    setModalIsOpen(true);
    if (shareButtonRef.current) {
      shareButtonRef.current.style.display = 'none';
    }

    if (chartRef.current) {
      chartRef.current.style.paddingLeft = '20px';
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

        if (shareButtonRef.current) {
          shareButtonRef.current.style.display = '';
        }
        setChartImage(imageUrl);
        
      });
    }
  };

  const shareWaterFootprint = (platform: Platform, imageUrl: string) => {
    const url = `${platform.url}${encodeURIComponent(imageUrl)}`;
    window.open(url, '_blank');
  };
  const handleCopyLink = () => { 
    navigator.clipboard.writeText('https://apps.indiawaterportal.org/'); 
    alert('Link copied to clipboard'); 
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const labels = dayWfts.map(day => day.dayName);
  const yAxisData = dayWfts.map(day => day.water_footprint);
  const data = {
    labels,
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
    <div className="w-full text-center pt-12 mb-5">
      <h2 className="text-3xl mb-6 text-primary font-display font-bold">Track Your Weekly Water Footprint Progress</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-12 w-full px-5">
        <div className="w-full h-72 p-6 max-w-md rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <BarChart data={data} options={options} />
        </div>
        <div className="hidden md:block h-72 border-l-2 border-dotted border-primary"></div> {/* Vertical Divider */}
        <div className="block md:hidden w-72 border-t-2 border-dotted border-primary my-4"></div> {/* Horizontal Divider */}
        <div className="flex flex-col justify-center items-center">
          <div className="relative text-center">
            <img src={WFTBG} alt="Description" className="w-44 h-44" />
            <div className="font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
              {mTotalWft} liters
            </div>
          </div>
          <div className="text-black text-center mt-2 text-lg">Latest diet water footprint</div>
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex items-center mt-2 py-2 px-4 bg-yellow-400 text-green-800 rounded hover:bg-yellow-500 font-bold"
          >
            <FaShareAlt className="mr-2" /> Share
          </button>
        </div>
      </div>
      <ShareModal isModalOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onCopy={handleCopyLink} />
    </div>
  );
};

export default DashboardScreen;

