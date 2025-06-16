import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

const PrintAndDownload = () => {
  return (
    <div className="flex gap-3">
      <Button
        className="flex-1 cursor-pointer"
        type="button"
        variant={"outline"}
      >
        <Printer className="size-4" aria-hidden="true" /> Print
      </Button>
      <Button
        className="flex-1 cursor-pointer"
        type="button"
        variant={"outline"}
      >
        <Download className="size-4" aria-hidden="true" /> Download PDF
      </Button>
    </div>
  );
};

export default PrintAndDownload;
