import fetchApi from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthStore from "@/store/authStore";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ActivateAccount = () => {
  const userId = useAuthStore((store) => store.id);
  const clearAuth = useAuthStore((store) => store.clearAuth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("not_using");

  const reasonMap: Record<string, string> = {
    not_using: "I’m not using this account anymore",
    privacy: "Privacy or data concerns",
    bad_experience: "Had a bad experience",
    duplicate: "I have a duplicate account",
    other: "Other",
  };

  const handleDeactivate = async () => {
    const data = {
      userId,
      reason: reasonMap[reason],
    };
    try {
      setIsLoading(true);
      const response = await fetchApi.post("/deactivate", data);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchApi.post("/logout");
        clearAuth();
        navigate("/auth/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "something went wrong";
        toast.error(errorMessage);
      }
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Deactivate Account</CardTitle>
          <CardDescription>
            You can deactivate your account here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue={reason} onValueChange={(val) => setReason(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not_using">
                I’m not using this account anymore
              </SelectItem>
              <SelectItem value="privacy">Privacy or data concerns</SelectItem>
              <SelectItem value="bad_experience">
                Had a bad experience
              </SelectItem>
              <SelectItem value="duplicate">
                I have a duplicate account
              </SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="mt-4 w-full cursor-pointer"
            variant={"destructive"}
            onClick={() => setOpen(true)}
          >
            Deactivate
          </Button>
        </CardContent>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will diactivate your account
                but you can reactivate by logging in again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="cursor-pointer"
                disabled={isLoading}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer"
                onClick={handleDeactivate}
                disabled={isLoading}
              >
                {isLoading && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {isLoading ? "Saving..." : "Save"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
};

export default ActivateAccount;
