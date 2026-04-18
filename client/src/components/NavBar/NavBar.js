import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = ({}) => {
    return(
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container fluid>

                <Navbar.Brand as={NavLink} to='/' >Bulletin Board</Navbar.Brand>

                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to='/' >Home</Nav.Link>

                        <Nav.Link as={NavLink} to='/login'>Log in</Nav.Link>

                        <Nav.Link as={NavLink} to='/logout'>Log out</Nav.Link>




                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;