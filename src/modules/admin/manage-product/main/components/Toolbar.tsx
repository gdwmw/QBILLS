import { FC, ReactElement } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

import { Button, Input } from "@/components";
import { useGlobalStates } from "@/hooks";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { DELETEMultipleProduct } from "@/utils";

type T = {
  checkbox: string[];
  loading: boolean;
  register: any;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
};

export const Toolbar: FC<T> = ({ checkbox, loading, register, setCheckbox, setLoading }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddDataForm } = useGlobalStates();

  const mutationMultipleDelete = useMutation({
    mutationFn: DELETEMultipleProduct,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETProduct"] });
      setLoading(false);
      setCheckbox([]);
    },
  });

  const handleMultipleDelete = () => {
    mutationMultipleDelete.mutate(checkbox);
  };

  return (
    <section>
      <div className="flex items-center gap-3 py-5">
        <h2 className="hidden whitespace-nowrap text-xl font-semibold md:block">Product List</h2>
        <div className="-mt-1.5 ml-auto w-full md:max-w-[350px]">
          <Input label="Search Product" type="text" {...register("search")} icon={<FaSearch />} />
        </div>

        <Button
          className={`min-w-[120px] whitespace-nowrap font-semibold ${loading ? "cursor-wait" : ""}`}
          disabled={checkbox.length === 0 || loading}
          onClick={handleMultipleDelete}
          solid={checkbox.length === 0 || loading ? "disabled" : "red"}
          type="button"
        >
          {loading && <Image alt="Loading..." quality={30} src={loadingAnimation} width={20} />}
          Delete ({checkbox.length})
        </Button>

        <Button
          className="w-full max-w-[150px] whitespace-nowrap font-semibold"
          onClick={() => setOpenAddDataForm(true)}
          solid={"default"}
          type="button"
        >
          Add Product
        </Button>
      </div>
    </section>
  );
};
