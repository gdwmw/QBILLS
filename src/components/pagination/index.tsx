import { FC, ReactElement } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type T = {
  startData: number;
  endData: number;
  total: number;
  currentPage: number;
  totalPage: number;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
};

export const Pagination: FC<T> = ({ startData, endData, total, currentPage, totalPage, onClickPrevPage, onClickNextPage }): ReactElement => {
  return (
    <section className="mt-5 w-full border-t py-3">
      <div className="flex items-center justify-between">
        <section>
          <span className="text-sm font-semibold text-N3">{`Showing ${startData} - ${endData} of ${total} result.`}</span>
        </section>

        <section>
          <ul className="flex items-center gap-3">
            <li>
              <button type="button" onClick={onClickPrevPage}>
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
              <button type="button" onClick={onClickNextPage}>
                <IoIosArrowForward className="cursor-pointer text-N3 hover:text-N7 active:scale-95" />
              </button>
            </li>
          </ul>
        </section>

        <section>
          <span className="text-sm font-semibold text-N3">{`Showing ${startData} - ${endData} of ${total} result.`}</span>
        </section>
      </div>
    </section>
  );
};
