import Button from "../../ui/Button";
import {useCheckOut} from "./useCheckout.js";

function CheckoutButton({ bookingId }) {
    const {checkout, isCheckingOut} = useCheckOut()
  return (
    <Button disabled={isCheckingOut} variation="primary" size="small" onClick={() => checkout(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
