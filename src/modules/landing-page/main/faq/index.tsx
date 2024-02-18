"use client";

import { IconButton } from "@/components";
import { FC, ReactElement, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ: FC = (): ReactElement => {
  const [openFAQ, setOpenFAQ] = useState<boolean[]>([false, false, false, false, false, false]);

  const handleSetOpenFAQ = (index: number, value: boolean) => {
    const newArray = [...openFAQ];
    newArray[index] = value;
    setOpenFAQ(newArray);
  };

  return (
    <section id="FAQ" className="bg-P1 py-36">
      <div className="container mx-auto px-10">
        <h1 className="mb-36 text-center text-6xl font-semibold">Frequently Asked Questions (FAQ)</h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 xl:gap-20 2xl:gap-40">
          <div className="space-y-5">
            <section
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-N1 p-5 shadow-md hover:border-P4 ${openFAQ[0] ? "border-P4" : "border-N1"}`}
              onClick={() => handleSetOpenFAQ(0, !openFAQ[0])}
            >
              <div className="space-y-3">
                <p className="pr-5">How can we as users manage and access our products efficiently in the application?</p>
                <p className={`pr-5 text-sm text-N4 ${openFAQ[0] ? "" : "hidden"}`}>
                  To add, manage, or access products, navigate to the &quot;Product Management&quot; section in the application. Use the designated
                  features to add new items, update existing ones, and access the product inventory.
                </p>
              </div>
              <IconButton solid={"default"} size={"md"}>
                {openFAQ[0] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
            </section>

            <section
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-N1 p-5 shadow-md hover:border-P4 ${openFAQ[1] ? "border-P4" : "border-N1"}`}
              onClick={() => handleSetOpenFAQ(1, !openFAQ[1])}
            >
              <div className="space-y-3">
                <p className="pr-5">How can we make payments efficiently in the app Qbills? And what methods are there?</p>
                <p className={`pr-5 text-sm text-N4 ${openFAQ[1] ? "" : "hidden"}`}>
                  In the application there are 3 ways that support payment methods, including cash payments, QRIS, and bank transfers. The existence
                  of this method is not without purpose, but this method is currently widely used.
                </p>
              </div>
              <IconButton solid={"default"} size={"md"}>
                {openFAQ[1] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
            </section>

            <section
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-N1 p-5 shadow-md hover:border-P4 ${openFAQ[2] ? "border-P4" : "border-N1"}`}
              onClick={() => handleSetOpenFAQ(2, !openFAQ[2])}
            >
              <div className="space-y-3">
                <p className="pr-5">How can first-time users access a manual guide when initially using the application?</p>
                <p className={`pr-5 text-sm text-N4 ${openFAQ[2] ? "" : "hidden"}`}>
                  Yes, there is a comprehensive manual guide available for first-time users. You can access it through the &quot;Help&quot; or
                  &quot;Getting Started&quot; section in the application, providing step-by-step instructions.
                </p>
              </div>
              <IconButton solid={"default"} size={"md"}>
                {openFAQ[2] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
            </section>
          </div>

          <div className="space-y-5">
            <section
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-N1 p-5 shadow-md hover:border-P4 ${openFAQ[3] ? "border-P4" : "border-N1"}`}
              onClick={() => handleSetOpenFAQ(3, !openFAQ[3])}
            >
              <div className="space-y-3">
                <p className="pr-5">How is the management of cashier accounts handled within the application?</p>
                <p className={`pr-5 text-sm text-N4 ${openFAQ[3] ? "" : "hidden"}`}>
                  Cashier accounts can be effectively managed within the application. Access the &quot;Account Management&quot; section, where you can
                  add or remove cashier accounts, assign roles, and monitor their activities.
                </p>
              </div>
              <IconButton solid={"default"} size={"md"}>
                {openFAQ[3] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
            </section>

            <section
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-N1 p-5 shadow-md hover:border-P4 ${openFAQ[4] ? "border-P4" : "border-N1"}`}
              onClick={() => handleSetOpenFAQ(4, !openFAQ[4])}
            >
              <div className="space-y-3">
                <p className="pr-5">Where can users view transaction history, both on mobile and the dashboard?</p>
                <p className={`pr-5 text-sm text-N4 ${openFAQ[4] ? "" : "hidden"}`}>
                  Users can conveniently view transaction history both on the mobile app and the dashboard. Simply navigate to the &quot;Transaction
                  History&quot; tab to access detailed records of past transactions.
                </p>
              </div>
              <IconButton solid={"default"} size={"md"}>
                {openFAQ[4] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
            </section>

            <section
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 bg-N1 p-5 shadow-md hover:border-P4 ${openFAQ[5] ? "border-P4" : "border-N1"}`}
              onClick={() => handleSetOpenFAQ(5, !openFAQ[5])}
            >
              <div className="space-y-3">
                <p className="pr-5">How does the application allow for the management of member accounts?</p>
                <p className={`pr-5 text-sm text-N4 ${openFAQ[5] ? "" : "hidden"}`}>
                  We offer a user-friendly interface for managing member accounts. In the &quot;Member Management&quot; section, you can add or remove
                  members, update information, and ensure a personalized experience for your customers.
                </p>
              </div>
              <IconButton solid={"default"} size={"md"}>
                {openFAQ[5] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
