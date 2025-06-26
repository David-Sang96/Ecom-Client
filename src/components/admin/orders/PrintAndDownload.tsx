import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

type PrintAndDownloadProps = {
  reactToPrintFn: () => void;
};

const PrintAndDownload = ({ reactToPrintFn }: PrintAndDownloadProps) => {
  return (
    <div className="flex gap-3">
      <Button
        className="flex-1 cursor-pointer"
        type="button"
        variant={"outline"}
        onClick={reactToPrintFn}
      >
        <Printer className="size-4" aria-hidden="true" /> Print
      </Button>
      <Button
        className="flex-1 cursor-pointer"
        type="button"
        variant={"outline"}
        onClick={reactToPrintFn}
      >
        <Download className="size-4" aria-hidden="true" /> Download PDF
      </Button>
    </div>
  );
};

export default PrintAndDownload;
