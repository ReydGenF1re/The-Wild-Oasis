import styled from "styled-components";
import {format, isToday} from "date-fns";
import Menus from "../../ui/Menus.jsx";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import {formatCurrency} from "../../utils/helpers";
import {formatDistanceFromNow} from "../../utils/helpers";
import {HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import {useCheckOut} from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {useDeleteBooking} from "./useDeleteBooking.js";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
                        booking: {
                            id: bookingId,
                            created_at,
                            startDate,
                            endDate,
                            numNights,
                            numGuests,
                            totalPrice,
                            status,
                            guests: {fullName: guestName, email},
                            cabins: {name: cabinName},
                        },
                    }) {
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    const navigate = useNavigate();
    const {checkout, isCheckingOut} = useCheckOut()
    const {deleteBooking, isDeleting} = useDeleteBooking()

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
        <span>
          {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
        </span>
                <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
        </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId}/>
                    <Menus.List id={bookingId}>
                        <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)} icon={<HiEye/>}>See
                            details</Menus.Button>
                        {status === 'unconfirmed' &&
                            <Menus.Button onClick={() => navigate(`/check-in/${bookingId}`)} icon={<HiArrowDownOnSquare/>}>Check in</Menus.Button>}
                        {status === 'checked-in' &&
                            <Menus.Button onClick={() => checkout(bookingId)} disabled={isCheckingOut} icon={<HiArrowUpOnSquare/>}>Check out</Menus.Button>}
                        <Modal.Open opens={'delete'}>
                            <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                    <Modal.Window name={'delete'}>
                        <ConfirmDelete disabled={isDeleting} resourceName={'booking'} onConfirm={() => deleteBooking(bookingId)}/>
                    </Modal.Window>
                </Menus.Menu>
            </Modal>

        </Table.Row>
    );
}

export default BookingRow;
