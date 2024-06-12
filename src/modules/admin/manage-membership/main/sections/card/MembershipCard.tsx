import { FC, ReactElement } from "react";

import Image from "next/image";
import { IoClose } from "react-icons/io5";

import { Logo } from "@/components";
import { useGlobalStates } from "@/hooks";
import cardBackground from "@/public/assets/images/cards/membership-card.svg";
import { IMembership } from "@/utils";

type T = {
  data: IMembership | undefined;
};

const MembershipCard: FC<T> = ({ data }): ReactElement => {
  const { setOpenCard } = useGlobalStates();

  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <div className="relative w-[500px]">
        <button className="absolute left-3 top-3 z-10 text-N1 active:scale-95" onClick={() => setOpenCard(false)} type="button">
          <IoClose size={25} />
        </button>

        <div className="absolute flex size-full items-center justify-center pb-16 pr-[61px]">
          <Logo size={1.6} />
        </div>

        <h1 className="absolute bottom-5 left-5 w-[293px] text-2xl text-N1">{data?.name.toUpperCase()}</h1>

        <Image alt="Card" className="w-full" priority src={cardBackground} />
      </div>
    </section>
  );
};

export default MembershipCard;
