import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();


    return <>

        <Navbar expand="lg">
            <Container fluid >
                <Navbar.Brand className='cursor' onClick={() => { navigate('/') }} >
                    <img
                        src="/assets/logo lol.jpg"
                        alt="League of Legends Logo"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >
                        <Nav.Link href="/" className="cursor">Accueil</Nav.Link>
                        <Nav.Link href="/regions" className="cursor">Régions</Nav.Link>
                        <Nav.Link href="/champions" className="cursor">Champions</Nav.Link>
                        <Nav.Link href="/quizz" className="cursor">Quizz</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
       







    </>
}

export default NavBar;