import React,{useContext} from 'react';
import defaultImage from '../../assets/defaultImage.png'
import loginIcon from '../../assets/login_button.svg'
import styles from './Layouts.module.css';
import {Link} from 'react-router-dom';
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';
import {AuthContext} from '../contexts/AuthContext';
import { L_S_TOKEN,urlApi } from '../contexts/constant';
import Button from '@restart/ui/esm/Button';
const NavbarMenu = () => {
    const {authState:{
        isAuthentication,
        user,
    },dispatch} = useContext(AuthContext);
    //handle logout user remove token of user in browser
    const logout = async()=>
    {
        localStorage.removeItem(L_S_TOKEN);
        dispatch({
            type:"SET_AUTH",
            payload:{
                authLoading:false,
                isAuthentication:false,
                user:null,
            }
        });
    }
    // set show avatar user in navbar
    let imgSrc;
    if(user!==null && (user.image!=="null"||user.image!== undefined))
    {
        imgSrc = `${urlApi}/uploadImageUsers/${user.image}`;
    }
    else
    {
        imgSrc = defaultImage;
    }
    //show image and name user
    const title =<span>
        <img className={styles.yourImgage} src={imgSrc} alt="useNavbarImg"/>
        <span>{user&&user.username}</span>
    </span> 
    const heade_info = isAuthentication?(<NavDropdown title={title} id="basic-nav-dropdown">
                        <Link to="/infomation" className="non-de" > 
                            Information
                        </Link>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>):(
                        <Link to="/login">
                            <Button className="login_btn">
                                Login <img width="40" height="40" src={loginIcon} alt="loginIcon"/>
                            </Button>
                        </Link>)
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="shadow navbar-head">
            <Container>
                <Link to="/">
                    <Navbar.Brand className='font-weight-bolder text-white'>
                        Blog
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to="/dashboard" as={Link}>DashBoard</Nav.Link>
                    </Nav>
                    <Nav>
                         {heade_info}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu;
