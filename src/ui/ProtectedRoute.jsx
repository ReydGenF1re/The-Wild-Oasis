import React, {useEffect} from 'react';
import {useUser} from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
`

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    // Load the authenticated user
    const {isLoading, isAuthenticated} = useUser()

    // If there is NO authenticated user, navigate to '/login' page
    useEffect(function () {
        if (!isAuthenticated && !isLoading) navigate('/login')
    }, [isLoading, isAuthenticated, navigate])


    // While loading show a spinner
    if (isLoading) return <FullPage>
        <Spinner/>
    </FullPage>


    if (isAuthenticated) return children

}

export default ProtectedRoute;