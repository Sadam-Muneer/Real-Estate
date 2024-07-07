import AboutImage from "../assets/about.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const About = () => {
  const statistics = [
    { label: "Happy Clients", value: 12 },
    { label: "Different Cities", value: 3 },
    { label: "Projects Completed", value: 45 },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const visible = top < window.innerHeight - 100;
        setIsVisible(visible);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about" className="max-padd-container py-16 xl:py-28">
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="flex-1 relative">
          <img
            src={AboutImage}
            alt="AboutImage"
            className="rounded-3xl rounded-tr-[155px] w-[488px]"
          />
          <div
            className={`bg-white absolute bottom-16 left-3 sm:left-16 max-w-xs p-4 rounded-lg flexCenter flex-col ${
              isVisible ? "block" : "hidden"
            }`}
          >
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
              <RiDoubleQuotesL className="font-2xl" />
            </span>
            <p className="text-center relative bottom-3">
              Experience the joy of finding your dream home with us, where
              quality and comfort await at every doorstep.
            </p>
          </div>
        </div>
        <div className=" flex flex-1 justify-center flex-col">
          <span className="medium-18">Unveiling Our Journey</span>
          <h2 className="h2">
            Our Commitment: Crafting Extraordinary Real Estate Experiences
          </h2>
          <p className="py-5">
            At Real Estate Inc., we are dedicated to exceeding your
            expectations. With a passion for excellence, we strive to create
            homes that inspire and elevate everyday living. Our commitment to
            craftsmanship and innovation ensures that each property embodies
            quality and timeless elegance.
          </p>
          <div className="flex flex-wrap gap-4">
            {statistics.map((statistic, index) => (
              <div key={index} className="bg-primary p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={statistic.value}
                    duration={5}
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <h3
                        ref={countUpRef}
                        className="text-2xl font-semibold"
                      ></h3>
                    )}
                  </CountUp>
                  <h4 className="bold-22">k+</h4>
                </div>
                <p>{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
