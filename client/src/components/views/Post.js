import React,{useContext,useEffect,useState} from 'react';
import NavbarMenu from '../layouts/NavbarMenu';
import { Navigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { Container,Col,Row } from 'react-bootstrap';
import { PostContext } from '../contexts/PostContext';
import {urlApi} from '../contexts/constant';
import clockIcon from '../../assets/clock-regular.svg';
import userIcon from '../../assets/user-regular.svg';
const Post = () => {
    const { _id } = useParams();
    const {getPostIdDetail} = useContext(PostContext);
    const [getPost,setGetPost] = useState({
        postLoading:true,
        post:null,
    });
    const {postLoading,post}= getPost;
    let content;
    const getDetailPost = async()=>{
        try {
            const res = await getPostIdDetail(_id);
            if(res.success)
            {
                setGetPost({
                    postLoading:false,
                    post:res.post,
                });
            }
            else
            {
                setGetPost({
                    postLoading:false,
                    post:null,
                });
            }
        } catch (error) {
            console.log("get detail post error");
        }
    }
    useEffect(() => {
        getDetailPost();
    }, []);
    
    if(postLoading)
    {
        content= <div className="center">
                    <div className="loading">

                    </div>
                </div> 
    }
    else
    {
        if(!post)
        {
            return <Navigate to="/error"></Navigate>
        }
        else
        {
            const date = new Date(post.createdAt);
            const showDay = date.toUTCString();
            const dateUpdate = new Date(post.updatedAt);
            const showDayUpdate = dateUpdate.toUTCString();
            let showImage;
            if(post.image === "null" || post.image===undefined)
            {
                showImage=<div></div>
            }
            else
            {
                showImage= <div style={{backgroundImage:`url(${urlApi}/uploads/${post.image})`}} className="show__details-post--image">
                            </div>
        
                        
            }

            content = 
            <div>
                <div>
                    <h3 style={{margin:"10px 0"}}>
                            <span style={{color:"blue",textTransform:"uppercase"}}>{post.title}</span>
                            {post.new&&<p style={{display:"flex",
                            alignItems:"center",
                            marginLeft:"10px",
                            fontSize:"12px",
                            margin:"0",
                            lineHeight:"8px",
                            }}> <span >Fixed :
                                    <img style={{margin:"0px 4px"}} src={clockIcon} alt="editIcon" width="16" height="16"/>
                                    {showDayUpdate}
                                </span>
                            </p>} 
                    </h3>
                    {showImage}
                    <div>
                        <p style={{marginTop:"20px"}}>
                            {post.description}
                        </p>
                        
                    </div> 
                </div>    
                <div>
                    <p style={{display:"flex",alignItems:"center"}} className="user-post">
                        <img style={{marginRight:"4px"}} src={userIcon} alt="editIcon" width="16" height="16"/>     
                        <span style={{fontWeight:"500"}}>{post.user.username}</span>
                    </p>
                    
                    <div className="body__three-container-item-date">
                        <p style={{display:"flex",alignItems:"center",fontWeight:"500"}}><img style={{marginRight:"4px"}} src={clockIcon} alt="editIcon" width="16" height="16"/>{showDay}</p>
                    </div>
                </div>
            </div> 
        }
    }
    return (
        <div>
           <NavbarMenu/> 
                <Row>
                    <Col xs={12} md={12} lg={12}> 
                        <Container className="mtop-70">
                            {content}
                        </Container>
                    </Col>
                </Row>
        </div>
    )
}

export default Post
