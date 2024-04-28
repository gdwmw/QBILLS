"use client";

import { Button, IconButton, Input, Pagination } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { DELETEMembership, DELETEMultipleMembership, GETMembership, IMembership } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAddressCard, FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { create } from "zustand";
const AddData = dynamic(() => import("./add-data"));
const UpdateData = dynamic(() => import("./update-data"));
const MembershipCard = dynamic(() => import("./membership-card"));

// ZUSTAND
type States = {
  openAddData?: boolean;
  openUpdateData?: boolean;
  openCard?: boolean;
};

type Actions = {
  setOpenAddData: (param: boolean) => void;
  setOpenUpdateData: (param: boolean) => void;
  setOpenCard: (param: boolean) => void;
};

export const useManageMembership = create<States & Actions>((set) => ({
  openAddData: false,
  openUpdateData: false,
  openCard: false,
  setOpenAddData: (openAddData: boolean) => set({ openAddData }),
  setOpenUpdateData: (openUpdateData: boolean) => set({ openUpdateData }),
  setOpenCard: (openCard: boolean) => set({ openCard }),
}));
// END ZUSTAND

export const Main: FC = (): ReactElement => {
  const queryClient = useQueryClient(); // REACT QUERY
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [checkboxCount, setCheckboxCount] = useState<number>(0);
  const { openAddData, openUpdateData, openCard, setOpenAddData, setOpenUpdateData, setOpenCard } = useManageMembership(); // ZUSTAND
  const [selectedData, setSelectedData] = useState<IMembership>({ id: "", name: "", "phone-number": 0, point: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean[]>([false]);

  // REACT QUERY
  const { data } = useQuery({
    queryKey: ["GETMembership"],
    queryFn: GETMembership,
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => DELETEMembership(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETMembership"] });
    },
  });

  const mutationMultipleDelete = useMutation({
    mutationFn: (ids: string[]) => DELETEMultipleMembership(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETMembership"] });
      setCheckbox([]);
      setCheckboxCount(0);
    },
  });
  // END REACT QUERY

  useEffect(() => {
    setLoading(new Array(data?.length).fill(false));
  }, [data]);

  const handleSetLoding = (index: number, value: boolean) => {
    const newArray = [...loading];
    newArray[index] = value;
    setLoading(newArray);
  };

  const handleDelete = (id: string, index: number) => {
    handleSetLoding(index, true);
    mutationDelete.mutate(id, {
      onSuccess: () => {
        handleSetLoding(index, false);
      },
    });
  };

  const handleMultipleDelete = () => {
    handleSetLoding(0, true);
    mutationMultipleDelete.mutate(checkbox, {
      onSuccess: () => {
        handleSetLoding(0, false);
      },
    });
  };

  // REACT HOOK FORM
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });
  // END REACT HOOK FORM

  const searchResult = data?.filter((data) => {
    const result =
      data.name.toLowerCase().includes(watch("search").toLowerCase()) || data["phone-number"].toString().includes(watch("search").toLowerCase());
    return result;
  });

  const handleCheckbox = (id: string) => {
    setCheckbox((prev) => {
      const selected = prev.includes(id);
      const updated = selected ? prev.filter((row) => row !== id) : [...prev, id];
      setCheckboxCount(updated.length);
      return updated;
    });
  };

  const perPage = 30;
  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = searchResult?.slice(indexOfFirstData, indexOfLastData);
  const totalPage = searchResult && Math.ceil(searchResult.length / perPage);

  useEffect(() => {
    if (data?.length !== 0) {
      setCurrentPage(1);
    }
  }, [data]);

  return (
    <main className="px-5">
      <section>
        <div className="flex items-center gap-3 py-5">
          <h2 className="hidden whitespace-nowrap text-xl font-semibold md:block">Membership List</h2>
          <div className="-mt-1.5 ml-auto w-full md:max-w-[350px]">
            <Input type="text" label="Search Member" {...register("search")} id="search-member" icon={<FaSearch />}></Input>
          </div>
          <Button
            type="button"
            solid={checkboxCount === 0 || loading[0] ? "disabled" : "red"}
            size={"sm"}
            widthFull
            disabled={checkboxCount === 0 || loading[0]}
            onClick={handleMultipleDelete}
            className={`max-w-[120px] whitespace-nowrap font-semibold ${loading[0] ? "cursor-wait" : ""}`}
          >
            <Image src={loadingAnimation} alt="Loading..." width={20} quality={30} className={loading[0] ? "" : "hidden"} />
            Delete ({checkboxCount})
          </Button>
          <Button
            type="button"
            solid={"default"}
            size={"sm"}
            widthFull
            onClick={() => setOpenAddData(true)}
            className="max-w-[150px] whitespace-nowrap font-semibold"
          >
            Add Member
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-N2">
        <div className="max-h-[74vh] overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-N2">
              <tr className="text-center">
                <th className="px-4 py-4">Checkbox</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Phone Number</th>
                <th className="px-4 py-4">Point</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((member, index) => (
                <tr key={member.id} className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      id={`checkbox-id-${index}`}
                      name={`checkbox-name-${index}`}
                      checked={checkbox.includes(member.id)}
                      onChange={() => handleCheckbox(member.id)}
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-2">{member.name}</td>
                  <td className="whitespace-nowrap px-2 py-2">{`+${member["phone-number"]}`}</td>
                  <td className="whitespace-nowrap px-2 py-2">{member.point}</td>
                  <td className="px-2 py-2">
                    <div className="flex justify-center gap-2">
                      <IconButton
                        type="button"
                        solid={"green"}
                        size={"sm"}
                        onClick={() => {
                          setSelectedData({
                            id: member.id,
                            name: member.name,
                            "phone-number": member["phone-number"],
                            point: member.point,
                          });
                          setOpenUpdateData(true);
                        }}
                      >
                        <MdEdit />
                      </IconButton>

                      <IconButton
                        type="button"
                        solid={loading[index + 1] ? "disabled" : "red"}
                        size={"sm"}
                        onClick={() => handleDelete(member.id, index + 1)}
                        disabled={loading[index + 1]}
                        className={loading[index + 1] ? "cursor-wait" : ""}
                      >
                        {loading[index + 1] ? <Image src={loadingAnimation} alt="Loading..." width={16} quality={30} /> : <MdDelete />}
                      </IconButton>

                      <IconButton
                        type="button"
                        solid={"blue"}
                        size={"sm"}
                        onClick={() => {
                          setSelectedData({
                            id: member.id,
                            name: member.name,
                            "phone-number": member["phone-number"],
                            point: member.point,
                          });
                          setOpenCard(true);
                        }}
                      >
                        <FaAddressCard />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Pagination
        startData={indexOfLastData > 0 ? indexOfFirstData + 1 : 0}
        endData={(searchResult && Math.min(indexOfLastData, searchResult.length)) ?? 0}
        total={searchResult?.length ?? 0}
        currentPage={currentPage ?? 0}
        totalPage={totalPage ?? 0}
        onClickPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onClickNextPage={() => {
          if (totalPage !== undefined) {
            setCurrentPage((prev) => Math.min(prev + 1, totalPage));
          }
        }}
      />

      {openAddData && <AddData />}
      {openUpdateData && <UpdateData selectedData={selectedData} />}
      {openCard && <MembershipCard selectedData={selectedData} />}
    </main>
  );
};
