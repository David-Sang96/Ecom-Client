import { Globe } from "lucide-react";
import { Link } from "react-router";
import { ModeToggler } from "../ModeToggler";
import { DropDownNav } from "./DropDownNav";
import MobileNavMenu from "./MobileNavMenu";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between py-4 px-4 sticky top-0 z-50 w-full border-b  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex gap-10">
        <div className=" hidden lg:flex items-center gap-1">
          <Globe size={26} aria-hidden={true} />
          <Link to={"/"} className="text-3xl font-medium">
            Ecom
          </Link>
        </div>
        <NavMenu />
        <MobileNavMenu />
      </div>
      <div className="flex items-center gap-3">
        <ModeToggler />
        <DropDownNav />
      </div>
    </header>
  );
};

export default Navbar;
