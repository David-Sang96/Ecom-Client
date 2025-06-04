import { BiLogoFacebook } from "react-icons/bi";
import { LiaInstagram, LiaTwitter } from "react-icons/lia";
import { TiSocialLinkedin } from "react-icons/ti";
import { Link } from "react-router";
import { TooltipHover } from "../user/Tooltip";

// const company = ["About", "Contact us", "Support", "Careers"];
const company = [
  { name: "About", to: "/about" },
  { name: "Contact us", to: "/contact" },
  { name: "Support", to: "#" },
  { name: "Careers", to: "#" },
];
const link = ["Share Location", "Orders Tracking", "Size Guide", "FAQs"];
const legal = ["Terms & conditions", "Privacy Policy"];

const Footer = () => {
  return (
    <footer className="border-t p-4">
      <div className="py-4 max-md:space-y-4 md:flex md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="mb-5 space-y-4">
            <h2 className="text-primary text-2xl font-medium">Ecom</h2>
            <p className="text-muted-foreground">
              Enjoy your shopping with us for better life style.
            </p>
          </div>
          <div className="flex w-full items-center gap-1 md:w-sm lg:w-xl xl:w-2xl">
            <TooltipHover content="facebook">
              <div className="cursor-pointer rounded-sm border">
                <BiLogoFacebook aria-label="facebook icon" size={22} />
              </div>
            </TooltipHover>
            <TooltipHover content="instagram">
              <div className="cursor-pointer rounded-sm border">
                <LiaInstagram aria-label="instagram icon" size={22} />
              </div>
            </TooltipHover>
            <TooltipHover content="twitter">
              <div className="cursor-pointe rounded-sm border">
                <LiaTwitter aria-label="twitter icon" size={22} />
              </div>
            </TooltipHover>
            <TooltipHover content="linkedin">
              <div className="cursor-pointer rounded-sm border">
                <TiSocialLinkedin aria-label="linkedin icon" size={22} />
              </div>
            </TooltipHover>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3">
          <div className="space-y-1.5">
            <h3>Company</h3>
            {company.map((item, idx) => (
              <ul key={idx}>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
                  <Link to={item.to}> {item.name}</Link>
                </li>
              </ul>
            ))}
          </div>
          <div className="space-y-1.5">
            <h3>Quick Link</h3>
            {link.map((item, idx) => (
              <ul key={idx}>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
                  {item}
                </li>
              </ul>
            ))}
          </div>
          <div className="space-y-1.5">
            <h3>Legal</h3>
            {legal.map((item, idx) => (
              <ul key={idx}>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
                  {item}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="text-muted-foreground mt-8 border-t pt-6 text-center text-sm">
        © {new Date().getFullYear()} Ecom. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
