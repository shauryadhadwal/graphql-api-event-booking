import React, { useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useStateValue} from '../../contexts/state-context';

const LogoutPage = () => {

    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        dispatch({
            type: 'logout'
        });
    },[]);

    return (
        <Redirect to="/auth" />
    )
}

export default LogoutPage;