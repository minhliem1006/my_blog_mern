import React,{useContext,useState,useEffect} from 'react';
import { PostContext } from '../contexts/PostContext';
import { urlApi } from '../contexts/constant';
import cancelImage from '../../assets/times-solid.svg';
import imageChoose from '../../assets/camera-solid.svg';
import {Modal,Button,Form} from 'react-bootstrap';
const EditModalPost = () => {
    const { showEditModalPost,
        setShowEditModalPost,
        editPost,
        setShowToast,
        postState:{posts,},
        idUpdata,
        } = useContext(PostContext);
    //set value initial for form edit
    const [postUpdataState,setPostUpdataState] = useState({
        title:"",
        image:null,
        description:"",
    });    
    // set preview for image choose edit
    const [preview,setPreview]=useState();
    // set again avatar preview when avater preview cancel
    const [preview2,setPreview2]=useState();
    // destructuring value in state
    const {title,image,description}=postUpdataState;
   
    
    //handle onchange image and set preview for image post edit again
    const handlePriviewImage = (e)=>{
        const file = e.target.files[0];
        if(file)
        {
            const view = URL.createObjectURL(file);
            setPreview(view);
            setPreview2(view);
            setPostUpdataState({
                ...postUpdataState,
                image:file,
            });
        }
        else
        {
            setPreview(null);
        }

    }
   
    //handle click delete image this post want to edit
    const handleDeleteImagePost=()=>
    {
        setPostUpdataState({        
            ...postUpdataState,
            image:"",
        });
    }
    // handle onchange value for form
    const onChangeNewPostForm = (e)=>
    {
        setPostUpdataState({
            ...postUpdataState,
            [e.target.name]:e.target.value,
        });
    }
    //handle close modal edit and set again post click edit inital value when not edit
    const handleClose = ()=>
    {
        setShowEditModalPost(false);
        setPreview(null);
        setPreview2(null);
        // set lai gia tri modal edit 
        posts.forEach(post => {
            if(post._id===idUpdata)
            {
                setPostUpdataState(post);
            }
        });
        
        
    }
    // handele click delete image preview 1 2 just remain image this post
    const handleDeleteImagePreview=()=> 
    {
        setPreview(null);
        setPreview2(null);
        posts.forEach(post => {
            if(post._id===idUpdata)
            {
                setPostUpdataState({
                    ...post,
                    image:post.image,
                });
            }
        });
    }
    // submit form get again value for form = new form data 
    // because Multipart: Boundary not found @@@~ reason 
    //encType="multipart/form-data" // 
    const onSubmit=async(e)=>
    {
        e.preventDefault();
        //encType="multipart/form-data" // 
        // create new formdata not Error: Multipart: Boundary not found @@@~
        const formData = new FormData();
        formData.append('image', image?image:null);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('_id', idUpdata);
        try {
            const response = await editPost(formData);
            if(response.success)
            {   
                setShowToast({
                    show:true,
                    message:response.message,
                    type:'success',
                });
            }

        } catch (error) {
            console.log("sua post loi");
            console.log(error);
            setShowToast({
                show:true,
                message:'khong the sua post',
                type:'warning',
            });
        } 
        handleClose();
    }
    // logic show image in post when edit
    let showImageEdit=null;  
    
    if(preview)
    {
        showImageEdit=<div className="preview">
                        <img className="preview-img" src={preview} alt="imagePreview"/>
                        <div onClick={handleDeleteImagePreview} className="cancel-preview">
                            <img width="26" height="26" src={cancelImage} alt="cancelImagePreview"/>
                        </div>
                    </div>
    }
    else
    {
        if(preview2)
        {
            showImageEdit=<div className="preview">
                        <img className="preview-img" src={preview2} alt="imagePreview"/>
                        <div onClick={handleDeleteImagePreview} className="cancel-preview">
                            <img width="26" height="26" src={cancelImage} alt="cancelImagePreview"/>
                        </div>
                    </div>
        }
        else
        {
            if(image)
             {
                showImageEdit = <div className="preview">
                    <img className="preview-img" src={`${urlApi}/uploads/${image}`} alt="imagePost"/>
                    <div onClick={handleDeleteImagePost} className="cancel-preview">
                        <img width="26" height="26" src={cancelImage} alt="cancelImagePreview"/>
                    </div>
                </div>
            }

        }
    }
    // remove URL prew 1 when mount again
    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview);
        }
    }, [preview]);
    // remove URL prew 2 when mount again
    useEffect(() => {
        return () => {
            preview2 && URL.revokeObjectURL(preview2);
        }
    }, [preview2]);
    // set all value again of post when click diffrent post in posts list
    useEffect(() => {
        posts.forEach(post => {
            if(post._id===idUpdata)
            {
                setPostUpdataState(post);
            }
        });
    }, [idUpdata]);
    return (
        <Modal show={showEditModalPost} onHide={handleClose} className="mt-modal">
            <Modal.Header closeButton>
                <Modal.Title>What do you want to edit?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mt-2">
                        <Form.Control type='text' placeholder="Title" name="title"
                            required aria-describedby="title-help"
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted >
                            Required
                        </Form.Text>    
                       
                    </Form.Group>
                    {showImageEdit}
                    <Form.Group className="mt-2 d-flex align-items-center" controlId="editImagePost">
                        <Form.Label>
                            <img className="boder-choose-image" width="50" height="50" src={imageChoose} alt="camera-solid"/>
                           
                        </Form.Label>
                        <Form.Control hidden type="file" placeholder="Choose your image"name="image"
                            onChange={handlePriviewImage}
                            // value="Choose your image"
                        />
                         <span style={{fontWeight:"500"}}> Edit your image </span>
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Control as="textarea" rows={3} placeholder="description" name="description"
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Cancel</Button>
                    <Button variant ="primary" type="submit">Edit post</Button>
                </Modal.Footer>
            </Form>
      </Modal>
    )
}
export default EditModalPost
