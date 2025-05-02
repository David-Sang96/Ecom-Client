import { Globe } from "lucide-react";
import { Link } from "react-router";
import { ModeToggler } from "../ModeToggler";
import { DropDownNav } from "./DropDownNav";
import MobileNavMenu from "./MobileNavMenu";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-2 px-4">
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
    </div>
  );
};

export default Navbar;
