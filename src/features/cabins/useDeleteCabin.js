import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const client = useQueryClient()

    const {mutate: deleteCabin, isPending:isDeleting} = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success("Cabin successfully deleted 😎")
            client.invalidateQueries({queryKey: ['cabins']})
        },
        onError: error => {
            console.error(error)
            toast.error('Cabin could not be deleted 😭')
        }
    })
    return {deleteCabin, isDeleting}
}