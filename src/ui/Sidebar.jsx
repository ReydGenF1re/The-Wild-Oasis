import React from 'react';
import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

const StyledSidebar = styled.aside`
  padding: 3.2rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

function Sidebar() {
    return (
        <StyledSidebar>
            <Logo/>
            <MainNav/>
            {/*<Uploader />*/}
        </StyledSidebar>
    );
}

export default Sidebar;