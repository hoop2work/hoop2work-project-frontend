import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DatePickerComponent from "@/components/DatePickerComponent/DatePickerComponent";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddMemberComponent from "@/components/AddMemberComponent/AddMemeberComponet";
import { Button } from "@/components/ui/button";
import HomeNavbar from "@/components/HomeNavbarModelComponent/HomeNavbarModalComponent";
import Footer from "@/components/FooterModelComponent/FooterModelComponent";
import {
  getPredefinedTripById,
  createTripInstance,
  createMeetingRoomInstance,
  addUserToTrip,
  getAllPredefinedMeetingRooms,
  getUserData,
  getAllUsers,
  getAllTeams,
} from "@/ApiClient/ApiClient";
import TimeOnly from "@/components/TimeOnlyComponent/TimeOnlyComponent";

const TripDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [trip, setTrip] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberFields, setMemberFields] = useState([0, 1, 2]);
  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedMeetingRoomId, setSelectedMeetingRoomId] = useState<
    number | null
  >(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [meetingRooms, setMeetingRooms] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const addField = () => {
    setMemberFields((prev) => [...prev, prev.length]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (id) {
      getPredefinedTripById(Number(id))
        .then((data) => {
          setTrip(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fehler beim Laden des Trips:", error);
          setIsLoading(false);
        });
    }

    const fetchExtraData = async () => {
      try {
        const [meetingRoomsData, userData, allUsersData] = await Promise.all([
          getAllPredefinedMeetingRooms(),
          getUserData(),
          getAllUsers(),
        ]);
        setMeetingRooms(meetingRoomsData);
        setUser(userData);
        setAllUsers(allUsersData);

        const userTeams = await getAllTeams();
        setTeams(userTeams);
      } catch (error) {
        console.error("Fehler beim Laden zusätzlicher Daten:", error);
      }
    };

    fetchExtraData();
  }, [id]);

  function toIsoDate(dateStr: string): string {
    return `${dateStr}T00:00:00.000`;
  }

  const handleSubmit = async () => {
    if (!trip || !startDate || !endDate || !selectedMeetingRoomId || !teamId) {
      alert("Bitte fülle alle Felder korrekt aus.");
      return;
    }

    const formattedStart = toIsoDate(startDate);
    const formattedEnd = toIsoDate(endDate);

    // Log the data before submitting
    console.log("Submitting trip with data:", {
      predefinedTripId: trip.id,
      teamId,
      startDate: formattedStart,
      endDate: formattedEnd,
      selectedMeetingRoomId,
      selectedUserIds,
    });

    try {
      const tripInstance = await createTripInstance({
        predefinedTripId: trip.id,
        teamId,
        startDate: formattedStart,
        endDate: formattedEnd,
      });

      const tripInstanceId = tripInstance.id;
      console.log("Meeting Room Payload:", {
        tripInstanceId: tripInstanceId,
        predefinedMeetingRoomId: selectedMeetingRoomId,
        bookingStart: formattedStart,
        bookingEnd: formattedEnd,
      });

      await createMeetingRoomInstance({
        predefinedMeetingRoomId: selectedMeetingRoomId,
        tripInstanceId: tripInstanceId,
        bookingStart: formattedStart,
        bookingEnd: formattedEnd,
      });

      for (const userId of selectedUserIds) {
        await addUserToTrip(tripInstanceId, userId);
      }

      alert("Trip inklusive Meeting Room & Mitglieder erfolgreich erstellt!");
      router.push("/some/success/page");
    } catch (error) {
      console.error("Fehler beim Erstellen:", error);
      alert("Ein Fehler ist aufgetreten.");
    }
  };

  if (isLoading || !trip) {
    return (
      <>
        <HomeNavbar isLoggedIn={isLoggedIn} />
        <div className="flex items-center justify-center h-screen text-xl">
          Lade Trip...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div className="flex flex-col items-center min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)] overflow-auto">
        <div className="flex flex-row items-center justify-center p-4 max-w-7xl mx-auto w-full gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-3xl font-bold mb-2">
              Trip to: {trip.destination}
            </h1>
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow mb-2">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Departure:</span>{" "}
                <TimeOnly isoDateTime={trip.departureTimeDestination} /> &ndash;{" "}
                <span className="font-semibold">Arrival:</span>{" "}
                <TimeOnly isoDateTime={trip.arrivalTimeDestination} />
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Return flight:</span>{" "}
                <TimeOnly isoDateTime={trip.departureTimeHome} /> &ndash;{" "}
                <span className="font-semibold">Return arrival:</span>{" "}
                <TimeOnly isoDateTime={trip.arrivalTimeHome} />
              </p>
              <p className="text-gray-600">{trip.description}</p>
            </div>

            <div className="mb-4">
              <DatePickerComponent
                onStartChange={(date) => setStartDate(date)}
                onEndChange={(date) => setEndDate(date)}
              />
            </div>

            <div>
              <Label className="mb-1 block">Meeting room</Label>
              <Select
                onValueChange={(value) =>
                  setSelectedMeetingRoomId(Number(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Meeting Room" />
                </SelectTrigger>
                <SelectContent>
                  {meetingRooms.length === 0 ? (
                    <div className="px-4 py-2 text-gray-500">
                      No meeting rooms available
                    </div>
                  ) : (
                    meetingRooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {`Meeting Room: ${room.meetingRoomName}, ${room.availableSeats} seats, in ${room.city}`}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center mx-4">
            <img
              src={`/images/trips/${trip.pictureName || "placeholder"}.jpg`}
              alt={`Trip to ${trip.destination}`}
              className="object-cover border-2 border-gray-400 rounded-lg shadow"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/images/trips/placeholder.jpg";
              }}
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center p-4 max-w-7xl mx-auto w-full">
          <div className="w-full">
            <Label className="text-lg mb-2 block">Team Trip</Label>
            <div className="space-y-3">
              {teams.length === 0 ? (
                <div className="px-4 py-2 text-gray-500">
                  No teams available
                </div>
              ) : (
                <Select onValueChange={(value) => setTeamId(Number(value))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {`Team: ${team.teamName}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center p-4 max-w-7xl mx-auto w-full">
          <div className="w-full">
            <Label className="text-lg mb-2 block">Team Members</Label>
            <Label className="text-xs mb-1 pl-1 block">Member's</Label>
            <div className="space-y-3">
              {memberFields.map((fieldId) => (
                <div key={fieldId} className="flex items-center gap-2">
                  <div className="flex-1">
                    <AddMemberComponent
                      users={allUsers}
                      onSelectUser={(userId) =>
                        setSelectedUserIds((prev) => {
                          if (prev.includes(userId)) return prev;
                          return [...prev, userId];
                        })
                      }
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setMemberFields((prev) =>
                        prev.length > 1
                          ? prev.filter((id) => id !== fieldId)
                          : prev
                      )
                    }
                    aria-label="Remove member"
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <Button onClick={addField}>Add More</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center p-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between w-full">
            <span className="text-xl">Total Price: {trip.price} Fr.</span>
            <div className="flex gap-4">
              <Button
                className="bg-red-200 hover:bg-red-300 text-black border border-black text-2xl px-8 py-2 rounded-lg shadow"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button
                className="bg-blue-200 hover:bg-blue-300 text-black border border-black text-2xl px-8 py-2 rounded-lg shadow"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TripDetailsPage;
