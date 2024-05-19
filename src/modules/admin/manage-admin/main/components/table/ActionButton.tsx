import { IconButton } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { useGlobalStates } from "@/states";
import { DELETEAdminAccount, IAdminAccount } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

type T = {
  data: IAdminAccount;
  setSelectedData: (data: IAdminAccount) => void;
  setCheckbox: (value: string[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const ActionButton: FC<T> = ({ data, setSelectedData, setCheckbox, loading, setLoading }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenUpdateData } = useGlobalStates();

  const mutationDelete = useMutation({
    mutationFn: DELETEAdminAccount,
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
      setCheckbox([]);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const handleDelete = (id: string) => {
    mutationDelete.mutate(id);
  };

  return (
    <>
      <IconButton
        type="button"
        solid={"green"}
        onClick={() => {
          setSelectedData({ ...data });
          setOpenUpdateData(true);
        }}
      >
        <MdEdit />
      </IconButton>

      <IconButton
        type="button"
        solid={data.role === "superadmin" || loading ? "disabled" : "red"}
        onClick={() => handleDelete(data.id)}
        disabled={data.role === "superadmin" || loading}
        className={loading ? "cursor-wait" : ""}
      >
        {loading ? <Image src={loadingAnimation} alt="Loading..." width={16} quality={30} /> : <MdDelete />}
      </IconButton>
    </>
  );
};
