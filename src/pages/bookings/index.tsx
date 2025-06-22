"use client";

import React, { useEffect, useState } from "react";
import {
    getUserData,
    getTripInstancesByUser,
    getTeamById,
    getUsersForTrip,
    getMeetingRoomInstancesByTrip,
    getPredefinedTripById,
} from "@/ApiClient/ApiClient";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Footer from "@/components/FooterModelComponent/FooterModelComponent";
import HomeNavbar from "@/components/HomeNavbarModelComponent/HomeNavbarModalComponent";
import DateOnly from "@/components/DateOnlyComponent/DateOnlyComponent";
import TimeOnly from "@/components/TimeOnlyComponent/TimeOnlyComponent";

type TripListItem = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
};

export default function BookingsPage() {
    const [tripList, setTripList] = useState<TripListItem[]>([]);
    const [expandedTripId, setExpandedTripId] = useState<string | null>(null);
    const [tripDetails, setTripDetails] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        if (!token) {
            window.location.href = "/login";
            return;
        }
        async function fetchTrips() {
            try {
                const user = await getUserData();
                const userTrips = await getTripInstancesByUser(user.id);
                if (!userTrips || userTrips.length === 0) {
                    setError("Keine Trips für diesen Benutzer gefunden.");
                    setLoading(false);
                    return;
                }
                const trips = await Promise.all(
                    userTrips.map(async (trip: any) => {
                        const predefinedTrip = await getPredefinedTripById(trip.predefinedTrip.id);
                        return {
                            id: trip.id,
                            name: predefinedTrip.title,
                            startDate: trip.startDate,
                            endDate: trip.endDate,
                        };
                    })
                );
                setTripList(trips);
            } catch (err) {
                setError("Fehler beim Laden der Trips");
            } finally {
                setLoading(false);
            }
        }
        fetchTrips();
    }, []);

    useEffect(() => {
        if (!expandedTripId) {
            setTripDetails(null);
            return;
        }
        async function fetchTripDetails() {
            setLoading(true);
            try {
                const user = await getUserData();
                const userTrips = await getTripInstancesByUser(user.id);
                const trip = userTrips.find((t: any) => t.id === expandedTripId);
                if (!trip) return;
                const [team, users, meetingRooms, predefinedTrip] = await Promise.all([
                    getTeamById(trip.team.id),
                    getUsersForTrip(trip.id),
                    getMeetingRoomInstancesByTrip(trip.id),
                    getPredefinedTripById(trip.predefinedTrip.id),
                ]);
                setTripDetails({
                    trip: {
                        id: trip.id,
                        name: predefinedTrip.title,
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                        home: predefinedTrip.home,
                        to: predefinedTrip.destination,
                        price: predefinedTrip.price,
                        arrivalTimeDestination: predefinedTrip.arrivalTimeDestination,
                        arrivalTimeHome: predefinedTrip.arrivalTimeHome,
                        departureTimeDestination: predefinedTrip.departureTimeDestination,
                        departureTimeHome: predefinedTrip.departureTimeHome,
                    },
                    team: {
                        teamName: team.teamName,
                    },
                    users: users.map((user: any) => ({
                        id: user.id,
                        name: user.username,
                        email: user.email,
                    })),
                    meetingRooms: meetingRooms.map((room: any) => ({
                        id: room.id,
                        name: room.meetingRoom.meetingRoomName,
                        city: room.meetingRoom.city,
                        address: room.meetingRoom.address,
                        seats: room.meetingRoom.availableSeats,
                        bookingStart: room.bookingStart,
                        bookingEnd: room.bookingEnd,
                    })),
                });
            } catch (err) {
                setError("Fehler beim Laden der Trip-Details");
            } finally {
                setLoading(false);
            }
        }
        fetchTripDetails();
    }, [expandedTripId]);

    return (
        <>
            <HomeNavbar isLoggedIn={isLoggedIn} />
            <div className="p-5">
                <h2 className="text-3xl mb-6">Trip's</h2>
                {error && <div>{error}</div>}
                {loading && !tripList.length && <div>Lade...</div>}
                {!loading && !error && tripList.map((trip) => {
                    const expanded =
                        expandedTripId === trip.id &&
                        tripDetails &&
                        tripDetails.trip.id === trip.id;
                    return (
                        <div key={trip.id} className="mb-6">
                            <div
                                className="border-4 border-black rounded-3xl p-6 flex items-center text-2xl bg-white cursor-pointer max-w-full justify-between relative"
                                onClick={() =>
                                    setExpandedTripId(
                                        expandedTripId === trip.id ? null : trip.id
                                    )
                                }
                            >
                                <span>Trip to {trip.name}</span>
                                <div className="text-lg text-right ml-10 mr-12">
                                    <div>Start Date: <DateOnly isoDateTime={trip.startDate} /></div>
                                    <div>End Date: <DateOnly isoDateTime={trip.endDate} /></div>
                                </div>
                                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl">
                                    {expanded ? "▲" : "▼"}
                                </span>
                            </div>
                            <div
                                className={`
                                    transition-all duration-500 ease-in-out
                                    ${expanded ? "max-h-[600px] opacity-100 p-5 border-2 border-blue-200" : "max-h-0 opacity-0 p-0 border-2 border-transparent"}
                                    rounded-2xl mt-2 bg-blue-50
                                    overflow-hidden
                                `}
                            >
                                {tripDetails &&
                                    tripDetails.trip.id === trip.id && (
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-xl mb-2">
                                                        From {tripDetails.trip.home} to{" "}
                                                        {tripDetails.trip.to}
                                                    </div>
                                                    <div className="my-4">
                                                        {/* Meeting Room Dialog */}
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <button className="bg-blue-200 border-2 border-black rounded-xl text-lg px-4 py-2 mr-4 mb-2 cursor-pointer">
                                                                    Meeting Room
                                                                </button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[425px]">
                                                                <DialogHeader>
                                                                    <DialogTitle>Meeting Rooms</DialogTitle>
                                                                    <DialogDescription>
                                                                        Details zu den gebuchten Meetingräumen.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                {tripDetails.meetingRooms.length > 0 ? (
                                                                    <div className="space-y-4">
                                                                        {tripDetails.meetingRooms.map((room: any) => (
                                                                            <div key={room.id} className="border p-3 rounded-lg bg-white">
                                                                                <div className="font-bold">{room.name}</div>
                                                                                <div>Stadt: {room.city}</div>
                                                                                <div>Adresse: {room.address}</div>
                                                                                <div>Sitze: {room.seats}</div>
                                                                                <div>
                                                                                    Buchung:  <DateOnly isoDateTime={room.bookingStart} /> - <DateOnly isoDateTime={room.bookingEnd} />
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div>Keine Meetingräume gebucht.</div>
                                                                )}
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Schließen</Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>

                                                        {/* User List Dialog */}
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <button className="bg-blue-200 border-2 border-black rounded-xl text-lg px-4 py-2 mr-4 mb-2 cursor-pointer">
                                                                    User List
                                                                </button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[425px]">
                                                                <DialogHeader>
                                                                    <DialogTitle>Teilnehmende Benutzer</DialogTitle>
                                                                    <DialogDescription>
                                                                        Liste aller Benutzer, die an diesem Trip teilnehmen.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-2">
                                                                    {tripDetails.users.map((user: any) => (
                                                                        <div key={user.id} className="border p-2 rounded bg-white">
                                                                            <div className="font-bold">{user.name}</div>
                                                                            <div className="text-sm">{user.email}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Schließen</Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>

                                                        {/* Trip Details Dialog */}
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <button className="bg-blue-200 border-2 border-black rounded-xl text-lg px-4 py-2 mr-4 mb-2 cursor-pointer">
                                                                    Trip Details
                                                                </button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[425px]">
                                                                <DialogHeader>
                                                                    <DialogTitle>Trip Details</DialogTitle>
                                                                    <DialogDescription>
                                                                        Weitere Informationen zu diesem Trip.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-2 border p-3 rounded-lg bg-white">
                                                                    <div>
                                                                        <span className="font-bold">Von:</span> {tripDetails.trip.home}
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold">Nach:</span> {tripDetails.trip.to}
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold">Start:</span> <DateOnly isoDateTime={tripDetails.trip.startDate} />
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold">Ende:</span> <DateOnly isoDateTime={tripDetails.trip.endDate} />
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="space-y-2 border p-3 rounded-lg bg-white">
                                                                    <div>
                                                                        <span className="font-bold">Ankunft am Ziel:</span>{" "}
                                                                        <TimeOnly isoDateTime={tripDetails.trip.arrivalTimeDestination} />
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold">Abfahrt vom Ziel:</span>{" "}
                                                                        <TimeOnly isoDateTime={tripDetails.trip.departureTimeDestination} />
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold">Ankunft zu Hause:</span>{" "}
                                                                        <TimeOnly isoDateTime={tripDetails.trip.arrivalTimeHome} />
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold">Abfahrt von zu Hause:</span>{" "}
                                                                        <TimeOnly isoDateTime={tripDetails.trip.departureTimeHome} />
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline">Schließen</Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                                <div className="text-right min-w-[200px]">
                                                    <div className="text-base">Team Name:</div>
                                                    <div className="font-bold mb-6">
                                                        {tripDetails.team.teamName}
                                                    </div>
                                                    <div className="text-xl">Price:</div>
                                                    <div className="font-bold">
                                                        {tripDetails.trip.price} CHF
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Footer />
        </>
    );
}
