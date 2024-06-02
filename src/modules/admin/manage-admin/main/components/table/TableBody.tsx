import { FC } from "react";

import { IAdminAccount } from "@/utils";

import { ActionButton } from "./ActionButton";

type T = {
  checkbox: string[];
  data: IAdminAccount;
  handleCheckbox: (id: string) => void;
  index: number;
  loading: boolean;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
  setSelectedData: (data: IAdminAccount) => void;
};

export const TableBody: FC<T> = ({ checkbox, data, handleCheckbox, index, loading, setCheckbox, setLoading, setSelectedData }) => {
  return (
    <tr className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
      <td className="p-2">
        <input
          checked={checkbox.includes(data.id)}
          disabled={data.role === "superadmin"}
          name={`checkbox-name-${index}`}
          onChange={() => handleCheckbox(data.id)}
          type="checkbox"
        />
      </td>
      <td className="whitespace-nowrap p-2">{data.name}</td>
      <td className="whitespace-nowrap p-2">{data.username}</td>
      <td className="whitespace-nowrap p-2">**********</td>
      <td className="whitespace-nowrap p-2">{data.role}</td>
      <td className="p-2">
        <div className="flex justify-center gap-2">
          <ActionButton data={data} loading={loading} setCheckbox={setCheckbox} setLoading={setLoading} setSelectedData={setSelectedData} />
        </div>
      </td>
    </tr>
  );
};
