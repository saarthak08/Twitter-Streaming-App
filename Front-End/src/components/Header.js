import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Home from "@material-ui/icons/Home";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "./assets/logo.svg";

const Header = () => {
    const history = useHistory();
    const location = useLocation();

    const onClickLink = (e,pathName) => {
        e.preventDefault();
        if (location.pathname !== pathName) {
            history.push(pathName);
        }
    };

    return (
        <Navbar
            collapseOnSelect
            expand='sm'
            variant='dark'
            id='container'
            sticky='top'>
            <Navbar.Brand href='/' onClick={(e)=>onClickLink(e,"/")}>
                <img src={Logo} className='logo' alt='Logo' />{" "}
                <h2 className='appName'>Twitter Streaming App</h2>
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls='responsive-navbar-nav'
                id='navbarToggle'
            />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'></Nav>
                <Nav>
                    <Nav.Link
                        color='white'
                        className='linksStyle'
                        onClick={(e)=>onClickLink(e,"/stream")}
                        href='/stream'>
                        Stream Tweets
                    </Nav.Link>
                    <Nav.Link className='linksStyle' href='/saved' onClick={(e)=>onClickLink(e,"/saved")}>
                        Saved Tweets{"  "}
                    </Nav.Link>
                    <Nav.Link href='/' onClick={(e)=>onClickLink(e,"/")}>
                        <Home id='homeIcon' />{" "}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
