import { Globe } from "lucide-react";
import { Link } from "react-router";
import { ModeToggler } from "../ModeToggler";
import CartDrawer from "../product/CartDrawer";
import { DropDownNav } from "./DropDownNav";
import MobileNavMenu from "./MobileNavMenu";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-between border-b py-4 backdrop-blur md:px-4">
      <div className="flex gap-10">
        <div className="hidden items-center gap-1 lg:flex">
          <Globe size={26} aria-hidden={true} />
          <Link to={"/"} className="text-3xl font-medium">
            Ecom
          </Link>
        </div>
        <NavMenu />
        <MobileNavMenu />
      </div>
      <div className="flex items-center gap-4">
        <CartDrawer />
        <ModeToggler />
        <DropDownNav />
      </div>
    </header>
  );
};

export default Navbar;
