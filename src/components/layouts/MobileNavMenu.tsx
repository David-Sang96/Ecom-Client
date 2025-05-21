import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Globe, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const MobileNavMenu = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const query = "(min-width: 1024px)";

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    const result = matchMedia(query);
    result.addEventListener("change", onChange);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  if (isDesktop) return null;

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu aria-label="Toggle Menu" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-5">
          <div className="flex items-center gap-1 ps-3">
            <Globe size={26} aria-hidden={true} />
            <span className="text-2xl font-medium">Ecom</span>
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-20rem)]">
            <div className="flex-col gap-2 space-y-2 text-center">
              <div className="pb-1">
                <SheetClose asChild>
                  <Link to={"/"}>Home</Link>
                </SheetClose>
              </div>
              <Separator />
              <div className="pb-1">
                <SheetClose asChild>
                  <Link to={"/about"}>About</Link>
                </SheetClose>
              </div>
              <Separator />
              <div className="pb-1">
                <SheetClose asChild>
                  <Link to={"/me"}>My Profile</Link>
                </SheetClose>
              </div>
              <Separator />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavMenu;
