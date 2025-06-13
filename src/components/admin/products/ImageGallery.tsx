import fetchApi from "@/api";
import { queryClient } from "@/api/query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { TooltipHover } from "@/components/user/Tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Download, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const ImageGallery = () => {
  const { productId } = useParams<{ productId: string }>();
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["products", "detail", productId],
    queryFn: async () => {
      const response = await fetchApi.get(`/product/${productId}`);
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({ publicId }: { publicId: string }) => {
      const response = await fetchApi.delete("/file", {
        data: { productId, publicId },
      });
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["products", "detail", productId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["products", "all"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  if (isLoading) return <p>Loading....</p>;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardDescription>Manage your uploaded product images</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between pb-6">
          <h2 className="text-xl font-medium">Product Gallery</h2>
          <div className="bg-muted rounded-md px-2 py-1 text-xs font-bold">
            {data.product.images.length} images
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data.product.images.map(
            (item: { url: string; public_id: string }) => (
              <div className="group relative" key={item.public_id}>
                <img
                  src={item.url}
                  alt={"product image"}
                  className="size-full rounded-md object-cover transition-transform"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <TooltipHover content="View the image in large size">
                    <Button
                      type="button"
                      size={"sm"}
                      variant={"secondary"}
                      className="size-8 cursor-pointer p-0"
                      onClick={() => {
                        setOpen(true);
                        setPreviewUrl(item.url);
                      }}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                  </TooltipHover>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <TooltipHover content="Delete">
                        <Button
                          type="button"
                          size={"sm"}
                          variant={"destructive"}
                          className="size-8 cursor-pointer p-0"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </TooltipHover>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => mutate({ publicId: item.public_id })}
                          className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <TooltipHover content="Download the image">
                    <a
                      href={`${import.meta.env.VITE_API_URL}/file/download-image?url=${encodeURIComponent(item.url)}`}
                      download
                      className="rounded-md bg-green-300/50 p-2"
                    >
                      <Download className="size-3.5" />
                    </a>
                  </TooltipHover>
                </div>
              </div>
            ),
          )}
        </div>

        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <img
                src={previewUrl}
                alt={previewUrl.split("/").pop()}
                className="size-full rounded-md object-cover"
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;
