import { useInjection } from "brandi-react";
import { TOKENS } from "../di/tokens";
import { useEffect, useState } from "react";
import { Leaderboard } from "../data/models/leaderboard/GetLeaderboardRes";


const LeaderboardScreen = () => {

    const leaderboardRepository = useInjection(TOKENS.leaderboardRepository);


    const [leaderboard, setLeaderboard] = useState<Leaderboard>();

    


    const fetchLeaderboard = async (userId: string) => {
        try {
            const response = await leaderboardRepository.fetchLeaderboard(userId);
            setLeaderboard(response.leaderboard);
            
        } catch (error) {

        }
    };

    useEffect(() => {
        const userInfo: { id: string, name: string } | null = JSON.parse(localStorage.getItem('userInfo') || 'null');
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            fetchLeaderboard(userId)
        }

    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen mb-4 p-4">
          {leaderboard ? (
            <div>
              <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-6 text-black font-display font-bold">
                Congratulations, {leaderboard.mEntry.name}! 🌟 Your rank is #{leaderboard.mEntry.rank}
              </h2>
              <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-primary font-body font-bold">
                You've achieved {leaderboard.mEntry.water_footprint} liters in Water Footprint! 💧
              </h2>
            </div>
          ) : (
            <div></div>
          )}
    
          <div className="p-4 w-full sm:w-2/3 lg:w-1/3 flex justify-center items-end gap-2">
            {leaderboard?.top3Entries[1] && (
              <div className="text-center w-1/3">
                <h2 className="text-lg sm:text-xl font-bold">{leaderboard.top3Entries[1].name}</h2>
                <p>{leaderboard?.top3Entries[1].water_footprint}</p>
                <div className="bg-blue-500 text-gray-900 py-2 mt-4 h-40 rounded">#2</div>
              </div>
            )}
    
            {leaderboard?.top3Entries[0] && (
              <div className="text-center w-1/3">
                <h2 className="text-lg sm:text-xl font-bold">{leaderboard.top3Entries[0].name}</h2>
                <p>{leaderboard?.top3Entries[0].water_footprint}</p>
                <div className="bg-orange-500 text-gray-900 py-2 mt-4 h-56 rounded">#1</div>
              </div>
            )}
    
            {leaderboard?.top3Entries[2] && (
              <div className="text-center w-1/3">
                <h2 className="text-lg sm:text-xl font-bold">{leaderboard.top3Entries[2].name}</h2>
                <p>{leaderboard?.top3Entries[2].water_footprint}</p>
                <div className="bg-yellow-500 text-gray-900 py-2 mt-4 h-20 rounded">#3</div>
              </div>
            )}
          </div>
    
          <div className="px-4 sm:px-6 w-full sm:w-2/3 lg:w-1/3 flex flex-col justify-center items-center gap-2">
            {leaderboard ? (
              leaderboard.entries.map((entry) => (
                <div key={entry.userId} className="flex justify-between items-center bg-white w-full p-4 rounded-xl border-2 gap-5 border-primary">
                  <div className="flex gap-4 sm:gap-8">
                    <h2 className="text-lg sm:text-xl font-bold text-primary">#{entry.rank}</h2>
                    <h2 className="text-lg sm:text-xl font-bold">{entry.name}</h2>
                  </div>
                  <p>{entry.water_footprint} liters</p>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      );
}


export default LeaderboardScreen




