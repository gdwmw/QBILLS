import { Button } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { useGlobalStates } from "@/states";
import { DELETEMultipleAdminAccount } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, ReactNode } from "react";

type T = {
  checkbox: string[];
  setCheckbox: (value: string[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  searchElement: ReactNode;
};

export const Toolbar: FC<T> = ({ checkbox, setCheckbox, loading, setLoading, searchElement }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddData } = useGlobalStates();

  const mutationMultipleDelete = useMutation({
    mutationFn: DELETEMultipleAdminAccount,
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setLoading(false);
      setCheckbox([]);
    },
    onError: () => setLoading(false),
  });

  const handleMultipleDelete = () => {
    mutationMultipleDelete.mutate(checkbox);
  };

  return (
    <section>
      <div className="flex items-center gap-3 py-5">
        <h2 className="hidden whitespace-nowrap text-xl font-semibold md:block">Admin Account List</h2>
        <div className="-mt-1.5 ml-auto w-full md:max-w-[350px]">{searchElement}</div>

        <Button
          type="button"
          solid={checkbox.length === 0 || loading ? "disabled" : "red"}
          disabled={checkbox.length === 0 || loading}
          onClick={handleMultipleDelete}
          className={`min-w-[120px] whitespace-nowrap font-semibold ${loading ? "cursor-wait" : ""}`}
        >
          {loading && <Image src={loadingAnimation} alt="Loading..." width={20} quality={30} />}
          Delete ({checkbox.length})
        </Button>

        <Button type="button" solid={"default"} onClick={() => setOpenAddData(true)} className="w-full max-w-[150px] whitespace-nowrap font-semibold">
          Add Account
        </Button>
      </div>
    </section>
  );
};
