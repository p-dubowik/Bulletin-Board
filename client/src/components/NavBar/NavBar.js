import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = ({ user, setUser }) => {
    return(
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container fluid>

                <Navbar.Brand as={NavLink} to='/' >Bulletin Board</Navbar.Brand>

                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to='/' >Home</Nav.Link>

                    {!user && (
                        <Nav.Link as={NavLink} to='/login'>Log in</Nav.Link>
                    )}

                    {user && (
                        <Nav.Link onClick={() => {
                            fetch('auth/logout');
                            setUser(null);
                        }}>
                            Log out
                        </Nav.Link>
                    )}


                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;