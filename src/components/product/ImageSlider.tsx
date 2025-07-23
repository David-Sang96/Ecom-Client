import { useEffect, useState } from "react";
import ProductImageLoader from "../ProductImageLoader";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

interface ImageSliderProps {
  imageUrls?: { url: string; public_id: string }[];
  productImages?: string[];
}

const ImageSlider = ({ imageUrls, productImages }: ImageSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const images: string[] = imageUrls
    ? imageUrls.map((img) => img.url)
    : productImages || [];

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
          {images.map((url, index) => (
            <CarouselItem key={index}>
              <ProductImageLoader
                src={url}
                alt={`product image ${index + 1}`}
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
