import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const client = useQueryClient()

    const {mutate: deleteBooking, isPending:isDeleting} = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking successfully deleted 😎")
            client.invalidateQueries({queryKey: ['bookings']})
        },
        onError: error => {
            console.error(error)
            toast.error('Booking could not be deleted 😭')
        }
    })
    return {deleteBooking, isDeleting}
}