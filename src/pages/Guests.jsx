import React from 'react';
import Heading from "../ui/Heading.jsx";
import CreateGuestForm from "../features/guests/CreateGuestForm.jsx";
import GuestsTable from "../features/guests/GuestsTable.jsx";

function Guests() {

    return (
        <>
            <Heading as="h1">All guests</Heading>
            <GuestsTable />
            <CreateGuestForm />

        </>
    );
}

export default Guests;