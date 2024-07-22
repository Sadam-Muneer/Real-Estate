import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import image from "../assets/sadam (2).jpg";
import nawaz from "../assets/sharif.jpg";
import image2 from "../assets/hamza.jpg";
import shahrukh from "../assets/shahrukh2.jpg";
import FAQ from "../components/FAQ";
import abdullah from "../assets/abdullah.jpg";
import mudassir from "../assets/mudassir.jpg";
import Testimonials from "../components/TestimonialSlider";
const agents = [
  {
    id: 1,
    name: "Shahrukh Nazar Malik",
    city: "Multan",
    title: "Luxury Home Specialist",
    experience: "5 years",
    phone: "+923467133632",
    whatsapp: "https://wa.me/923467133632",
    email: "shahrukhnazar@gmail.com",
    image: shahrukh,
  },
  {
    id: 2,
    name: "Abdullah Malik",
    city: "Multan",
    title: "Real Estate Consultant",
    experience: "4 years",
    phone: "+923022736698",
    whatsapp: "https://wa.me/923022736698",
    email: "abdullahmalik@gmail.com",
    image: abdullah,
  },
  {
    id: 3,
    name: "Hamza Zahoor",
    city: "Shujabad",
    title: "Apartment Expert",
    experience: "3 years",
    phone: "+923470715406",
    whatsapp: "https://wa.me/923470715406",
    email: "syedhamza@gmail.com",
    image: image2,
  },
  {
    id: 4,
    name: "Sadam Muneer",
    city: "Shujabad",
    title: "Property Manager",
    experience: "4 years",
    phone: "+923044561544",
    whatsapp: "https://wa.me/923044561544",
    email: "sadammunir@gmail.com",
    image: image,
  },
  {
    id: 5,
    name: "Mudassir Nasir",
    city: "Multan",
    title: "Commercial Real Estate Agent",
    experience: "2 years",
    phone: "+923144133994",
    whatsapp: "https://wa.me/923144133994",
    email: "mudassirnasir@gmail.com",
    image: mudassir,
  },
  {
    id: 6,
    name: "Nawaz Sharif",
    city: "Corruptionville",
    title: "The King of Cash and Carry",
    experience: "7 years",
    phone: "+923043265231",
    whatsapp: "https://wa.me/923043265231",
    email: "nawaz@gmail.com",
    image: nawaz,
  },
  {
    id: 7,
    name: "Chahat Fateh Ali khan",
    city: "Peshawar",
    title: "Luxury Property Specialist",
    experience: "3 years",
    phone: "+923043265234",
    whatsapp: "https://wa.me/923043265234",
    email: "chahatfateh@gmail.com",
    image:
      "https://i0.wp.com/celebrityspot.com.ng/wp-content/uploads/2024/04/1714254719093.jpg?ssl=1",
  },
  {
    id: 8,
    name: "Omer Khan",
    city: "Quetta",
    title: "Land Investment Consultant",
    experience: "4 years",
    phone: "+923678901234",
    whatsapp: "https://wa.me/923678901234",
    email: "omer@gmail.com",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "Hina Shah",
    city: "Sialkot",
    title: "Estate Agent",
    experience: "5 years",
    phone: "+923789012345",
    whatsapp: "https://wa.me/923789012345",
    email: "hina@gmail.com",
    image: "https://via.placeholder.com/150",
  },
];
const AgentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <main className="max-padd-container my-[99px]">
        <div className="flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5">
          <input
            type="text"
            placeholder="Search Agent by Name"
            className="bg-transparent border-none outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaLocationDot className="relative right-4 text-xl hover:text-secondary cursor-pointer" />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <div key={agent.id} className="rounded-2xl p-3 bg-white">
                <div className="pb-2 relative w-full">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="rounded-xl w-full"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="medium-18 line-clamp-1 flex items-center">
                    {agent.name}
                  </h4>
                  <div className="cursor-pointer">
                    <MdOutlinePhone className="inline-block mr-1" />
                    {agent.phone}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center py-2 cursor-pointer">
                      <AiOutlineMail className="inline-block mr-1 text-secondary" />
                      {agent.email}
                    </div>
                    <h5 className="text-secondary flex items-center cursor-pointer">
                      <FaLocationDot className="inline-block mr-1" />
                      {agent.city}
                    </h5>
                  </div>
                  <div className="flex justify-between items-center">
                    <h5 className="medium-16">{agent.title}</h5>
                    <div className="flex items-center">
                      <BiTime className="inline-block mr-1 text-secondary" />
                      {agent.experience}
                    </div>
                  </div>
                  <div className="flexBetween">
                    <a
                      href={agent.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn-secondary rounded-xl !py-[10px] !px-5 shadow-sm my-3">
                        Contact via WhatsApp
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">
              <h4 className="text-lg font-bold">
                No agents available based on your search
              </h4>
            </div>
          )}
        </div>
      </main>
      <FAQ />
      <Testimonials />
    </>
  );
};
export default AgentPage;
