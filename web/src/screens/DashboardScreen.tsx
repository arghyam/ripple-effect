import React, { useEffect, useState, useRef } from 'react';
import BarChart from '../components/Barchart';
import { FaShareAlt, FaTint } from 'react-icons/fa';
import ShareModal from '../components/ShareModel';
import { useInjection } from 'brandi-react';
import { TOKENS } from '../di/tokens';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface DayWft {
  dayName: string;
  water_footprint: number;

}

const DashboardScreen: React.FC = () => {
  const userRepository = useInjection(TOKENS.userRepository);
  const [dayWfts, setDayWfts] = useState<DayWft[]>([]);
  const [mTotalWft, setMTotalWft] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [chartImage, setChartImage] = useState<string>('');
  const chartRef = useRef<HTMLDivElement | null>(null);
  const craftedMessage = `${userName}'s water footprint is ${mTotalWft} liters! #WaterFootprint`;


  const fetchDayWfts = async (userId: string) => {
    try {
      const response = await userRepository.getUserWftProgress(userId);
      setDayWfts(response.queryResult);
    } catch (error) {
      setDayWfts([]);
    }
  };

  const getmTotalWft = async (userId: string) => {
    try {
      const response = await userRepository.getUserTotalWft(userId);
      setMTotalWft(response.user_total_waterfootprint);
    } catch (error) {
      setMTotalWft(0);
    }
  };

  const getLabelForValue = (value: string) => {
    const [day, date] = value.split('|');
    return [`${day}`, `${format(new Date(date), 'dd MMM')}`];
  };

  useEffect(() => {
    const userInfo: { id: string; name: string } | null = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      fetchDayWfts(userId);
      getmTotalWft(userId);
      setUserName(userInfo.name);
    }
  }, []);

  const generateChartImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        setChartImage(imageUrl);
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://apps.indiawaterportal.org/ripple-effect/client');
    alert('Link copied to clipboard');
  };

  const labels = dayWfts.map(day => `${day.dayName}`)
 
  const yAxisData = dayWfts.map((day) => day.water_footprint);
  const data = {
    labels,
    datasets: [
      {
        label: 'Water Footprint (Liters)',
        backgroundColor: '#4798af', // Primary color with opacity
        borderColor: '#4798af', // Brand primary color
        borderWidth: 1,
        hoverBackgroundColor: '#4798af',
        hoverBorderColor: '#4798af',
        data: yAxisData,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Liters',
          color: '#4b5563',
          font: { size: 14 }
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#4b5563' },
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: '#4b5563',
          maxRotation: 0,
          autoSkip: false,
        },
      },
    },
    plugins: {
      legend: { 
        labels: { 
          color: '#4b5563', 
          font: { size: 14 },
          boxWidth: 20,
          padding: 20
        } 
      },
      position: 'top' as const,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full text-center pt-4 md:pt-8 mb-5 px-2 sm:px-4"
    >
      <div className="max-w-7xl mx-auto">
      <AnimatePresence>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-2"
          >
            <h2 className="text-2xl md:text-4xl mb-2 text-gray-800 font-bold">
              Welcome back, {userName}
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6">
              Your weekly water footprint summary
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Chart Section */}
          
          <motion.div
            ref={chartRef}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Daily Water Usage
              </h3>
              <FaTint className="text-primary text-xl md:text-2xl" />
            </div>
            <div className="h-64 md:h-72">
              <BarChart data={data} options={options} />
            </div>
          </motion.div>
          {/* Stats Section */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="bg-gradient-to-br from-primary to-custom p-6 md:p-8 rounded-xl md:rounded-2xl text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <FaTint 
                className="absolute -right-8 -top-8 text-white/20 w-32 h-32"
                style={{ transform: 'rotate(30deg)' }}
              />
              <FaTint 
                className="absolute -left-12 -bottom-12 text-white/20 w-48 h-48"
                style={{ transform: 'rotate(-15deg)' }}
              />
            </div>

            <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M28.1,36.9c0,0,8.8-16.7,18.8-14.4s-4.1,19.4,4.9,20.4s8.1-15.1,16.5-13.1s6.3,15.9,6.3,15.9s-22.9-3.3-30.8,4.3
    s-15.7-12.1-15.7-12.1S28.1,36.9,28.1,36.9z" fill="#6366f1" opacity="0.1"/>
  <path d="M20.6,66.9c0,0,8.8-16.7,18.8-14.4s-4.1,19.4,4.9,20.4s8.1-15.1,16.5-13.1s6.3,15.9,6.3,15.9s-22.9-3.3-30.8,4.3
    s-15.7-12.1-15.7-12.1S20.6,66.9,20.6,66.9z" fill="#6366f1" opacity="0.1" transform="rotate(30 50 50)"/>
</svg>
            </div>
            
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                Total Footprint
              </h3>
              <div className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 animate-pulse-slow">
                {mTotalWft}L
              </div>
              <p className="text-sm md:text-base opacity-90 mb-6 md:mb-8">
                Current diet water footprint
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setModalIsOpen(true);
                  generateChartImage();
                }}
                className="w-full bg-white/10 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <FaShareAlt className="flex-shrink-0" />
                <span>Share Progress</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <ShareModal
          isModalOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onCopy={handleCopyLink}
          chartImage={chartImage}
          craftedMessage={craftedMessage}
        />
      </div>
    </motion.div>

  );
};

export default DashboardScreen;
