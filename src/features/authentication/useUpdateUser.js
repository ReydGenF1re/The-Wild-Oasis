import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateCurrentUser} from "../../services/apiAuth.js";

export function useUpdateUser(){
    const client = useQueryClient();

    const {mutate: updateUser, isPending: isUpdating} = useMutation({
        mutationFn: updateCurrentUser,
        mutationKey: ['cabins'],
        onSuccess: ({user}) => {
            toast.success("User account successfully updated 😘")
            client.setQueryData(['user'], user)
            client.invalidateQueries({queryKey: ['user']})
        },
        onError: () => {
            toast.error("User hasn't been updated 😭")
        }
    })
    return {updateUser, isUpdating}
}