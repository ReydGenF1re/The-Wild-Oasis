import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row.jsx";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "../../hooks/useMoveBack";
import {useBooking} from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {useNavigate} from "react-router-dom";
import {HiArrowUpOnSquare} from "react-icons/hi2";
import {useCheckOut} from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {useDeleteBooking} from "./useDeleteBooking.js";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
    const {booking = {}, isLoading} = useBooking()
    const {status, id: bookingId} = booking;

    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    const navigate = useNavigate()
    const {checkout, isCheckingOut} = useCheckOut()
    const {isDeleting, deleteBooking} = useDeleteBooking()

    if (isLoading) return <Spinner/>
    if(!booking) return <Empty resource={'booking'} />
    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking}/>

            <ButtonGroup>
                {status === 'unconfirmed' && <Button onClick={() => navigate(`/check-in/${bookingId}`)}>Check in</Button>}
                {status === 'checked-in' &&
                    <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut} icon={<HiArrowUpOnSquare/>}>Check out</Button>}
                <Modal>
                    <Modal.Open opens={'delete'}><Button variation={'danger'}>Delete booking</Button></Modal.Open>
                    <Modal.Window name={'delete'}>
                        <ConfirmDelete disabled={isDeleting} resourceName={'booking'} onConfirm={() => {
                            deleteBooking(bookingId);
                            navigate(-1)
                        }}/>
                    </Modal.Window>
                </Modal>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
