import React from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { Favorite } from "@material-ui/icons";

const Footer = () => {
    return (
        <div className='fixed-bottom'>
            <Navbar variant='dark' id='container' sticky='bottom'>
                <Container id="footerContainer">
                    <NavbarBrand>
                        <div id='textDiv'>
                            Made with <Favorite id='favoriteIconFooter' /> by{" "}
                            <a
                                target='_blank'
                                rel="noopener noreferrer"
                                href='https://github.com/saarthak08'>
                                Saarthak Gupta
                            </a>
                        </div>
                    </NavbarBrand>
                </Container>
            </Navbar>
        </div>
    );
};

export default Footer;
