import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getGuests} from "../../services/apiGuest.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useGuests(){
    const client = useQueryClient();
    const [searchParams] = useSearchParams()
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
    const {data: {guests, count} = {}, isLoading, error} = useQuery({
        queryKey: ['guests', page],
        queryFn:() =>  getGuests({page}),
    })

    const pageCount = Math.ceil(count / PAGE_SIZE);
    if(page < pageCount){
        client.prefetchQuery({
            queryKey: ['guests', page + 1],
            queryFn:() =>  getGuests({page: page + 1}),
        })
    }
    if(page > 1){
        client.prefetchQuery({
            queryKey: ['guests', page - 1],
            queryFn:() =>  getGuests({page: page - 1}),
        })
    }

    return {guests, isLoading, error, count}
}