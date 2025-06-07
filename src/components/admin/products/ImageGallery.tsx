import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface ImageGalleryProps {
  images: { url: string; public_id: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardDescription>Manage your uploaded product images</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between pb-4">
          <h2 className="text-xl font-medium">Product Gallery</h2>
          <div className="bg-muted rounded-md px-2 py-1 text-xs font-bold">
            {images.length} images
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {images.map((item) => (
            <img
              src={item.url}
              alt={"product image"}
              key={item.public_id}
              className="size-full rounded-md object-cover"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;
