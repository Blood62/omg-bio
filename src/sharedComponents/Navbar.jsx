import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import AppBar from "@material-ui/core/AppBar/index";
import img from "../shared/images/logo_bio.png"
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import {NavLink} from "react-router-dom";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';


class Navbar extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar className="myColor shadow-sm">
                    <Typography variant="h6">
                        <div className="row myWidth">
                            <img src={img} className="d-inline-block align-top " alt="logo"/>
                        </div>

                    </Typography>
                    <div className="row">
                        <NavLink exact to='/' className="nav-link text-white ml-4"
                                 activeClassName="  ml-4 my-link"><HomeOutlinedIcon
                            fontSize="large"/></NavLink>

                    <NavLink to='/cart' className="nav-link text-white" activeClassName="my-link">
                    <ShoppingBasketOutlinedIcon fontSize="large"/>
                    </NavLink>
                    </div>


                    <NavLink exact to='/login' className="nav-link text-white login"
                             activeClassName=" my-link login"><AccountCircleOutlinedIcon
                        fontSize="large"/></NavLink>
                </Toolbar>

            </AppBar>
        );
    }
}

export default Navbar;
