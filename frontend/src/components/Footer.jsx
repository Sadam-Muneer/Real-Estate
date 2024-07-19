import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FOOTER_LINK, FOOTER_CONTACT_INFO, SOCIALS } from "../constants/data";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="max-padd-container mb-4">
      <div className="max-padd-container bg-primary rounded-tr-3xl pt-12 xl:pt-20 pb-8">
        <h3 className="h3">Explore Real Estate Opportunities With Us!</h3>
        <p className="">Discover Exceptional Homes With Real Estate</p>
        <hr className="my-8 bg-slate-900/30 h-[2px]" />
        <div className="flex justify-between flex-wrap gap-x-4 gap-y-8">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-x-2">
              <span className="font-[900] text-[24px]">
                Real <span className="font-[600] medium-20">Estate</span>
              </span>
            </Link>
            <p className="py-4">
              Explore our listings and find your dream home today. Start your
              journey to homeownership with us.
            </p>
            <div className="flex justify-between h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-transparent border-none outline-none pl-1 md:mx-2"
              />
              <button className="btn-secondary rounded-full relative ring-[0.30rem]">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-8">
            {FOOTER_LINK.map((col) => (
              <FooterColumn key={col.title} title={col.title}>
                <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link to="/">{link}</Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    to={"/"}
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p>
                      {link.label}: {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>
            <div className="flex">
              <FooterColumn title={SOCIALS.title}>
                <ul className="flex gap-3 cursor-pointer">
                  <li className="text-xl">
                    <Link
                      to="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </Link>
                  </li>
                  <li className="text-xl">
                    <Link
                      to="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </Link>
                  </li>
                  <li className="text-xl">
                    <Link
                      to="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
                    </Link>
                  </li>
                  <li className="text-xl">
                    <Link
                      to="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </Link>
                  </li>
                  {SOCIALS.links.map((link) => (
                    <li key={link.id} className="text-xl">
                      <Link to={link.url}>{link.icon}</Link>
                    </li>
                  ))}
                </ul>
                <Link
                  className="btn-secondary rounded-full relative ring-[0.30rem]"
                  to="mailto:sadammuneer390@gmail.com"
                >
                  Contact via Email
                </Link>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>
      <p className="text-white bg-tertiary medium-14 py-2 px-8 rounded-b-3xl flexBetween">
        <span>2024 Real Estate</span>
        All rights reserved
      </p>
    </footer>
  );
};
export default Footer;
const FooterColumn = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};
FooterColumn.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
