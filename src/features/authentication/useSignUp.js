import {useMutation} from "@tanstack/react-query";
import {signUp as signUpAPI} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignUp() {
    const {mutate: signUp, isPending} = useMutation({
        mutationFn: signUpAPI,
        onSuccess: (data) => {
            toast.success("Account successfully created🥳! Please verify the new account from the user's email address")
        }
    })
    return {signUp, isPending}
}