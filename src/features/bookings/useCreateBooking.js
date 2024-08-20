import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createBooking as createBookingAPI} from "../../services/apiBookings.js";
import toast from "react-hot-toast";

function useCreateBooking() {
    const client = useQueryClient()
    const {mutate: createBooking, isPending: isCreating} = useMutation({
        mutationFn: createBookingAPI,
        mutationKey: ['bookings'],
        onSuccess: () => {
            toast.success("Booking has been successfully created 😘")
            client.invalidateQueries({queryKey: ['bookings']})
        }
    })
    return {createBooking, isCreating}
}
export default useCreateBooking