import React from "react";
import tripsData from '@/data/trips.json';
import { useRouter } from "next/router";
import DatePickerComponent from "@/components/DatePickerComponent/DatePickerComponent";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"





const TripDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const trip = tripsData.find(trip => trip.id === id)


   

    return (
        <div>
            <div className="flex flex-col items-center  min-h-screen">
                <div className="flex flex-row items-center justify-center p-4">
                    <div className="flex-1">
                        <h1>Trip to: {trip?.destination}</h1>
                        <div style={{ border: "1px solid black", borderRadius: "8px", padding: "8px", margin: "16px 10px" }}>
                            <p className="text-black mb-1">
                                Abflug: {trip?.departureTime} - Ankunft: {trip?.arrivalTime}
                            </p>
                            <p className="text-black mb-1">
                                Rückflug: {trip?.returnDepartureTime} - Wieder zurück: {trip?.returnArrivalTime}
                            </p>
                            <p className="text-black mb-4">{trip?.shortDescription}</p>
                        </div>
                        <div>
                            <DatePickerComponent />
                        </div>
                        <div>
                            <Label>Meetingroom</Label>
                           <Select>
                                <SelectTrigger className="w-[180px]">
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
                            src={`/images/trips/${trip?.image}.jpg`}
                            alt={`Trip to ${trip?.destination}`}
                            className="object-cover border-2 border-gray-400 rounded-lg shadow"
                            onError={e => {
                                (e.currentTarget as HTMLImageElement).src = '/images/trips/placeholder.jpg';
                            }}
                        />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default TripDetailsPage;