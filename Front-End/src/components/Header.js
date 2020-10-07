import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Home from "@material-ui/icons/Home";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
    const history = useHistory();
    const location = useLocation();
    return (
        <Navbar
            collapseOnSelect
            expand='sm'
            variant='dark'
            id='container'
            sticky='top'>
            <Navbar.Brand>
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
                        href='/stream'>
                        Stream Tweets
                    </Nav.Link>
                    <Nav.Link className='linksStyle' href='/saved'>
                        Saved Tweets{" "}
                    </Nav.Link>
                    <Nav.Link
                        href='/'
                        onClick={(e) => {
                            e.preventDefault();
                            if (location.pathname !== "/") {
                                history.push("/");
                            }
                        }}>
                        <Home id='homeIcon' />{" "}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
