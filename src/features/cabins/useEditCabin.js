import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin(){
    const client = useQueryClient();
    const {mutate: editCabin, isPending: isEditing} = useMutation({
        mutationFn: ({newCabin, id}) => createEditCabin(newCabin, id),
        mutationKey: ['cabins'],
        onSuccess: () => {
            toast.success("Cabin has been successfully edited 😘")
            client.invalidateQueries({queryKey: ['cabins']})
        },
        onError: () => {
            toast.error("Cabin hasn't been created 😭")
        }
    })
    return {editCabin, isEditing}
}