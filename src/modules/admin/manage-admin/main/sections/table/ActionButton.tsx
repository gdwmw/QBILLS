import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

import { IconButton } from "@/components";
import { useGlobalStates } from "@/hooks";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { DELETEAdminAccount, IAdminAccount } from "@/utils";

type T = {
  data: IAdminAccount;
  loading: boolean;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
  setSelectedData: (data: IAdminAccount) => void;
};

export const ActionButton: FC<T> = ({ data, loading, setCheckbox, setLoading, setSelectedData }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenUpdateDataForm } = useGlobalStates();

  const mutationDelete = useMutation({
    mutationFn: DELETEAdminAccount,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
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
        disabled={data.role === "superadmin" || loading}
        onClick={() => handleDelete(data.id)}
        solid={data.role === "superadmin" || loading ? "disabled" : "red"}
        type="button"
      >
        {loading ? <Image alt="Loading..." quality={30} src={loadingAnimation} width={16} /> : <MdDelete />}
      </IconButton>
    </>
  );
};
