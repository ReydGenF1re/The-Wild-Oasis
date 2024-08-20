import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {login as loginAPI} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useLogin(){
    const client = useQueryClient();
    const navigate = useNavigate();
    const {mutate: login, isPending} = useMutation({
        mutationFn: ({email, password}) => loginAPI({email, password}),
        onSuccess: (user) => {
            client.setQueryData(['user'], user.user)
            navigate('/dashboard', {replace: true})
        },
        onError: (e) => {
            console.error(e)
            toast.error("Provided email or password are incorrect")
        }
    })
    return {login, isPending}
}