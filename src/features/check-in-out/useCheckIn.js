import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function useCheckIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const {mutate: checkin, isPending: isCheckingIn} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
            ...breakfast
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} was successfully checked in`)
            queryClient.invalidateQueries({queryKey: ['booking']})
            navigate('/')
        },
        onError: () => toast.error("There was an error while checking in")
    })
    return {checkin, isCheckingIn}
}