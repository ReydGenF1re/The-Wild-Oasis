import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../services/apiAuth.js";

export function useUser() {
    const {isLoading, data: user} = useQuery({
        queryFn: getCurrentUser,
        queryKey: ['user']
    })
    return {isLoading, user, isAuthenticated: user?.role === 'authenticated'}
}