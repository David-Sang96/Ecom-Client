import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

interface ImageSliderProps {
  imageUrls: { url: string; public_id: string }[];
}

const ImageSlider = ({ imageUrls }: ImageSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-2xl">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {imageUrls.map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img.url}
                alt="product image"
                className="size-full object-cover"
                decoding="async"
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  );
};

export default ImageSlider;
