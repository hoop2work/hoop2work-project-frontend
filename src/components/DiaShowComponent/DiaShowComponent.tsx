import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "../ui/card";

const images = [
    "/wp2019367.jpg",
    "/wp2019378.jpg",
    "/wp6751078.jpg",
    "/wp7226772.png",
    "/wp8795764.jpg",
    "/wp12480142.jpg"
];

const DiaShowComponent: React.FC = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Carousel className="w-full max-w-3xl">
            <CarouselContent>
                {images.map((src, index) => (
                <CarouselItem key={index}>
                    <div className="p-2">
                    <Card>
                        <CardContent className="flex aspect-video items-center justify-center p-0 bg-transparent shadow-none border-none">
                            <img
                                src={src}
                                alt={`Bild ${index + 1}`}
                                className="w-full h-[300px] min-h-[200px] max-h-[400px] object-cover rounded"
                            />
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>
    );
};

export default DiaShowComponent;