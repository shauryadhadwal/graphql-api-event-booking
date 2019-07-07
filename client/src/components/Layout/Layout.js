import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout = (props) => {
    return (
        <React.Fragment>
            <Navbar />
            <main style={{width:"100%", position:"absolute", padding: "60px 100px"}}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout;