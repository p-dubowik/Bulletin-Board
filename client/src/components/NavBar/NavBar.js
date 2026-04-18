import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const NavBar = ({}) => {
    const user = useSelector(state => state.auth.user);

    return(
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container fluid>

                <Navbar.Brand as={NavLink} to='/' >Bulletin Board</Navbar.Brand>

                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to='/' >Home</Nav.Link>

                        {!user && (
                            <>
                                <Nav.Link as={NavLink} to='/login'>Log in</Nav.Link>
                                <Nav.Link as={NavLink} to='/signup'>Sign up</Nav.Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Nav.Link as={NavLink} to='/add'>Post Ad</Nav.Link>
                                <Nav.Link as={NavLink} to='/logout'>Log out</Nav.Link>
                            </>
                        )}





                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;