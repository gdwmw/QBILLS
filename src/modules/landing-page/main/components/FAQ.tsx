"use client";

import { IconButton } from "@/components";
import { FC, ReactElement, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA = [
  {
    question: "How can users efficiently manage and access products in the application?",
    answer:
      'To add, manage, or access products, navigate to the "Product Management" section in the application. Utilize the designated features to add new items, update existing ones, and access the product inventory.',
  },
  {
    question: "How can payments be made efficiently in the QBILLS app? And what methods are available?",
    answer:
      "In the application, there are three supported payment methods: cash payments, QRIS, and bank transfers. The existence of these methods serves a purpose and is currently widely utilized.",
  },
  {
    question: "How is the management of cashier accounts handled within the application?",
    answer:
      'Cashier accounts can be effectively managed within the application. Access the "Account Management" section, where you can add or remove cashier accounts, assign roles, and monitor their activities.',
  },
  {
    question: "Where can users view transaction history, both on mobile and the dashboard?",
    answer:
      'Users can conveniently view transaction history both on the mobile app and the dashboard. Simply navigate to the "Transaction History" tab to access detailed records of past transactions.',
  },
  {
    question: "How can first-time users access a manual guide when initially using the application?",
    answer:
      'Yes, there is a comprehensive manual guide available for first-time users. You can access it through the "Help" or "Getting Started" section in the application, providing step-by-step instructions.',
  },
  {
    question: "How does the application allow for the management of member accounts?",
    answer:
      'We offer a user-friendly interface for managing member accounts. In the "Member Management" section, you can add or remove members, update information, and ensure a personalized experience for your customers.',
  },
];

type TFAQSection = {
  data: FAQItem;
};

const FAQSection: FC<TFAQSection> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      role="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-N1 p-5 shadow-md hover:border-P4 ${isOpen ? "border-P4" : "border-N1"}`}
    >
      <div className="space-y-3">
        <p className="pr-5">{data.question}</p>
        <p className={`pr-5 text-sm text-N4 ${isOpen ? "" : "hidden"}`}>{data.answer}</p>
      </div>
      <IconButton solid={"default"} size={"md"}>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </IconButton>
    </section>
  );
};

export const FAQ: FC = (): ReactElement => {
  return (
    <>
      <section id="FAQ" className="bg-P1 py-36">
        <div className="container mx-auto px-10">
          <h1 className="mb-36 text-center text-6xl font-semibold">Frequently Asked Questions (FAQ)</h1>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 xl:gap-20">
            <div className="space-y-5">
              {FAQ_DATA.slice(0, 3).map((faq, index) => (
                <FAQSection key={index} data={faq} />
              ))}
            </div>
            <div className="space-y-5">
              {FAQ_DATA.slice(3, 6).map((faq, index) => (
                <FAQSection key={index} data={faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-P1">
        <div className="mx-auto h-0.5 w-36 rounded-full bg-N7" />
      </div>
    </>
  );
};
