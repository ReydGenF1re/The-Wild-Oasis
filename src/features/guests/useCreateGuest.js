import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createGuest as createGuestAPI} from "../../services/apiGuest.js";
import toast from "react-hot-toast";

export function useCreateGuest() {
    const client = useQueryClient();
    const {mutate: createGuest, isPending: isCreating} = useMutation({
        mutationFn: createGuestAPI,
        mutationKey: ['guests'],
        onSuccess: () => {
            toast.success("New guest has been successfully created 😘")
            client.invalidateQueries({queryKey: ['guests']})
        },
        onError: (error) => {
            console.log(error)
            toast.error("Guest hasn't been created 😭")
        }
    })
    return {createGuest, isCreating}
}