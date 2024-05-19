import { IAdminAccount } from "@/utils";
import { FC } from "react";
import { ActionButton } from "./ActionButton";

type T = {
  data: IAdminAccount;
  index: number;
  handleCheckbox: (id: string) => void;
  checkbox: string[];
  setSelectedData: (data: IAdminAccount) => void;
  setCheckbox: (value: string[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const TableBody: FC<T> = ({ data, index, checkbox, handleCheckbox, setSelectedData, setCheckbox, loading, setLoading }) => {
  return (
    <tr className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
      <td className="px-2 py-2">
        <input
          type="checkbox"
          name={`checkbox-name-${index}`}
          checked={checkbox.includes(data.id)}
          onChange={() => handleCheckbox(data.id)}
          disabled={data.role === "superadmin"}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-2">{data.name}</td>
      <td className="whitespace-nowrap px-2 py-2">{data.username}</td>
      <td className="whitespace-nowrap px-2 py-2">**********</td>
      <td className="whitespace-nowrap px-2 py-2">{data.role}</td>
      <td className="px-2 py-2">
        <div className="flex justify-center gap-2">
          <ActionButton data={data} setSelectedData={setSelectedData} setCheckbox={setCheckbox} loading={loading} setLoading={setLoading} />
        </div>
      </td>
    </tr>
  );
};
