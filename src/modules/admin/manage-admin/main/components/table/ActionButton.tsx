import { IconButton } from "@/components";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { useGlobalStates } from "@/states";
import { DELETEAdminAccount, IAdminAccount } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

type T = {
  account: IAdminAccount;
  setSelectedData: (data: IAdminAccount) => void;
};

export const ActionButton: FC<T> = ({ account, setSelectedData }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenUpdateData } = useGlobalStates();
  const [loading, setLoading] = useState<boolean>(false);

  const mutationDelete = useMutation({
    mutationFn: (id: string) => DELETEAdminAccount(id),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETAdminAccount"] });
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
        size={"sm"}
        onClick={() => {
          setSelectedData({ ...account });
          setOpenUpdateData(true);
        }}
      >
        <MdEdit />
      </IconButton>

      <IconButton
        type="button"
        solid={account.role === "superadmin" || loading ? "disabled" : "red"}
        size={"sm"}
        onClick={() => handleDelete(account.id)}
        disabled={account.role === "superadmin" || loading}
        className={loading ? "cursor-wait" : ""}
      >
        {loading ? <Image src={loadingAnimation} alt="Loading..." width={16} quality={30} /> : <MdDelete />}
      </IconButton>
    </>
  );
};
