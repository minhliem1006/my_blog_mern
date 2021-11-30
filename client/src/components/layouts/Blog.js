import React,{useState,useContext} from 'react';
import { urlApi } from '../contexts/constant';
import settingIcon from '../../assets/setting.png';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/remove.png';
import clockIcon from '../../assets/clock-regular.svg';
import userIcon from '../../assets/user-regular.svg';
import {Col,Button,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
const Blog = ({index,children}) => {
    const {authState:{user}}=useContext(AuthContext);
    const { deletePost,
            setShowToast,
            setIdUpdata,
            setShowEditModalPost,} = useContext(PostContext);
    const [show,setShow]=useState(false);
    const [showModal,setShowModal]=useState(false);
    //close  show delete icon and edit icon
    const handleClose=()=>{
        setShow(false);
    }
    //set state modal show delete icon and edit icon
    const handleShow=()=>
    {
        setShow(!show);
    }
    //set show modal info delete
    const handleShowModal=()=>{
        setShowModal(true);
    }
    //close show modal info delete
    const handleCloseModal=()=>{
        setShowModal(false);
    }
    // handle delete post
    const handleDeletePost= async(postId)=>{
        setShowModal(false);
        try {
            const response = await deletePost(postId);
            if(response.success)
            {
                setShowToast({
                    show:true,
                    message:response.message,
                    type:'danger',
                });
            }
            else{
                console.log("loi gi do");
                setShowToast({
                    show:true,
                    message:response.message,
                    type:'warning',
                });
            }
        } catch (error) {
            console.log('code sai');
        }
       
    }
    // handle show edit modal and set id this post for Editmodal
    const handleShowEditModal = (id)=>{
        setShowEditModalPost(true);
        setIdUpdata(id);
    }
    // handle date in moongose
    const date = new Date(children.createdAt);
    const showDay = date.toUTCString();
    const dateUpdate = new Date(children.updatedAt);
    const showDayUpdate = dateUpdate.toUTCString();
    let showImage;
    // handle show body image in post
    if(children.image === "null" || children.image===undefined)
    {
        showImage=<div></div>
    }
    else
    {
        showImage=<div className="body__three-container-cover-img">
                        <div style={{backgroundImage:`url(${urlApi}/uploads/${children.image})`}} className="body__three-container-item-img">
                        </div>

                   </div>
    }
    return (
           <Col xs={12} md={6} lg={6} className="mt-2 text-center">
                <div className="body__three-container-item my-blog">
                    <div onClick={handleShow} className="icon-setting">
                        <img width="16" height="16" src={settingIcon} alt="settingIcon"/>
                    </div>
                    <ul onMouseLeave={handleClose} style={{display:`${show?"flex":"none"}`}} className="list-setting" id={`list-setting-${index}`}>
                        <li onClick={()=>handleShowEditModal(children._id)} className="item-setting">
                            <img style={{marginRight:"4px"}} src={editIcon} alt="editIcon" width="16" height="16"/>
                             Edit post   
                        </li>
                        <li onClick={handleShowModal} className="item-setting">
                            <img style={{marginRight:"4px"}} src={deleteIcon} alt="editIcon" width="16" height="16"/>
                             Delete post   
                        </li>
                    </ul>
                    <div>
                        <h3 className="body__three-container-item-header">
                              <Link className="non-decor" to={`/posts/${children._id}`}>{children.title}</Link>
                                {children.new&&<p style={{display:"flex",
                                alignItems:"center",
                                marginLeft:"10px",
                                fontSize:"8px",
                                margin:"0",
                                lineHeight:"8px",
                                }}> <span >Fixed :
                                        <img style={{margin:"0px 4px"}} src={clockIcon} alt="editIcon" width="16" height="16"/>
                                        {showDayUpdate}
                                    </span>
                                </p>} 
                        </h3>
                        <Link className="non-decor" to={`/posts/${children._id}`}> {showImage}</Link>
                        <Link className="non-decor" to={`/posts/${children._id}`}>
                        <div className="body__three-container-item-text">
                            <p className="body__three-container-item-header-text">
                                {children.description}
                            </p>
                            
                        </div>
                        </Link>
                        <div>
                            <p style={{display:"flex",alignItems:"center"}} className="user-post">
                                <img style={{marginRight:"4px"}} src={userIcon} alt="editIcon" width="16" height="16"/>
                                <span style={{fontWeight:"500"}} >{user?user.username:""}</span>
                                
                            </p>
                            
                            <div className="body__three-container-item-date">
                                <p style={{display:"flex",alignItems:"center",fontWeight:"500"}}><img style={{marginRight:"4px"}} src={clockIcon} alt="editIcon" width="16" height="16"/>{showDay}  </p>
                            
                            </div>
                            
                        </div>
                    </div>    
                </div> 
                <Modal className="mt-modal" show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure delete your post ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>handleDeletePost(children._id)}>
                        Ok
                    </Button>
                    </Modal.Footer>
                </Modal>
           </Col>
    )
}

export default Blog
