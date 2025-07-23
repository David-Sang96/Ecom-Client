import { UploadCloud, X } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type DropzonrProps = {
  className?: string;
  existingImagesCount?: number;
};

const Dropzone = ({ className, existingImagesCount }: DropzonrProps) => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [_, setRejected] = useState<FileRejection[]>([]);
  const { setValue, clearErrors, formState } = useFormContext<{
    images: File[];
  }>();

  const imageCount = existingImagesCount ?? 0;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Filter out duplicates
      const newValidFiles = acceptedFiles.filter((file) => {
        const isDuplicate = files.some(
          (f) => f.name === file.name && f.size === file.size,
        );
        if (isDuplicate) {
          toast.error(`${file.name} is already added.`);
        }
        return !isDuplicate;
      });

      // Check for max total files (existing + newValid)
      if (files.length + newValidFiles.length + imageCount > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }

      // Add preview
      const updatedFiles = newValidFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );

      setFiles((prev) => {
        const newFiles = [...prev, ...updatedFiles];
        setValue("images", newFiles, { shouldValidate: true });
        return newFiles;
      });

      clearErrors("images");

      if (rejectedFiles?.length) {
        setRejected((prev) => [...prev, ...rejectedFiles]);

        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach((error) => {
            if (error.code === "file-invalid-type") {
              toast.error(`"${file.name}" is not a valid image type.`);
            } else if (error.code === "file-too-large") {
              toast.error(`"${file.name}" is too large. Max size is 5MB.`);
            } else if (error.code === "too-many-files") {
              toast.error(`You can only select up to 5 images.`);
            } else {
              toast.error(error.message);
            }
          });
        });
      }
    },
    [setValue, clearErrors, files, imageCount],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5,
  });

  const removeFile = (fileName: string, size: number) => {
    const filtered = files.filter(
      (file) => file.name !== fileName && file.size !== size,
    );
    setFiles(filtered);
    setValue("images", filtered, { shouldValidate: true });
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Upload Files*</CardTitle>
          <CardDescription>You can only upload up to 5 images</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className="rounded-md border border-dotted border-neutral-200 p-9 text-center md:p-16"
          >
            <input {...getInputProps()} />
            <div className="flex justify-center pb-4">
              <UploadCloud className="size-8 text-blue-300 md:size-10" />
            </div>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="max-sm:text-sm">
                <span className="font-medium">Click to upload</span> or drag and
                drop{" "}
                <span className="text-muted-foreground text-sm">
                  JPG,PNG,WEPB or JPEG (MAX SIZE - 5MB)
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {files.map((file) => (
          <div className="relative" key={file.name}>
            <X
              size={18}
              className="absolute -top-3 right-0 cursor-pointer rounded-full bg-red-500 text-white"
              onClick={() => removeFile(file.name, file.size)}
            />
            <img
              src={file.preview}
              className="size-18 rounded-sm"
              key={file.name}
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
          </div>
        ))}
        {formState.errors.images && (
          <p className="mt-1 text-sm text-red-500">
            {formState.errors.images.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
