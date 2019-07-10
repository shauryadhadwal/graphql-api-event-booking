import React from 'react';
import Navbar from '../Navbar/Navbar';
import styled from 'styled-components';

const Main = styled.main`
    padding: 60px 0;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 80%;

    @media (min-width: 1000px){
        max-width: 800px;
    }
`;
const Layout = (props) => {
    return (
        <React.Fragment>
            <Navbar />
            <Main>
                {props.children}
            </Main>
        </React.Fragment>
    )
}

export default Layout;