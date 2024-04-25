"use client";

import { Button, IconButton, Input, Pagination } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { DELETEMultipleProduct, DELETEProduct, GETProduct, IProduct } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidDetail } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { create } from "zustand";
const AddData = dynamic(() => import("./add-data"));
const UpdateData = dynamic(() => import("./update-data"));
const DetailProduct = dynamic(() => import("./detail-product"));

// ZUSTAND
type States = {
  openAddData?: boolean;
  openUpdateData?: boolean;
  openDetail?: boolean;
};

type Actions = {
  setOpenAddData: (param: boolean) => void;
  setOpenUpdateData: (param: boolean) => void;
  setOpenDetail: (param: boolean) => void;
};

export const useManageProduct = create<States & Actions>((set) => ({
  openAddData: false,
  openUpdateData: false,
  openDetail: false,
  setOpenAddData: (openAddData: boolean) => set({ openAddData }),
  setOpenUpdateData: (openUpdateData: boolean) => set({ openUpdateData }),
  setOpenDetail: (openDetail: boolean) => set({ openDetail }),
}));
// END ZUSTAND

export const Main: FC = (): ReactElement => {
  const queryClient = useQueryClient(); // REACT QUERY
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [checkboxCount, setCheckboxCount] = useState<number>(0);
  const { openAddData, openUpdateData, openDetail, setOpenAddData, setOpenUpdateData, setOpenDetail } = useManageProduct(); // ZUSTAND
  const [selectedData, setSelectedData] = useState<IProduct>({
    id: "",
    code: "",
    name: "",
    description: "",
    category: "",
    size: "",
    price: 0,
    stock: "",
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean[]>([false]);

  // REACT QUERY
  const { data } = useQuery({
    queryKey: ["GETProduct"],
    queryFn: GETProduct,
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => DELETEProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETProduct"] });
    },
  });

  const mutationMultipleDelete = useMutation({
    mutationFn: (ids: string[]) => DELETEMultipleProduct(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETProduct"] });
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
    const result = data.code.toLowerCase().includes(watch("search").toLowerCase()) || data.name.toLowerCase().includes(watch("search").toLowerCase());
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
          <h2 className="hidden whitespace-nowrap text-xl font-semibold md:block">Product List</h2>
          <div className="-mt-1.5 ml-auto w-full md:max-w-[350px]">
            <Input type="text" label="Search Product" {...register("search")} id="search-product" icon={<FaSearch />}></Input>
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
            Add Product
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-N2">
        <div className="max-h-[74vh] overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-N2">
              <tr className="text-center">
                <th className="px-4 py-4">Checkbox</th>
                <th className="px-4 py-4">Image</th>
                <th className="px-4 py-4">Code</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Description</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Size</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((product, index) => (
                <tr key={product.id} className={`text-center ${index % 2 === 0 ? "bg-N1" : "bg-N2.2"}`}>
                  <td className="px-2 py-2">
                    <input type="checkbox" checked={checkbox.includes(product.id)} onChange={() => handleCheckbox(product.id)} />
                  </td>
                  <td className="px-2 py-2">
                    <Image
                      src={product.image}
                      alt="Image"
                      width={0}
                      height={0}
                      quality={30}
                      className="mx-auto h-fit max-h-[50px] w-fit max-w-[50px] rounded-md"
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-2">{product.code}</td>
                  <td className="whitespace-nowrap px-2 py-2">{product.name}</td>
                  <td className="min-w-80 max-w-96 px-2 py-2">
                    <p className="max-h-16 overflow-y-auto text-justify">{product.description}</p>
                  </td>
                  <td className="whitespace-nowrap px-2 py-2">
                    {(() => {
                      switch (product.category) {
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
                  <td className="whitespace-nowrap px-2 py-2">
                    {(() => {
                      switch (product.size) {
                        case "small":
                          return "Small";
                        case "medium":
                          return "Medium";
                        default:
                          return "Large";
                      }
                    })()}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </td>
                  <td className={`whitespace-nowrap px-2 py-2 ${product.stock === "available" ? "text-S4" : "text-E4"}`}>
                    {product.stock === "available" ? "Available" : "Unavailable"}
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex justify-center gap-2">
                      <IconButton
                        type="button"
                        solid={"green"}
                        size={"sm"}
                        onClick={() => {
                          setSelectedData({
                            id: product.id,
                            code: product.code,
                            name: product.name,
                            description: product.description,
                            category: product.category,
                            size: product.size,
                            price: product.price,
                            stock: product.stock,
                            image: product.image,
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
                        onClick={() => handleDelete(product.id, index + 1)}
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
                            id: product.id,
                            code: product.code,
                            name: product.name,
                            description: product.description,
                            category: product.category,
                            size: product.size,
                            price: product.price,
                            stock: product.stock,
                            image: product.image,
                          });
                          setOpenDetail(true);
                        }}
                      >
                        <BiSolidDetail />
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
      {openDetail && <DetailProduct selectedData={selectedData} />}
    </main>
  );
};
