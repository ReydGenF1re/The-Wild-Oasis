import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout as logoutAPI} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";
export function useLogout(){
    const client = useQueryClient()
    const navigate = useNavigate()
    const {mutate:logout,isPending} = useMutation({
        mutationFn: logoutAPI,
        onSuccess:() => {
            client.removeQueries()
            navigate('/login', {replace: true})
        }
    })
    return {logout, isPending}
}