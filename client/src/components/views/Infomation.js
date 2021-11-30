import React,{useContext,useState,useEffect} from 'react';
import NavbarMenu from '../layouts/NavbarMenu';
import defaultImage from '../../assets/defaultImage.png';
import chooseImage from '../../assets/camera-solid.svg';
import checkIcon from '../../assets/check-solid.svg';
import timesIcon from '../../assets/times-solid.svg';
import style from './DashBoard.module.css';
import { Container,Card,Button,ListGroup,Modal,Form,Toast} from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { urlApi } from '../contexts/constant';
const Infomation = () => {
    let userImage;
    let iconCheckUser;
    const {authState:{
        user,
    },changeImageSubmit,changePass} = useContext(AuthContext);
    const {image} = user;
    //set show anh tam thoi
    const [showPreview,setShowPrevew]=useState(null);
    const [showPreview2,setShowPrevew2]=useState(null);

    // set anh gui data
    const [changeImage,setChangeImage] = useState(image);
    // set value infor change password
    const [infoChangePass,setInfoChangePass] = useState({
        password:"",
        newPassword:"",
        confirmNewPassword:"",
    });
    //set show info when change password
    const [showInfo,setShowInfo]=useState("");
    const {password,newPassword,confirmNewPassword}=infoChangePass;
    //show modal change password
    const [showModalChangePass,setShowModalChangePass] = useState(false);
    //show modal showConfirmUpdateImage 
    const [showConfirmUpdateImage,setShowConfirmUpdateImage]=useState(false);
    // show info when data comeback
    const [showToast,setShowToast]=useState({
        show:false,
        message:'',
        type:null,
    })
    const {type,message,show} = showToast;
    // submit send data image avatar
    // clear setTimeout funtion
    let timeoutFunction;
    //show modal confirm changeimage
    const confirmShowModalChangeImage = ()=>{
        setShowConfirmUpdateImage(true);
    }

    const submitChangeImage = async()=>{
        const imageData = new FormData();
        imageData.append('imageUser', changeImage);
        try {
            const res = await changeImageSubmit(imageData);
            if(res.success)
            {
                console.log("??????");
                setShowToast({
                    show:true,
                    message:res.message,
                    type:"success",
                });
                timeoutFunction = setTimeout(() => {
                    setShowToast({
                        show:false,
                    });
                }, 3000);
                // console.log("doi anh thanh cong");
            }
            else
            {
                setShowToast({
                    show:true,
                    message:res.message,
                    type:"danger",
                });
                timeoutFunction = setTimeout(() => {
                    setShowToast({
                        show:false,
                    });
                }, 3000);
                console.log("doi anh fail");
            }
        } catch (error) {
            console.log("code loi~");
        }
        setShowPrevew(null);
        setShowPrevew2(null);
        setShowConfirmUpdateImage(false);
    }
    // cancel show preview avatar
    const handleCancelChangeImage =()=>{
        setShowPrevew(null);
        setShowPrevew2(null);
        setChangeImage(image);
    }
    // logic show preview
    if(showPreview!==null)
    {
        userImage = <img className={style.yourInfoHeaderImage}
         width="150" height="150" src={showPreview} alt="userImage"/>
        
        iconCheckUser=<div className={style.yourInfoHeaderChoose}>
                        <span title="OK change avatar" onClick={confirmShowModalChangeImage}>
                            <img className={style.iconCheckingUser}  src={checkIcon} alt="checkIcon"/>
                        </span>
                        <span title="Cancel change avatar" onClick={handleCancelChangeImage}>
                            <img className={style.iconCheckingUser}  src={timesIcon} alt="timesIcon"/>
                        </span>
                     </div>
    }
    else{
        if(showPreview2)
        {
            userImage = <img className={style.yourInfoHeaderImage}
            width="150" height="150" src={showPreview2} alt="userImage"/>
           
           iconCheckUser=<div className={style.yourInfoHeaderChoose}>
                           <span title="OK change avatar" onClick={confirmShowModalChangeImage}>
                               <img className={style.iconCheckingUser}  src={checkIcon} alt="checkIcon"/>
                           </span>
                           <span title="Cancel change avatar" onClick={handleCancelChangeImage}>
                               <img className={style.iconCheckingUser}  src={timesIcon} alt="timesIcon"/>
                           </span>
                        </div>

        }
        else
        {
            if(changeImage) 
            {
                userImage=<img className={style.yourInfoHeaderImage} width="150" height="150" src={`${urlApi}/uploadImageUsers/${user.image}`} alt="userImage"/>
            }
            else
            {
                userImage = <img className={style.yourInfoHeaderImage} width="150" height="150" src={defaultImage} alt="userImage"/>
            }
        }
    }   
    // handle change image
    const handleChangeImage=(e)=>{
        const file = e.target.files[0];
        if(file)
        {
            const preview =URL.createObjectURL(file);
            setShowPrevew(preview);
            setShowPrevew2(preview);
            setChangeImage(file);
        }
        else
        {
            setShowPrevew(null);
            setChangeImage(image);
        }
    }
    // set show modal change password
    const showModalEditPass=()=>
    {
        setShowModalChangePass(true);
    }
    // set cancel show modal change password
    const handleClose = ()=>{
        setShowModalChangePass(false);
        setShowConfirmUpdateImage(false);
        setInfoChangePass({
            password:"",
            newPassword:"",
            confirmNewPassword:"",
        });
    }
    //handle info input form change password
    const handleChangePassword =(e)=>
    {
        setInfoChangePass({...infoChangePass,
            [e.target.name]:e.target.value,
        });
    }
    // submit sen password
    const handleSubmitChangePassWord=async()=>{
        try {
            const res = await changePass(infoChangePass);
            if(res.success)
            {
                setShowModalChangePass(false);
                setShowToast({
                    show:true,
                    message:res.message,
                    type:"success",
                });
                setInfoChangePass({
                    password:"",
                    newPassword:"",
                    confirmNewPassword:"",
                });
                timeoutFunction = setTimeout(() => {
                    setShowToast({
                        show:false,
                    });
                }, 3000);
            }
            else
            {
                setShowInfo(res.message);
                timeoutFunction = setTimeout(() => {
                    setShowInfo("");
                }, 3000);
            }
        } catch (error) {
            console.log("error change pass")
        }
        
    }
    
    // remove url preview avater help performance better
    useEffect(() => {
        return () => {
            showPreview && URL.revokeObjectURL(showPreview);
        }
    }, [showPreview]);
    //// remove url preview2 avatar handle leak memory
    useEffect(() => {
        return () => {
            showPreview2 && URL.revokeObjectURL(showPreview2);
        }
    }, [showPreview2]);

    //set cancel showtoats when mount again; and clear time out
    useEffect(() => {
         setShowToast({
            show:false,
            message:'',
            type:null,  
        });
        return ()=>{
            clearTimeout(timeoutFunction);
        }
    }, [timeoutFunction]);
    return (
        <div>
            <NavbarMenu/>
                <Container className="mt-4">
                    <div className="mtop-70">
                        <div className={style.yourInfo}>
                            <h1>Your infomation</h1> 
                            <Card style={{ width: '20rem',borderRadius:"20px",marginTop:"20px" }}>
                                <div className={style.yourInfoHeader}>
                                        {userImage}
                                        {iconCheckUser}
                                </div>
                                
                                <Card.Body >
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className={style.colorCard}>Username : {user.username}</ListGroup.Item>
                                        <ListGroup.Item className={style.colorCard}>PassWord : ********</ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button onClick={showModalEditPass} style={{color:"black",backgroundColor:"#fff",border:"1px solid black"}}>Change your password</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            
                                            <label style={{cursor:"pointer"}} htmlFor="cheese">
                                                <img width="50" height="50" src={chooseImage} alt="camera_chooseImage" />
                                            </label> 
                                            <input onChange={handleChangeImage} hidden type="file"  name="cheese" id="cheese"/>
                                            <span> Change your image</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                     </div>   
                      <Modal style={{marginTop:"70px",color:"blue"}} show={showModalChangePass} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{marginLeft:"100px"}}>Change your password ?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form style={{width:"350px",margin:"auto"}} >
                                    <h3 style={{color:"red"}}>{showInfo}</h3>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Old password</Form.Label>
                                        <Form.Control required size="sm" name="password" type="password" placeholder="Enter your password"
                                            value={password}
                                            onChange={handleChangePassword}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicNewPassword">
                                        <Form.Label>New password</Form.Label>
                                        <Form.Control required size="sm" name="newPassword" type="password" placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={handleChangePassword}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicConfirmNewPassword">
                                        <Form.Label>Confirm new password</Form.Label>
                                        <Form.Control required size="sm" name="confirmNewPassword" type="password" placeholder="Confirm new password"
                                            value={confirmNewPassword}
                                            onChange={handleChangePassword}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer style={{margin:"auto"}}>
                                <Button variant="danger" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" onClick={handleSubmitChangePassWord}>
                                    Change
                                </Button>
                            </Modal.Footer>
                      </Modal>
                      <Modal className="mtop-70" show={showConfirmUpdateImage} onHide={handleClose}>
                        <Modal.Header closeButton>
                             <Modal.Title style={{color:"blue"}}>Are you sure change your avatar?</Modal.Title>
                        </Modal.Header>
                             <Modal.Body>
                                 <p><span style={{color:"red",fontSize:"24px"}}>Cancel </span>to cancel your option</p> 
                                 <p><span style={{color:"blue",fontSize:"24px"}}>OK </span>to change your avatar</p> 
                             </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                             Cancel
                        </Button>
                        <Button variant="primary" onClick={submitChangeImage}>
                            OK
                        </Button>
                        </Modal.Footer>
                     </Modal>
                      <Toast show={show} animation={true} style={{position:"fixed",top:'15%',right:"20px",width:"200px"}}
                        className ={`bg-${type} text-white`}
                        onClose={setShowToast.bind(this,{
                            show:false,
                            message:'',
                            type:null,
                        })}
                        delay={3000}   
                        autohide    
                         >
                        <Toast.Body>
                            <strong>{message}</strong>
                        </Toast.Body>
                     </Toast>

                </Container>
        </div>
    )
}

export default Infomation
