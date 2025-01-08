"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardTable from "@/components/leaderboards/leaderboardTable";
import SiteHeader from "@/components/siteHeader";
import { Profile } from "@/lib/models/user";
import { FC } from "react";
import { User } from "@prisma/client";

interface LeaderboardPageProps {
  profile: Profile | null;
  users: User[] | null
}

const LeaderboardPage: FC<LeaderboardPageProps> = ({ profile, users }) => {
  return (
    <main className="flex-1">
      <SiteHeader profile={profile as Profile} />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
        <Tabs defaultValue="global" className="mb-8">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            {profile && <TabsTrigger value="friends">Friends</TabsTrigger>}
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            <Card>
              <CardHeader>
                <CardTitle>Global Rankings</CardTitle>
                <CardDescription>See how you stack up against coders worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable users={users as User[]} />
              </CardContent>
            </Card>
          </TabsContent>
          {profile && (
            <TabsContent value="friends">
              <Card>
                <CardHeader>
                  <CardTitle>Friends Rankings</CardTitle>
                  <CardDescription>Compare your progress with your friends</CardDescription>
                </CardHeader>
                <CardContent>
                <LeaderboardTable users={users as User[]} />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Challenge</CardTitle>
                <CardDescription>This month's top performers</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable users={users as User[]} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {profile && (
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rank: 42</p>
                <p>Score: 8500</p>
                <p>Streak: 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p>🏆 Problem Solver</p>
                <p>🚀 Fast Learner</p>
                <p>💡 Creative Coder</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Next Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Reach 9000 score</p>
                <p>Reward: "Code Virtuoso" badge</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
};

export default LeaderboardPage;
