import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin(){
    const client = useQueryClient();
    const {mutate: createCabin, isPending: isCreating} = useMutation({
        mutationFn: createEditCabin,
        mutationKey: ['cabins'],
        onSuccess: () => {
            toast.success("Cabin has been successfully created 😘")
            client.invalidateQueries({queryKey: ['cabins']})
        },
        onError: () => {
            toast.error("Cabin hasn't been created 😭")
        }
    })
    return {createCabin, isCreating}
}