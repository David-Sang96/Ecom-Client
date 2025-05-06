import { BiLogoFacebook } from "react-icons/bi";
import { LiaInstagram, LiaTwitter } from "react-icons/lia";
import { TiSocialLinkedin } from "react-icons/ti";
import { TooltipHover } from "../user/Tooltip";

const company = ["About", "Contact us", "Support", "Careers"];
const link = ["Share Location", "Orders Tracking", "Size Guide", "FAQs"];
const legal = ["Terms & conditions", "Privacy Policy"];

const Footer = () => {
  return (
    <footer className=" border-t p-4">
      <div className="md:flex md:items-center md:justify-between max-md:space-y-4 py-4">
        <div className="space-y-3">
          <div className="space-y-4 mb-5">
            <h2 className="text-2xl font-medium text-primary">Ecom</h2>
            <p className="text-muted-foreground ">
              Enjoy your shopping with us for better life style.
            </p>
          </div>
          <div className="flex items-center gap-1 w-full md:w-sm lg:w-xl xl:w-2xl">
            <TooltipHover content="facebook">
              <div className=" rounded-sm cursor-pointer border">
                <BiLogoFacebook aria-label="facebook icon" size={22} />
              </div>
            </TooltipHover>
            <TooltipHover content="instagram">
              <div className=" rounded-sm cursor-pointer border">
                <LiaInstagram aria-label="instagram icon" size={22} />
              </div>
            </TooltipHover>
            <TooltipHover content="twitter">
              <div className=" rounded-sm cursor-pointe border">
                <LiaTwitter aria-label="twitter icon" size={22} />
              </div>
            </TooltipHover>
            <TooltipHover content="linkedin">
              <div className=" rounded-sm cursor-pointer border">
                <TiSocialLinkedin aria-label="linkedin icon" size={22} />
              </div>
            </TooltipHover>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 flex-1 gap-6">
          <div className="space-y-1.5">
            <h3>Company</h3>
            {company.map((item, idx) => (
              <ul key={idx}>
                <li className="text-muted-foreground text-sm cursor-pointer hover:text-foreground">
                  {item}
                </li>
              </ul>
            ))}
          </div>
          <div className="space-y-1.5">
            <h3>Quick Link</h3>
            {link.map((item, idx) => (
              <ul key={idx}>
                <li className="text-muted-foreground text-sm cursor-pointer hover:text-foreground">
                  {item}
                </li>
              </ul>
            ))}
          </div>
          <div className="space-y-1.5">
            <h3>Legal</h3>
            {legal.map((item, idx) => (
              <ul key={idx}>
                <li className="text-muted-foreground text-sm cursor-pointer hover:text-foreground">
                  {item}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ecom. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
