import { FC, ReactElement } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";

import { IconButton } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { useGlobalStates } from "@/states";
import { DELETECashierAccount, ICashierAccount } from "@/utils";

type T = {
  data: ICashierAccount;
  loading: boolean;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
  setSelectedData: (data: ICashierAccount) => void;
};

export const ActionButton: FC<T> = ({ data, loading, setCheckbox, setLoading, setSelectedData }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenUpdateDataForm } = useGlobalStates();

  const mutationDelete = useMutation({
    mutationFn: DELETECashierAccount,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETCashierAccount"] });
      setCheckbox([]);
      setLoading(false);
    },
  });

  const handleDelete = (id: string) => {
    mutationDelete.mutate(id);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setSelectedData({ ...data });
          setOpenUpdateDataForm(true);
        }}
        solid={"green"}
        type="button"
      >
        <MdEdit />
      </IconButton>

      <IconButton
        className={loading ? "cursor-wait" : ""}
        disabled={loading}
        onClick={() => handleDelete(data.id)}
        solid={loading ? "disabled" : "red"}
        type="button"
      >
        {loading ? <Image alt="Loading..." quality={30} src={loadingAnimation} width={16} /> : <MdDelete />}
      </IconButton>
    </>
  );
};
