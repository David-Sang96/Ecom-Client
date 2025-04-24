import { Globe } from "lucide-react";
import { Link } from "react-router";
import { DropDownNav } from "./DropDownNav";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-1">
        <Globe size={26} aria-hidden={true} />
        <Link to={"/"} className="text-3xl font-medium">
          Ecom
        </Link>
      </div>
      <NavMenu />
      <DropDownNav />
    </div>
  );
};

export default Navbar;
