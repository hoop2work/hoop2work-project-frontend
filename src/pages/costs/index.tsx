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

type PredefinedTrip = {
  id: number;
  title: string;
  home: string;
  destination: string;
  description: string;
  departureTimeDestination: string;
  arrivalTimeDestination: string;
  departureTimeHome: string;
  arrivalTimeHome: string;
  price: number;
  pictureName: string;
};

type TripInstance = {
  id: number;
  predefinedTrip: PredefinedTrip;
  team: Team;
  startDate: string;
  endDate: string;
};

export default function TeamTabsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamUsers, setTeamUsers] = useState<Record<number, User[]>>({});
  const [userTrips, setUserTrips] = useState<Record<number, TripInstance[]>>(
    {}
  );
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
        const tripsPerUser: Record<number, TripInstance[]> = {};

        for (const team of data) {
          const users = await getUsersByTeamId(team.id);
          usersPerTeam[team.id] = users || [];

          for (const u of users) {
            try {
              const trips = await getTripInstancesByUser(u.id);
              tripsPerUser[u.id] = trips || [];
            } catch (err) {
              console.error("Error fetching trips for user:", u.id, err);
              tripsPerUser[u.id] = [];
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

  const calculateUserTotal = (userId: number) => {
    const trips = userTrips[userId] || [];
    return trips.reduce(
      (acc, trip) => acc + (trip.predefinedTrip?.price ?? 0),
      0
    );
  };

  const calculateTeamTotal = (teamId: number) => {
    const users = teamUsers[teamId] || [];
    return users.reduce(
      (total, user) => total + calculateUserTotal(user.id),
      0
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar isLoggedIn={isLoggedIn} />

      <main className="flex-grow p-5">
        <h2 className="text-3xl mb-6">Costs</h2>

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

            {teams.map((team) => {
              const users = teamUsers[team.id] || [];
              const teamTotal = calculateTeamTotal(team.id);
              const remaining = team.budget - teamTotal;

              return (
                <TabsContent key={team.id} value={team.id.toString()}>
                  <div className="space-y-6">
                    {users.map((user) => {
                      const trips = userTrips[user.id] || [];
                      const total = calculateUserTotal(user.id);

                      return (
                        <div
                          key={user.id}
                          className="border border-gray-300 rounded-xl bg-white p-4"
                        >
                          <details className="w-full">
                            <summary className="cursor-pointer text-lg font-medium flex justify-between items-center">
                              <span>{user.username}</span>
                              <span className="text-blue-700">
                                Total: Fr. {total.toFixed(2)}
                              </span>
                            </summary>

                            <div className="mt-4 space-y-2 pl-4">
                              {trips.length === 0 ? (
                                <div className="text-gray-500 italic">
                                  No trips
                                </div>
                              ) : (
                                trips.map((trip) => (
                                  <div
                                    key={trip.id}
                                    className="flex justify-between text-base"
                                  >
                                    <span>
                                      Trip to {trip.predefinedTrip.destination}
                                    </span>
                                    <span>
                                      Fr. {trip.predefinedTrip.price.toFixed(2)}
                                    </span>
                                  </div>
                                ))
                              )}
                            </div>
                          </details>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end mt-10">
                    <div className="text-lg font-semibold space-y-1">
                      <div>
                        Remaining Team Budget:{" "}
                        <span className="text-red-600">
                          Fr. {remaining.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        Total Team Budget:{" "}
                        <span className="text-green-600">
                          Fr. {team.budget.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </main>

      <Footer />
    </div>
  );
}
