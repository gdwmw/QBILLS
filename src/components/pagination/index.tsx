import { FC, ReactElement } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type T = {
  currentPage: number;
  endData: number | undefined;
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
  startData: number;
  totalData: number | undefined;
  totalPage: number | undefined;
};

export const Pagination: FC<T> = ({ currentPage, endData, onClickNextPage, onClickPrevPage, startData, totalData, totalPage }): ReactElement => {
  return (
    <section className="mt-5 w-full border-t py-3">
      <div className="flex items-center justify-between">
        <section>
          <span className="text-sm font-semibold text-N3">{`Showing ${startData} - ${endData} of ${totalData} result.`}</span>
        </section>

        <section>
          <ul className="flex items-center gap-3">
            <li>
              <button onClick={onClickPrevPage} type="button">
                <IoIosArrowBack className="cursor-pointer text-N3 hover:text-N7 active:scale-95" />
              </button>
            </li>

            <li>
              <span className="text-sm">{currentPage}</span>
            </li>
            <li>
              <span className="text-N3">/</span>
            </li>
            <li>
              <span className="text-sm">{totalPage}</span>
            </li>

            <li>
              <button onClick={onClickNextPage} type="button">
                <IoIosArrowForward className="cursor-pointer text-N3 hover:text-N7 active:scale-95" />
              </button>
            </li>
          </ul>
        </section>

        <section>
          <span className="text-sm font-semibold text-N3">{`Showing ${startData} - ${endData} of ${totalData} result.`}</span>
        </section>
      </div>
    </section>
  );
};
