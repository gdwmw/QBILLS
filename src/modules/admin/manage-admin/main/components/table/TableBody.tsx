import { IAdminAccount } from "@/utils";
import { FC } from "react";
import { ActionButton } from "./ActionButton";

type T = {
  account: IAdminAccount;
  index: number;
  handleCheckbox: (id: string) => void;
  checkbox: string[];
  setSelectedData: (data: IAdminAccount) => void;
};

export const TableBody: FC<T> = ({ account, index, checkbox, handleCheckbox, setSelectedData }) => {
  return (
    <tr className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
      <td className="px-2 py-2">
        <input
          type="checkbox"
          id={`checkbox-id-${index}`}
          name={`checkbox-name-${index}`}
          checked={checkbox.includes(account.id)}
          onChange={() => handleCheckbox(account.id)}
          disabled={account.role === "superadmin"}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-2">{account.name}</td>
      <td className="whitespace-nowrap px-2 py-2">{account.username}</td>
      <td className="whitespace-nowrap px-2 py-2">**********</td>
      <td className="whitespace-nowrap px-2 py-2">{account.role}</td>
      <td className="px-2 py-2">
        <div className="flex justify-center gap-2">
          <ActionButton account={account} setSelectedData={setSelectedData} />
        </div>
      </td>
    </tr>
  );
};
