import React, { useEffect, useState } from "react";
import tripsData from "@/data/trips.json";
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

const TripDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [memberFields, setMemberFields] = useState([0, 1, 2]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const trip = tripsData.find((trip) => trip.id === id);

    const addField = () => {
        setMemberFields((prev) => [...prev, prev.length]);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            <HomeNavbar isLoggedIn={isLoggedIn} />
            <div className="flex flex-col items-center min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)] overflow-auto">
            <div className="flex flex-row items-center justify-center p-4 max-w-7xl mx-auto w-full gap-8">
                <div className="flex-1 flex flex-col gap-6">
                <h1 className="text-3xl font-bold mb-2">
                    Trip to: {trip?.destination}
                </h1>
                <div className="border border-gray-300 rounded-lg p-4 bg-white shadow mb-2">
                    <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Departure:</span>{" "}
                    {trip?.departureTime} &ndash;{" "}
                    <span className="font-semibold">Arrival:</span>{" "}
                    {trip?.arrivalTime}
                    </p>
                    <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Return flight:</span>{" "}
                    {trip?.returnDepartureTime} &ndash;{" "}
                    <span className="font-semibold">Return arrival:</span>{" "}
                    {trip?.returnArrivalTime}
                    </p>
                    <p className="text-gray-600">{trip?.shortDescription}</p>
                </div>
                <div className="mb-4">
                    <DatePickerComponent />
                </div>
                <div>
                    <Label className="mb-1 block ">Meeting room</Label>
                    <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
                <div className="flex-1 flex justify-center items-center mx-4">
                <img
                    src={
                    trip?.image
                        ? `/images/trips/${trip.image}.jpg`
                        : "/images/trips/placeholder.jpg"
                    }
                    alt={`Trip to ${trip?.destination}`}
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
                    <Label className="text-xs mb-1 pl-1 block">Member's</Label>
                    <div className="space-y-3">
                        {memberFields.map((fieldId) => (
                            <div key={fieldId} className="flex items-center gap-2">
                                <div className="flex-1">
                                    <AddMemberComponent />
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
                <span className="text-xl">
                    Total Price: 10392 Fr.
                </span>
                <div className="flex gap-4">
                    <Button
                    className="bg-red-200 hover:bg-red-300 text-black border border-black text-2xl px-8 py-2 rounded-lg shadow"
                    onClick={() => router.back()}
                    >
                    Back
                    </Button>
                    <Button
                    className="bg-blue-200 hover:bg-blue-300 text-black border border-black text-2xl px-8 py-2 rounded-lg shadow"
                    type="submit"
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
