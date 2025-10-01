import Image from "next/image";
import { FC, ReactElement } from "react";

import { IProduct } from "@/utils";

import { ActionButton } from "./ActionButton";

type T = {
  checkbox: string[];
  data: IProduct;
  handleCheckbox: (id: string) => void;
  index: number;
  loading: boolean;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
  setSelectedData: (data: IProduct) => void;
};

export const TableBody: FC<T> = ({ checkbox, data, handleCheckbox, index, loading, setCheckbox, setLoading, setSelectedData }): ReactElement => {
  return (
    <tr className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
      <td className="p-2">
        <input checked={checkbox.includes(data.id)} name={`checkbox-name-${index}`} onChange={() => handleCheckbox(data.id)} type="checkbox" />
      </td>
      <td className="p-2">
        <Image
          alt="Product Image"
          className="mx-auto size-fit max-h-[50px] max-w-[50px] rounded-md"
          height={0}
          quality={30}
          src={data.image}
          width={0}
        />
      </td>
      <td className="whitespace-nowrap p-2">{data.code}</td>
      <td className="whitespace-nowrap p-2">{data.name}</td>
      <td className="min-w-80 max-w-96 p-2">
        <p className="max-h-16 overflow-y-auto text-justify">{data.description}</p>
      </td>
      <td className="whitespace-nowrap p-2">
        {(() => {
          switch (data.category) {
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
      </td>
      <td className="whitespace-nowrap p-2">
        {(() => {
          switch (data.size) {
            case "medium":
              return "Medium";
            case "small":
              return "Small";
            default:
              return "Large";
          }
        })()}
      </td>
      <td className="whitespace-nowrap p-2">
        {new Intl.NumberFormat("id-ID", {
          currency: "IDR",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
          style: "currency",
        }).format(data.price)}
      </td>
      <td className={`whitespace-nowrap p-2 ${data.stock === "available" ? "text-S4" : "text-E4"}`}>
        {data.stock === "available" ? "Available" : "Unavailable"}
      </td>
      <td className="p-2">
        <div className="flex justify-center gap-2">
          <ActionButton data={data} loading={loading} setCheckbox={setCheckbox} setLoading={setLoading} setSelectedData={setSelectedData} />
        </div>
      </td>
    </tr>
  );
};
