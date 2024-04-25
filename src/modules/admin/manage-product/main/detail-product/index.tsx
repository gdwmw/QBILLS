import detailProductBackground from "@/public/assets/images/detail-product/detail-product.svg";
import logoQbills1 from "@/public/assets/images/logos/white/logo-2.png";
import { IProduct } from "@/utils";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { FaCoffee } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useManageProduct } from "..";

type T = {
  selectedData: IProduct;
};

const DetailProduct: FC<T> = ({ selectedData }): ReactElement => {
  const { setOpenDetail } = useManageProduct(); // ZUSTAND

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <div className="scale-[0.4] sm:scale-[0.6] min-[826px]:scale-[0.8] lg:scale-100">
        <div className="relative w-[981px] overflow-hidden">
          <button type="button" onClick={() => setOpenDetail(false)} className="absolute left-3 top-3 z-10 text-N1 active:scale-95">
            <IoClose size={25} />
          </button>

          <Image
            src={selectedData.image}
            alt="Image"
            width={0}
            height={0}
            priority
            className="absolute left-[94px] top-44 h-auto w-[300px] rounded-lg"
          />

          <div className="absolute right-0 top-0 z-10 h-full w-[487px] p-10">
            <div className="h-[434px]">
              <span>
                {(() => {
                  switch (selectedData.category) {
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
              <h1 className="w-[407px] truncate whitespace-nowrap text-4xl font-bold">{selectedData.name}</h1>
              <span className="mt-3 inline-block">
                Stock:{" "}
                <span className={selectedData.stock === "available" ? "text-S4" : "text-E4"}>
                  {selectedData.stock === "available" ? "Available" : "Unavailable"}
                </span>
              </span>

              <p className="mt-3 h-[282px] overflow-auto text-justify">{selectedData.description}</p>
            </div>

            <div className="flex h-[145px] w-full items-center pt-10">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-end gap-3">
                  <div className={`flex flex-col items-center justify-center font-semibold ${selectedData.size === "small" ? "text-P4" : "text-N2"}`}>
                    <FaCoffee size={30} />
                    <span>Small</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center font-semibold ${selectedData.size === "medium" ? "text-P4" : "text-N2"}`}
                  >
                    <FaCoffee size={40} />
                    <span>Medium</span>
                  </div>
                  <div className={`flex flex-col items-center justify-center font-semibold ${selectedData.size === "large" ? "text-P4" : "text-N2"}`}>
                    <FaCoffee size={50} />
                    <span>Large</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Price</span>
                  <span className="text-3xl font-semibold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(selectedData.price)}
                  </span>
                  <div className="mt-3 h-0.5 w-full bg-N7" />
                </div>
              </div>
            </div>
          </div>

          <Image src={logoQbills1} alt="QBills" width={160} quality={30} priority className="absolute -bottom-14 -right-5 rotate-[60deg]" />

          <Image src={detailProductBackground} alt="Image" priority className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
