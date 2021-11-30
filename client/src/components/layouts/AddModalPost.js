import React,{useContext,useState,useEffect} from 'react'
import { PostContext } from '../contexts/PostContext'
import imageChoose from '../../assets/camera-solid.svg'
import {Modal,Button,Form} from 'react-bootstrap'
import cancelImage from '../../assets/times-solid.svg';
const AddModalPost = () => {
    // get from Postcontext
    const {showModalAddPost,setShowModalAddPost,addPost,setShowToast} 
        = useContext(PostContext);
    // initial value and state for form add post
    const [postState,setPostState] = useState({
        title:"",
        image:null,
        description:"",
        url:"",
    });
    // handle preview image;
    const [preview,setPreview]=useState();
    const [preview2,setPreview2]=useState();
    // destructuring post state to get value for form;
    const {image,title,description} = postState;
    // show preview and show image in new post
    let showImage;
    // handle close modal add post 
    const handleClose = ()=>
    {
        setShowModalAddPost(false);
        setPostState({
            title:"",
            image:null,
            description:"",
            url:"",
        });
        setPreview("");
    }

    // handle change input image form
    const handlePriviewImage = (e)=>{
        const file = e.target.files[0];
        if(file)
        {
            const view = URL.createObjectURL(file);
            setPreview(view);
            setPreview2(view);
            setPostState({
                ...postState,
                image:file,
            });
        }
        else
        {
            setPreview(null);
        }
    }
    // handle set value for forn onchange input
    const onChangeNewPostForm = (e)=>
    {
        setPostState({
            ...postState,
            [e.target.name]:e.target.value,
        });
    }
    // handle close post image in add modal post and set image value null
    const handleDeleteImagePost=()=>{
        setPreview(null);
        setPreview2(null);
        setPostState({
            ...postState,
            image:null,
        });
    }
    // handle submit add post
    const onSubmit=async(e)=>
    {
        e.preventDefault();
        //encType="multipart/form-data" // 
        // create new formdata not Error: Multipart: Boundary not found @@@~
        const bodyFormData = new FormData();
        bodyFormData.append('image', image);
        bodyFormData.append('title', title);
        bodyFormData.append('description', description);
        try {
            const response = await addPost(bodyFormData);
            if(response.success)
            {
                setShowToast({
                    show:true,
                    message:response.message,
                    type:'success',
                });
                
            }
        } catch (error) {
            console.log("tao post loi");
            setShowToast({
                show:true,
                message:'Khong the tao post',
                type:'warning',
            });
            console.log(error)
        } 
        handleClose();
    }
    // handle remove URL link preview when preview onchange
    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview);
        }
    }, [preview]);
    // handle remove URL link preview2 when preview2 onchange
    useEffect(() => {
        return () => {
            preview2 && URL.revokeObjectURL(preview2);
        }
    }, [preview2]);
    // handle show image in add post modal
    if(preview)
    {
        showImage=<div className="preview">
                    <img className="preview-img" src={preview} alt="anhpreview"/>
                        <div onClick={handleDeleteImagePost} className="cancel-preview">
                            <img width="26" height="26" src={cancelImage} alt="cancelImagePreview"/>
                        </div>
                  </div>
    }
    else
    {
        if(image)
        {
            showImage=<div className="preview">
                        <img className="preview-img" src={preview2} alt="anhpreview"/>
                        <div onClick={handleDeleteImagePost} className="cancel-preview">
                           <img width="26" height="26" src={cancelImage} alt="cancelImagePreview"/>
                        </div>
                      </div> 
        }
    }
    return (
        <Modal show={showModalAddPost} onHide={handleClose} className="mtop-70">
            <Modal.Header closeButton>
                <Modal.Title>What do you want to post?</Modal.Title>
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
                    {showImage}
                    <Form.Group className="mt-2 d-flex align-items-center" controlId="getImagePost">
                        <Form.Label>
                            <img className="boder-choose-image" width="50" height="50" src={imageChoose} alt="camera-solid"/>
                        </Form.Label>
                        <Form.Control hidden type="file" placeholder="Choose your image"name="image"
                            // value={image}
                            onChange={handlePriviewImage}
                        />
                        <span style={{fontWeight:"500"}}> Choose your image to post</span>
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
                    <Button variant ="primary" type="submit">Create post</Button>
                </Modal.Footer>
            </Form>
      </Modal>
    )
}

export default AddModalPost
