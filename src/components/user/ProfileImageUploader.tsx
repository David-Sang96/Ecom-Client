import fetchApi from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { uploadProfileSchema } from "@/types/schema/authSchema";
import { ReturnImageType } from "@/types/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type ProfileImageUploaderProps = {
  setOpen: (value: boolean) => void;
};

const ProfileImageUploader = ({ setOpen }: ProfileImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [resData, setResData] = useState<ReturnImageType>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm<z.infer<typeof uploadProfileSchema>>({
    resolver: zodResolver(uploadProfileSchema),
    defaultValues: { image: undefined },
  });
  const setImage = useAuthStore((store) => store.setAuth);

  const handleRemove = () => {
    URL.revokeObjectURL(preview!);
    setPreview(null);
    form.resetField("image", { defaultValue: undefined });

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  useEffect(() => {
    if (status === "success" && resData?.success) {
      toast.success(resData!.message);
      setImage(resData!.user);
      setOpen(false);
    } else if (status === "error") {
      toast.error("Upload failed. Please try again!");
    }
  }, [status, resData, setImage, setOpen]);

  const submitHandler = async (value: z.infer<typeof uploadProfileSchema>) => {
    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("image", value.image);

    try {
      const { data } = await fetchApi.post("/file/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progesss = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progesss);
        },
      });

      const result: ReturnImageType = {
        success: data.success,
        message: data.message,
        user: {
          id: data.updatedUser._id,
          email: data.updatedUser.email,
          name: data.updatedUser.name,
          accStatus: data.updatedUser.status,
          image: {
            url: data.updatedUser.image.url,
            public_id: data.updatedUser.image.public_id,
          },
          isEmailVerified: data.updatedUser.isEmailVerified,
          role: data.updatedUser.role,
          updatedAt: data.updatedUser.updatedAt,
          status: Status.none,
        },
      };

      setResData(result);
      setStatus("success");
      setUploadProgress(100);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus("error");
      setUploadProgress(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
        <CardDescription>Upload your profile image here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4 md:space-y-6"
          >
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormControl>
                    <>
                      {status === "uploading" && (
                        <div className="space-y-2">
                          <div className="h-1.5 w-full rounded-full bg-gray-200">
                            <div
                              className="h-1.5 rounded-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {uploadProgress}% uploaded
                          </p>
                        </div>
                      )}
                      <Input
                        ref={fileRef}
                        className="cursor-pointer"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("image", file, {
                              shouldValidate: true,
                            });
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      {preview && (
                        <div className="relative w-fit">
                          <X
                            className="absolute right-0 size-4 cursor-pointer rounded-full dark:bg-white dark:text-black"
                            onClick={handleRemove}
                          />

                          <img
                            src={preview}
                            alt="preview"
                            className="relative mt-4 size-32 rounded object-cover"
                          />
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage className="text-end" />
                </FormItem>
              )}
            />
            <div className="text-end">
              <Button
                type="submit"
                className="w-[30%] cursor-pointer text-end disabled:cursor-not-allowed"
                disabled={status === "uploading"}
              >
                {status === "uploading" && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {status === "uploading" ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUploader;
