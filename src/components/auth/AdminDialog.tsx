import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const AdminDialog = () => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const openChange = () => setOpen((prev) => !prev);

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button type="button" variant={"link"} className="cursor-pointer">
          Become an admin
        </Button>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle className="text-start">
            Enter Admin Secret Code
          </DialogTitle>
        </DialogHeader>
        <FormField
          control={control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Code</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" onClick={openChange} className="cursor-pointer">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AdminDialog;
