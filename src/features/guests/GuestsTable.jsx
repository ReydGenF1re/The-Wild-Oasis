import React from 'react';
import Table from "../../ui/Table.jsx";
import {useGuests} from "./useGuests.js";
import Spinner from "../../ui/Spinner.jsx";
import GuestRow from "./GuestRow.jsx";
import Pagination from "../../ui/Pagination.jsx";
import Empty from "../../ui/Empty.jsx";

function GuestsTable() {
    const {guests, isLoading, count} = useGuests()
    if(isLoading) return <Spinner />
    if(!guests?.length) return <Empty resource={'guests'} />

    return (
        <Table columns={'2fr 1.8fr 2fr 1fr 1fr'}>
            <Table.Header>
                <div>Full name</div>
                <div>Email</div>
                <div>Nationality</div>
                <div>National ID</div>
                <div>Flag</div>
                <div></div>
            </Table.Header>
            <Table.Body data={guests} render={guest => <GuestRow key={guest.id} guest={guest}/>}/>
            <Table.Footer>
                <Pagination count={count} />
            </Table.Footer>
        </Table>
    );
}

export default GuestsTable;