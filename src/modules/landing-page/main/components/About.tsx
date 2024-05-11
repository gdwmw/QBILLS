import { FC, ReactElement } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";

export const About: FC = (): ReactElement => {
  return (
    <>
      <section id="About" className="bg-P1 py-36">
        <div className="container mx-auto px-10">
          <div className="grid grid-rows-1 gap-20 lg:grid-cols-2 lg:grid-rows-none">
            <section className="flex flex-col justify-center gap-5">
              <h1 className="text-6xl font-semibold">About Us</h1>

              <p>
                Elevate your sales strategy and delight customers with our state-of-the-art POS application, offering a seamless and user-friendly
                interface for enhanced transactions. QBILLS is here to be a solution for your business, features are available to make your work
                easier, use it now.
              </p>
            </section>

            <div className="flex flex-col items-center gap-14">
              <div className="flex gap-5">
                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <MdAddToPhotos />
                  </i>
                  <h2 className="text-xl font-semibold">Create Order</h2>
                  <p className="text-sm">You have the option to request food through the Qbilss POS application.</p>
                </section>

                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaUserCircle />
                  </i>
                  <h2 className="text-xl font-semibold">Manage Account Cashier</h2>
                  <p className="text-sm">The use of membership provides its users with coupons, discounts, rewards, loyalty points.</p>
                </section>
              </div>

              <div className="flex gap-5">
                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaBoxesStacked />
                  </i>
                  <h2 className="text-xl font-semibold">Manage Product</h2>
                  <p className="text-sm">In the admin features there are product management features for coffee shops.</p>
                </section>

                <section className="w-full max-w-[335px] space-y-1">
                  <i className="text-3xl text-P4">
                    <FaMoneyBillTransfer />
                  </i>
                  <h2 className="text-xl font-semibold">Track Transaction History</h2>
                  <p className="text-sm">The use of membership provides its users with coupons, discounts, rewards, loyalty points.</p>
                </section>
              </div>
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
