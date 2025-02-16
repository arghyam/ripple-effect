import React, { useEffect, useState, useRef } from 'react';
import BarChart from '../components/Barchart';
import { FaChartLine, FaLeaf, FaMedal, FaShareAlt, FaTint, FaUsers } from 'react-icons/fa';
import ShareModal from '../components/ShareModel';
import { useInjection } from 'brandi-react';
import { TOKENS } from '../di/tokens';
import html2canvas from 'html2canvas';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import DonutChart from '../components/DonutChart';
import NewsCarousel from '../components/NewsCarousel';
import ProgressBar2 from '../components/ProgressBar2';

interface DayWft {
  dayName: string;
  water_footprint: number;

}

interface CategoryBreakdown {
  category: string;
  value: number;
  color: string;
}

interface Goal {
  target: number;
  current: number;
  description: string;
}

const DashboardTestScreen: React.FC = () => {
  const userRepository = useInjection(TOKENS.userRepository);
  const [dayWfts, setDayWfts] = useState<DayWft[]>([]);
  const [mTotalWft, setMTotalWft] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [chartImage, setChartImage] = useState<string>('');
  const chartRef = useRef<HTMLDivElement | null>(null);
  const craftedMessage = `${userName}'s water footprint is ${mTotalWft} liters! #WaterFootprint`;

  const [categoryData] = useState<CategoryBreakdown[]>([
    { category: 'Diet', value: 65, color: '#4798af' },
    { category: 'Household', value: 20, color: '#63b3d1' },
    { category: 'Transport', value: 15, color: '#8ecfdf' }
  ]);
  
  const [comparisonData] = useState({
    user: 250,
    community: 180,
    nationalAverage: 210
  });
  
  const [goals] = useState<Goal[]>([
    { target: 200, current: 250, description: 'Weekly Water Goal' },
    { target: 5, current: 3, description: 'Completed Quizzes' }
  ]);
  
  const [tips] = useState([
    'Did you know: 1kg of beef requires 15,415 liters of water?',
    'Shower timers can reduce water use by 20%',
    'Fix leaks promptly - a dripping tap wastes 15 liters/day'
  ]);
  
  // Add these new chart configurations
  const donutData = {
    labels: categoryData.map(c => c.category),
    datasets: [{
      data: categoryData.map(c => c.value),
      backgroundColor: categoryData.map(c => c.color),
      borderWidth: 0
    }]
  };
  
  const comparisonChartData = {
    labels: ['You', 'Community', 'National Avg'],
    datasets: [{
      data: [comparisonData.user, comparisonData.community, comparisonData.nationalAverage],
      backgroundColor: ['#4798af', '#63b3d1', '#8ecfdf']
    }]
  };


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

  const labels = dayWfts.map(day => `${day.dayName}\n${format(new Date(), 'dd MMM')}`)
 
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
        {/* Add back the original chart and stats grid */}
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

        {/* Restore the original chart and stats grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Daily Water Usage Chart */}
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

          {/* Total Footprint Card with Share Button */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="bg-gradient-to-br from-primary to-custom p-6 md:p-8 rounded-xl md:rounded-2xl text-white relative overflow-hidden"
          >
            {/* ... (keep the same background elements from original design) */}
            
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
      {/* Existing chart and stats sections remain same */}

      {/* New Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-md"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <FaLeaf className="text-green-500 text-2xl"/>
            <div>
              <p className="text-sm text-gray-500">CO2 Saved</p>
              <p className="text-xl font-bold">{(mTotalWft * 0.002).toFixed(1)}kg</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-4 rounded-xl shadow-md"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <FaUsers className="text-blue-500 text-2xl"/>
            <div>
              <p className="text-sm text-gray-500">Community Rank</p>
              <p className="text-xl font-bold">#42</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-4 rounded-xl shadow-md"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <FaMedal className="text-yellow-500 text-2xl"/>
            <div>
              <p className="text-sm text-gray-500">Achievements</p>
              <p className="text-xl font-bold">3/5</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-4 rounded-xl shadow-md"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3">
            <FaChartLine className="text-purple-500 text-2xl"/>
            <div>
              <p className="text-sm text-gray-500">Weekly Trend</p>
              <p className="text-xl font-bold">-8%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Usage Breakdown</h3>
          <div className="h-64">
            <DonutChart data={donutData} />
          </div>
          <div className="mt-4 flex justify-center gap-4">
            {categoryData.map((cat) => (
              <div key={cat.category} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: cat.color }}
                ></div>
                <span className="text-sm">{cat.category} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goals Section */}
        <div className="space-y-6">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ x: 20 }}
            animate={{ x: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">Your Goals</h3>
            {goals.map((goal, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{goal.description}</span>
                  <span className="text-sm">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <ProgressBar2
                  progress={(goal.current/goal.target)*100} 
                  color={index === 0 ? '#4798af' : '#63b3d1'}
                />
              </div>
            ))}
          </motion.div>

          {/* Comparison Chart */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4">Comparison</h3>
            <div className="h-48">
              <BarChart 
                data={comparisonChartData} 
                options={{
                  indexAxis: 'y' as const,
                  responsive: true,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tips & News Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Water Saving Tips</h3>
          <NewsCarousel items={tips} interval={5000} />
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Upcoming Quizzes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Water Wise Weekly Challenge</span>
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Join
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Sustainable Diet Quiz</span>
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Start
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

        <ShareModal
          isModalOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onCopy={handleCopyLink}
          chartImage={chartImage}
          craftedMessage={craftedMessage}
        />
    
    </motion.div>

  );
};

export default DashboardTestScreen;
