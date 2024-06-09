import { FC, ReactElement } from "react";

import { IMembership } from "@/utils";

import { TableBody } from "./TableBody";

const TABLE_HEAD = ["Checkbox", "Name", "Phone Number", "Point", "Action"];

type T = {
  checkbox: string[];
  data: IMembership[];
  handleCheckbox: (id: string) => void;
  loading: boolean;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
  setSelectedData: (data: IMembership) => void;
};

export const Table: FC<T> = ({ checkbox, data, handleCheckbox, loading, setCheckbox, setLoading, setSelectedData }): ReactElement => {
  return (
    <section className="overflow-hidden rounded-lg border border-N2">
      <div className="max-h-[74vh] min-h-[74vh] overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-N2">
            <tr className="text-center">
              {TABLE_HEAD.map((label, index) => (
                <th className="p-4" key={index}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((account, index) => (
              <TableBody
                checkbox={checkbox}
                data={account}
                handleCheckbox={handleCheckbox}
                index={index}
                key={index}
                loading={loading}
                setCheckbox={setCheckbox}
                setLoading={setLoading}
                setSelectedData={setSelectedData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
