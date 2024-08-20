import React from 'react';
import Table from "../../ui/Table.jsx";

function GuestRow({guest}) {

    const {countryFlag, email, fullName, nationalID, nationality} = guest
    return (
        <Table.Row>
            <span>{fullName}</span>
            <span>{email}</span>
            <span>{nationality}</span>
            <span>{nationalID}</span>
            <img src={countryFlag} alt="Country flag"/>
        </Table.Row>
    );
}

export default GuestRow;