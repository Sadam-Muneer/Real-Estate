import { useState } from "react";
const AgentsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "How do I find an agent?",
      answer:
        "You can find an agent by using our search feature on the homepage or browsing through the agents' directory.",
    },
    {
      question: "What qualifications do your agents have?",
      answer:
        "Our agents are licensed professionals with varying levels of experience, ensuring that you receive knowledgeable assistance.",
    },
    {
      question: "Can I contact an agent directly?",
      answer:
        "Yes, you can contact any agent directly via phone or WhatsApp using the information provided on their profile.",
    },
    {
      question: "How can I become an agent?",
      answer:
        "To become an agent, you need to complete the application process on our website and meet the required qualifications.",
    },
  ];
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
      <section className="py-5 bg-white-50 sm:py-5 lg:py-12 border-xl">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Explore Common Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer"
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  onClick={() => toggleAnswer(index)}
                >
                  <span className="flex text-lg font-semibold text-black">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default AgentsFAQ;
