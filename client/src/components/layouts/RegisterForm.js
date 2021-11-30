import React,{useContext,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
const RegisterForm = () => {
     // initial value state for form register
    const [registerForm,setRegisterForm] = useState({
        username:'',
        password:'',
        confirmPassword:'',
    });
    // show info in page when database return
    const [alert,setAlert] = useState('');
    const {registerUser} = useContext(AuthContext);
    //destructuring 
    const {username,password,confirmPassword} = registerForm;
    //set id to remove setimeout when unmout components;
    let idSettimeOut;
    //handle onchange set value for form
    const handleRegisterForm = (e)=>{
        setRegisterForm({
            ...registerForm,
            [e.target.name]:e.target.value,
        });
    }
    //submit form register
    const register = async(e)=>
    {
        e.preventDefault();
        try {
            const response = await registerUser(registerForm);
            if(response.success)
            {
                console.log('Dang ki thanh cong');
                setAlert(response.message);
                idSettimeOut = setTimeout(()=>{
                    setAlert('');
                    setRegisterForm({
                        username:'',
                        password:'',
                        confirmPassword:'',
                    });
                },3000);
            }
            else
            {
                console.log('Dang ki that bai');
                setAlert(response.message);
                idSettimeOut = setTimeout(()=>{
                    setAlert('');
                },3000);
            }
        } catch (error) {
                setAlert("Server invalid!!")
                idSettimeOut=setTimeout(()=>{
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
        <Form className="form-login" onSubmit={register}>
            <h1 className="alert-info">{alert}</h1>
            <Form.Group className="mb-3" width="500" controlId="formBasicUserName">
                 <Form.Label>UserName</Form.Label>
                 <Form.Control name="username" type="text" placeholder="Enter your username"
                    onChange={handleRegisterForm}
                    value={username}
                 />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Enter your password"
                    onChange={handleRegisterForm}
                    value={password}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control name="confirmPassword" type="password" placeholder="Confirm your password"
                    onChange={handleRegisterForm}
                    value={confirmPassword}
                />
            </Form.Group>
            <div className="text-center mt-4">
                <Button variant="info" type="submit">
                    Register
                </Button>
            </div>
            <p className="mt-4 text-center">
                Do you have an account? 
                <Link to="/login">
                    <Button variant="primary" size="sm" >Login</Button>
                </Link>
            </p>
      </Form>
    )
}

export default RegisterForm
