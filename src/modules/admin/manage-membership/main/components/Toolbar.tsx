import { FC, ReactElement, ReactNode } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import { Button } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { useGlobalStates } from "@/states";
import { DELETEMultipleMembership } from "@/utils";

type T = {
  checkbox: string[];
  loading: boolean;
  searchElement: ReactNode;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
};

export const Toolbar: FC<T> = ({ checkbox, loading, searchElement, setCheckbox, setLoading }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenAddDataForm } = useGlobalStates();

  const mutationMultipleDelete = useMutation({
    mutationFn: DELETEMultipleMembership,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETMembership"] });
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
        <h2 className="hidden whitespace-nowrap text-xl font-semibold md:block">Membership List</h2>
        <div className="-mt-1.5 ml-auto w-full md:max-w-[350px]">{searchElement}</div>

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
          Add Member
        </Button>
      </div>
    </section>
  );
};
