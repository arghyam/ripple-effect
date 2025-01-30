import React, { useEffect, useState, useRef } from 'react';
import BarChart from '../components/Barchart';
import { FaShareAlt } from 'react-icons/fa';
import ShareModal from '../components/ShareModel';
import { useInjection } from 'brandi-react';
import { TOKENS } from '../di/tokens';
import html2canvas from 'html2canvas';

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

  const labels = dayWfts.map((day) => day.dayName);
  const yAxisData = dayWfts.map((day) => day.water_footprint);
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
      <h2 className="text-4xl mb-6 text-black font-display font-bold">Hi, {userName}</h2>
      <h2 className="text-3xl mb-6 text-primary font-body font-bold">Track Your Weekly Water Footprint Progress</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-12 w-full px-5">
        <div
          ref={chartRef}
          className="w-full h-72 p-6 max-w-md rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <BarChart data={data} options={options} />
        </div>
        <div className="hidden md:block h-72 border-l-2 border-dotted border-primary"></div>
        <div className="block md:hidden w-72 border-t-2 border-dotted border-primary my-4"></div>
        <div className="flex flex-col justify-center items-center">
          <div className="relative text-center">
            <img src="wft_text_bg.png" alt="Description" className="w-44 h-44" />
            <div className="font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
              {mTotalWft} liters
            </div>
          </div>
          <div className="text-black text-center mt-2 text-lg">Latest diet water footprint</div>
          <button
            onClick={() => {
              setModalIsOpen(true);
              generateChartImage();
            }}
            className="flex items-center mt-2 py-2 px-4 bg-yellow-400 text-green-800 rounded hover:bg-yellow-500 font-bold"
          >
            <FaShareAlt className="mr-2" /> Share
          </button>
        </div>
      </div>


      <ShareModal
        isModalOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onCopy={handleCopyLink}
        chartImage={chartImage}
        craftedMessage={craftedMessage}
      />
    </div>
  );
};

export default DashboardScreen;
