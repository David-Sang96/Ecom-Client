import { BiLogoFacebook } from "react-icons/bi";
import { LiaInstagram, LiaTwitter } from "react-icons/lia";
import { TiSocialLinkedin } from "react-icons/ti";

const company = ["About", "Contact us", "Support", "Careers"];
const link = ["Share Location", "Orders Tracking", "Size Guide", "FAQs"];
const legal = ["Terms & conditions", "Privacy Policy"];

const Footer = () => {
  return (
    <footer className="md:flex md:items-center md:justify-between border-t p-4 max-md:space-y-4">
      <div className="space-y-3 ">
        <h2 className="text-2xl font-medium text-primary">Ecom</h2>
        <p className="text-muted-foreground ">
          Enjoy your shopping with us for better life style.
        </p>
        <div className="flex items-center gap-1 w-full md:w-sm lg:w-xl xl:w-2xl">
          <div className="bg-primary text-white p-1.5 rounded-sm cursor-pointer">
            <BiLogoFacebook aria-label="facebook icon" />
          </div>
          <div className="bg-primary text-white p-1.5 rounded-sm cursor-pointer">
            <LiaInstagram aria-label="instagram icon" />
          </div>
          <div className="bg-primary text-white p-1.5 rounded-sm cursor-pointer">
            <LiaTwitter aria-label="twitter icon" />
          </div>
          <div className="bg-primary text-white p-1.5 rounded-sm cursor-pointer">
            <TiSocialLinkedin aria-label="linkedin icon" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 flex-1 gap-6">
        <div className="space-y-1.5">
          <h3>Company</h3>
          {company.map((item, idx) => (
            <ul key={idx}>
              <li className="text-muted-foreground text-sm cursor-pointer hover:text-black/90">
                {item}
              </li>
            </ul>
          ))}
        </div>
        <div className="space-y-1.5">
          <h3>Quick Link</h3>
          {link.map((item, idx) => (
            <ul key={idx}>
              <li className="text-muted-foreground text-sm cursor-pointer hover:text-black/90">
                {item}
              </li>
            </ul>
          ))}
        </div>
        <div className="space-y-1.5">
          <h3>Legal</h3>
          {legal.map((item, idx) => (
            <ul key={idx}>
              <li className="text-muted-foreground text-sm cursor-pointer hover:text-black/90">
                {item}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
