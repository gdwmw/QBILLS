import { Button } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { useGlobalStates } from "@/states";
import { DELETEMultipleAdminAccount } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, ReactNode, useState } from "react";

type T = {
  checkbox: string[];
  setCheckbox: () => void;
  searchElement: ReactNode;
};

export const Toolbar: FC<T> = ({ checkbox, setCheckbox, searchElement }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddData } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);

  const mutationMultipleDelete = useMutation({
    mutationFn: DELETEMultipleAdminAccount,
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setLoading(false);
      setCheckbox();
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
          size={"sm"}
          widthFull
          disabled={checkbox.length === 0 || loading}
          onClick={handleMultipleDelete}
          className={`max-w-[120px] whitespace-nowrap font-semibold ${loading ? "cursor-wait" : ""}`}
        >
          <Image src={loadingAnimation} alt="Loading..." width={20} quality={30} className={loading ? "" : "hidden"} />
          Delete ({checkbox.length})
        </Button>

        <Button
          type="button"
          solid={"default"}
          size={"sm"}
          widthFull
          onClick={() => setOpenAddData(true)}
          className="max-w-[150px] whitespace-nowrap font-semibold"
        >
          Add Account
        </Button>
      </div>
    </section>
  );
};
