import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import InputContainer from './InputContainer';


const NavBar = () => {
    return (

        <AppBar position='static' style={{ width: '100%', height: '100%', margin: 0, }}>
            <InputContainer />
        </AppBar>

    )
}

export default NavBar;