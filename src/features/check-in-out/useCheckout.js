import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useCheckOut() {
    const queryClient = useQueryClient();
    const {mutate: checkout, isPending: isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: 'checked-out',
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} was successfully checked out`)
            queryClient.invalidateQueries({queryKey: ['booking']})
        },
        onError: () => toast.error("There was an error while checking out")
    })
    return {checkout, isCheckingOut}
}