import { Metadata } from "next"
import { getSessionProfile } from "@/lib/server/mediators/sessionManagementMediators"
import LeaderboardPage from "@/components/leaderboards/leaderboardPage"
import { getAllUsers } from "@/lib/server/dal";
import { User } from "@prisma/client";

export const metadata: Metadata = {
  title: "Leaderboard | CodeMastery",
  description: "See how you rank among other CodeMastery users",
}


const LeaderboardPageContainer = async () => {
  const profile = await getSessionProfile();
  
  const data = await getAllUsers();
  const orderedUsers = data.sort((a, b) => b.score - a.score) as User[];

  return (
    <LeaderboardPage profile={profile} users={orderedUsers}/>
  );
};

export default LeaderboardPageContainer;
