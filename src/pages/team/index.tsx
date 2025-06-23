"use client";

import React, { useEffect, useState } from "react";
import {
  getTeamsByUserId,
  getUsersByTeamId,
  getUserData,
  getTripInstancesByUser,
} from "@/ApiClient/ApiClient";
import HomeNavbar from "@/components/HomeNavbarModelComponent/HomeNavbarModalComponent";
import Footer from "@/components/FooterModelComponent/FooterModelComponent";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Team = {
  id: number;
  teamName: string;
  budget: number;
  manager: User;
};

type TripInstance = {
  id: number;
  startDate: string;
  endDate: string;
};

export default function TeamTabsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamUsers, setTeamUsers] = useState<Record<number, User[]>>({});
  const [userTrips, setUserTrips] = useState<Record<number, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuth = !!token;
    setIsLoggedIn(isAuth);
    if (!token) {
      window.location.href = "/login";
      return;
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserData();
        setCurrentUser(user);
        const userId = user.id;
        if (!userId) return;

        const data = await getTeamsByUserId(userId);
        setTeams(data || []);

        const usersPerTeam: Record<number, User[]> = {};
        const tripsPerUser: Record<number, string | null> = {};

        for (const team of data) {
          const users = await getUsersByTeamId(team.id);
          usersPerTeam[team.id] = users || [];

          for (const u of users) {
            try {
              const trips = await getTripInstancesByUser(u.id);

              const futureTrips = trips.filter(
                (trip) => new Date(trip.startDate) > new Date()
              );

              if (futureTrips.length > 0) {
                const nextTrip = futureTrips.sort(
                  (a, b) =>
                    new Date(a.startDate).getTime() -
                    new Date(b.startDate).getTime()
                )[0];
                tripsPerUser[u.id] = nextTrip.startDate;
              } else {
                tripsPerUser[u.id] = null;
              }
            } catch (err) {
              console.error("Error fetching trips for user:", u.id, err);
              tripsPerUser[u.id] = null;
            }
          }
        }

        setTeamUsers(usersPerTeam);
        setUserTrips(tripsPerUser);
      } catch (err) {
        console.error("Failed to fetch teams or users:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar isLoggedIn={isLoggedIn} />

      <main className="flex-grow p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl">Teams</h2>
          <button
            onClick={() => alert("Create Team feature not implemented yet.")}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-base"
          >
            + Create Team
          </button>
        </div>

        {teams.length === 0 ? (
          <div className="border p-5 rounded-xl bg-gray-100 text-lg">
            No teams found.
          </div>
        ) : (
          <Tabs defaultValue={teams[0].id.toString()} className="w-full">
            <TabsList className="border border-gray-300 rounded-md mb-6 overflow-hidden flex">
              {teams.map((team) => (
                <TabsTrigger
                  key={team.id}
                  value={team.id.toString()}
                  className="px-6 py-3 text-base font-medium data-[state=active]:bg-blue-100"
                >
                  {team.teamName}
                </TabsTrigger>
              ))}
            </TabsList>

            {teams.map((team) => (
              <TabsContent key={team.id} value={team.id.toString()}>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      Members of &quot;{team.teamName}&quot;
                    </h3>
                    {currentUser?.id === team.manager.id && (
                      <button
                        onClick={() => alert("Not yet Implemented")}
                        className="text-blue-600 text-[18px] mt-2 ml-[-16px] hover:underline"
                      >
                        &gt; Configure
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {teamUsers[team.id]?.map((user) => (
                      <div
                        key={user.id}
                        className="border-4 border-black rounded-3xl p-4 flex items-center text-lg bg-white w-full justify-between"
                      >
                        <span>{user.username}</span>
                        <span className="text-gray-600 text-right">
                          {userTrips[user.id]
                            ? `Next Trip: ${new Date(
                                userTrips[user.id]!
                              ).toLocaleDateString()}`
                            : "No booked Trips"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>

      <Footer />
    </div>
  );
}
