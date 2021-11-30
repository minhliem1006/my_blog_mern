import { useContext,useState,useRef} from 'react';
import { Link } from 'react-router-dom'; 
import { urlApi } from '../contexts/constant';
import clockIcon from '../../assets/clock-regular.svg';
import deleteIcon from '../../assets/times-solid.svg';
import userIcon from '../../assets/user-regular.svg';
import {Col, Modal,Button} from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext} from '../contexts/PostContext';
const BlogAll = ({getPositionPost,children}) => {
    const {checkShowDelete,setCheckShowDelete} = useContext(AuthContext);
    const {deletePost} = useContext(PostContext);
    // lay vi tri bat dau xoa cua moi bai blog
    const postBlog = useRef();
    // get scroll position



    const [showModalDelete,setShowModalDelete]=useState(false);
    const date = new Date(children.createdAt);
    const showDay = date.toUTCString();
    const dateUpdate = new Date(children.updatedAt);
    const showDayUpdate = dateUpdate.toUTCString();
    let showImage;
    let deleteImage;
    if(children.image === "null" || children.image===undefined)
    {
        showImage=<div></div>
        // deleteImage = <div></div>;
    }
    else
    {
        showImage=<div className="body__three-container-cover-img">
                        <div style={{backgroundImage:`url(${urlApi}/uploads/${children.image})`}} className="body__three-container-item-img">
                        </div>

                   </div>
    }

    const handleShowDeletePostAdmin=()=>
    {
        setShowModalDelete(true);
    }
    const handleCloseShowModalDelete =()=>{
        setShowModalDelete(false);
    }
    const handleDeletePostAdmin = async(idPost)=>
    {
        // lay vi tri bai viet de viet aminiton xoa bai viet
        getPositionPost(postBlog.current.offsetTop,postBlog.current.offsetLeft,children.image,true);
        setShowModalDelete(false);
        setCheckShowDelete(false);
        try {
            const res = await deletePost(idPost);
            if(res.success)
            {
                console.log("success delete post width admin");
                   
            }
            else
            {   
                console.log("fail delete post");
            }
        } catch (error) {
            console.log("fail delete post");
        }
    }
    
    return (
           <Col ref={postBlog} xs={12} md={6} lg={6} className="mt-2 text-center">
               
                <div className="body__three-container-item my-blog">
                    {deleteImage}
                    <Link className="non-decor" to={`/posts/${children._id}`}>
                        <h3 className="body__three-container-item-header">
                                <p style={{color:"blue",margin:"0"}}>{children.title}
                                </p>
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
                        {showImage}
                        <div className="body__three-container-item-text">
                            <p className="body__three-container-item-header-text">
                                {children.description}
                            </p>
                            
                        </div> 
                    </Link>    
                    <div>
                        <p style={{display:"flex",alignItems:"center"}} className="user-post">
                            <img style={{marginRight:"4px"}} src={userIcon} alt="editIcon" width="16" height="16"/>     
                            <span style={{fontWeight:"500"}}>{children.user.username}</span>
                        </p>
                        
                        <div className="body__three-container-item-date">
                            <p style={{display:"flex",alignItems:"center",fontWeight:"500"}}><img style={{marginRight:"4px"}} src={clockIcon} alt="editIcon" width="16" height="16"/>{showDay}</p>
                        </div>
                    </div>
                    {checkShowDelete&&<span title="Delete this post" onClick={handleShowDeletePostAdmin} className="show-delete-button">
                        <img width="20" height="20" src={deleteIcon} alt="settingIcon"/>
                    </span>}
                </div> 
                <Modal className="mt-modal" show={showModalDelete} onHide={handleCloseShowModalDelete}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure delete post with admin controller ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseShowModalDelete}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>handleDeletePostAdmin(children._id)}>
                        Ok
                    </Button>
                    </Modal.Footer>
                </Modal>
           </Col>
    )
}

export default BlogAll
