import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HomeNavbar from "@/components/HomeNavbarModelComponent/HomeNavbarModalComponent";
import Footer from "@/components/FooterModelComponent/FooterModelComponent";
import Head from "next/head";
import { getAllPredefinedTrips } from "@/ApiClient/ApiClient";
import TimeOnly from "@/components/TimeOnlyComponent/TimeOnlyComponent";

export default function Trips() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    getAllPredefinedTrips()
      .then((data) => {
        setTrips(data);
      })
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 pb-30">
          <h1 className="text-3xl font-bold mb-6">Trips</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="relative group rounded-lg overflow-hidden shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer bg-white aspect-square"
              >
                <img
                  src={`/images/trips/${trip.pictureName || "placeholder"}.jpg`}
                  alt={`Trip to ${trip.destination}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/trips/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {trip.title}
                  </h2>
                  <p className="text-white mb-1">
                    Departure:{" "}
                    <TimeOnly isoDateTime={trip.departureTimeDestination} /> –
                    Arrival:{" "}
                    <TimeOnly isoDateTime={trip.arrivalTimeDestination} />
                  </p>
                  <p className="text-white mb-1">
                    Return flight:{" "}
                    <TimeOnly isoDateTime={trip.departureTimeHome} /> – Back
                    home: <TimeOnly isoDateTime={trip.arrivalTimeHome} />
                  </p>
                  <p className="text-white mb-1 font-semibold">
                    Price: {trip.price} €
                  </p>
                  <p className="text-white mb-4 text-center px-4">
                    {trip.description}
                  </p>
                  <button
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                    onClick={() => router.push(`/trips/${trip.id}`)}
                  >
                    Show more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
