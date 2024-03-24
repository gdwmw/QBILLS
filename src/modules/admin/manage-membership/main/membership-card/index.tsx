import { IMembership } from "@/libs";
import cardBackground from "@/public/assets/images/card/membership-card.svg";
import logoQbills1 from "@/public/assets/images/logos/white/logo-2.png";
import logoQbills2 from "@/public/assets/images/logos/white/logo-4.png";
import logoQbills3 from "@/public/assets/images/logos/white/logo-5.png";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { IoClose } from "react-icons/io5";
import { useManageMembership } from "..";

type T = {
  selectedData: IMembership;
};

const MembershipCard: FC<T> = ({ selectedData }): ReactElement => {
  const { setOpenCard } = useManageMembership(); // ZUSTAND

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <div className="relative w-[500px]">
        <button type="button" onClick={() => setOpenCard(false)} className="absolute left-3 top-3 z-10 text-N1 active:scale-95">
          <IoClose size={25} />
        </button>
        <div className="absolute flex h-full w-full items-center justify-center pb-16 pr-[61px]">
          <div className="flex h-fit w-fit items-center justify-center gap-2">
            <Image src={logoQbills1} alt="QBills" width={68} quality={30} priority />
            <div>
              <Image src={logoQbills2} alt="QBills" width={187} quality={30} priority className="mx-auto mb-1" />
              <Image src={logoQbills3} alt="QBills" width={221} quality={30} priority />
            </div>
          </div>
        </div>
        <h1 className="absolute bottom-5 left-5 w-[293px] text-2xl text-N1">{selectedData.name.toUpperCase()}</h1>
        <Image src={cardBackground} alt="Image" priority className="w-full" />
      </div>
    </section>
  );
};

export default MembershipCard;
