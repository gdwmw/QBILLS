import { FC, ReactElement } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FaAddressCard } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

import { IconButton } from "@/components";
import { useGlobalStates } from "@/hooks";
import loadingAnimation from "@/public/assets/animations/loadings/gray-n4.svg";
import { DELETEMembership, IMembership } from "@/utils";

type T = {
  data: IMembership;
  loading: boolean;
  setCheckbox: (value: string[]) => void;
  setLoading: (value: boolean) => void;
  setSelectedData: (data: IMembership) => void;
};

export const ActionButton: FC<T> = ({ data, loading, setCheckbox, setLoading, setSelectedData }): ReactElement => {
  const queryClient = useQueryClient();
  const { setOpenCard, setOpenUpdateDataForm } = useGlobalStates();

  const mutationDelete = useMutation({
    mutationFn: DELETEMembership,
    onError: () => setLoading(false),
    onMutate: () => setLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GETMembership"] });
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

      <IconButton
        onClick={() => {
          setSelectedData({ ...data });
          setOpenCard(true);
        }}
        solid={"blue"}
        type="button"
      >
        <FaAddressCard />
      </IconButton>
    </>
  );
};
