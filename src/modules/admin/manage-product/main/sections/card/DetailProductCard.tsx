import Image from "next/image";
import { FC, ReactElement } from "react";
import { FaCoffee } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { useGlobalStates } from "@/hooks";
import detailProductBackground from "@/public/assets/images/cards/detail-product.svg";
import logoQBILLS1 from "@/public/assets/images/logos/white/logo-2.webp";
import { IProduct } from "@/utils";

type T = {
  data: IProduct | undefined;
};

const DetailProductCard: FC<T> = ({ data }): ReactElement => {
  const { setOpenCard } = useGlobalStates();

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <div className="scale-[0.4] sm:scale-[0.6] min-[826px]:scale-[0.8] lg:scale-100">
        <div className="relative w-[981px] overflow-hidden">
          <button className="absolute left-3 top-3 z-10 text-N1 active:scale-95" onClick={() => setOpenCard(false)} type="button">
            <IoClose size={25} />
          </button>

          <Image alt="Image" className="absolute left-[94px] top-44 h-auto w-[300px] rounded-lg" height={0} priority src={data?.image} width={0} />

          <div className="absolute right-0 top-0 z-10 h-full w-[487px] p-10">
            <div className="h-[434px]">
              <span>
                {(() => {
                  switch (data?.category) {
                    case "coffee":
                      return "Coffee";
                    case "non-coffee":
                      return "Non-Coffee";
                    case "snack":
                      return "Snack";
                    default:
                      return "Meal";
                  }
                })()}
              </span>

              <h1 className="w-[407px] truncate whitespace-nowrap text-4xl font-bold">{data?.name}</h1>

              <span className="mt-3 inline-block">
                Stock:{" "}
                <span className={data?.stock === "available" ? "text-S4" : "text-E4"}>
                  {data?.stock === "available" ? "Available" : "Unavailable"}
                </span>
              </span>

              <p className="mt-3 h-[282px] overflow-auto text-justify">{data?.description}</p>
            </div>

            <div className="flex h-[145px] w-full items-center pt-10">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-end gap-3">
                  <div className={`flex flex-col items-center justify-center font-semibold ${data?.size === "small" ? "text-P4" : "text-N2"}`}>
                    <FaCoffee size={30} />
                    <span>Small</span>
                  </div>

                  <div className={`flex flex-col items-center justify-center font-semibold ${data?.size === "medium" ? "text-P4" : "text-N2"}`}>
                    <FaCoffee size={40} />
                    <span>Medium</span>
                  </div>

                  <div className={`flex flex-col items-center justify-center font-semibold ${data?.size === "large" ? "text-P4" : "text-N2"}`}>
                    <FaCoffee size={50} />
                    <span>Large</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Price</span>

                  <span className="text-3xl font-semibold">
                    {new Intl.NumberFormat("id-ID", {
                      currency: "IDR",
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                      style: "currency",
                    }).format(data?.price ?? 0)}
                  </span>

                  <div className="mt-3 h-0.5 w-full bg-N7" />
                </div>
              </div>
            </div>
          </div>

          <Image alt="QBILLS" className="absolute -bottom-14 -right-5 rotate-[60deg]" priority quality={30} src={logoQBILLS1} width={160} />

          <Image alt="Card" className="w-full" priority src={detailProductBackground} />
        </div>
      </div>
    </section>
  );
};

export default DetailProductCard;
