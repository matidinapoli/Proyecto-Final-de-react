import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../CartWidget/CartWidget';
import Logo from './Logo';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <Logo />
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/category/Marvel" className="nav-link">
              Marvel
            </NavLink>
            <NavLink to="/category/Mangas" className="nav-link">
              Mangas
            </NavLink>
            <NavLink to="/category/DCuniverse" className="nav-link">
              DCuniverse
            </NavLink>
          </Nav>
          <NavLink to="/cart" className="navbar-cart">
            <CartWidget />
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
