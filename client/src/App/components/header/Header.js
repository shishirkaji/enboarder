import React from 'react'
import { ReactComponent as Rocket } from './../../../assets/rocket.svg'
import {AppBar, Toolbar} from '@material-ui/core'
const Header = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <Rocket />
            <span>"Space isn't remote at all. It's only an hour's drive away, if your car could go straight upwards."</span>
                </Toolbar>
            </AppBar>
            {/* <Rocket />
            <span>"Space isn't remote at all. It's only an hour's drive away, if your car could go straight upwards."</span> */}
        </div>
    )
}

export default Header
