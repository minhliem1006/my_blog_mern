import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
const LoginForm = () => {
    // initial value state for form login
    const [loginForm,setLoginForm] = useState({
        username:'',
        password:'',
    });
    // show info in page when database return
    const [alert,setAlert] = useState('');
    const {loginUser} = useContext(AuthContext);
    //destructuring 
    const {username,password} = loginForm;
    //set id to remove setimeout when unmout components;
    let idSettimeOut;
    //handle onchange set value for form
    const handleLoginForm = (e)=>{
        setLoginForm({
            ...loginForm,
            [e.target.name]:e.target.value,
        });
    }
    // submit form login
    const login = async(e)=>
    {
        e.preventDefault();
        try {
            const response = await loginUser(loginForm);
            if(response.success)
            {
                //logic when login success
                // console.log('Dang nhap thanh cong');
            }
            else
            {
                // console.log('Dang nhap that bai');;
                setAlert(response.message)
                idSettimeOut = setTimeout(()=>{
                    setAlert('');
                },3000);
            }
        } catch (error) {
                // console.log('code login error');
                setAlert("Server invalid!!")
                idSettimeOut = setTimeout(()=>{
                    setAlert('');
                },3000);
        }
    }
    // handle remove settimeout when mount again component >>leak memory
    useEffect(() => {
        return () => {
           clearTimeout(idSettimeOut);
        }
    }, [idSettimeOut]);
    return (
            <Form className="form-login" onSubmit={login}>
                <h1 className="alert-info">{alert}</h1>
                <Form.Group className="mb-3" width="500" controlId="formBasicUserName" >
                    <Form.Label>UserName</Form.Label>
                    <Form.Control required name="username" type="text" placeholder="Enter your username"
                    value={username}
                    onChange={handleLoginForm}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name="password" type="password" placeholder="Enter your password" 
                    value={password}
                    onChange={handleLoginForm}
                    />
                </Form.Group>
                <div className="text-center mt-4">
                    <Button variant="info" type="submit">
                        Login
                    </Button>
                </div>
                <p className="mt-4 text-center">
                    Don't you have an account? 
                    <Link to="/register">
                        <Button variant="primary" size="sm" >Register</Button>
                    </Link>
                </p>
        </Form>
    )
}

export default LoginForm
