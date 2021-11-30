import React,{useContext,useEffect, useRef, useState} from 'react';
import NavbarMenu from '../layouts/NavbarMenu';
import { Container,Row,Button } from 'react-bootstrap';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import BlogAll from '../layouts/BlogAll';
import { urlApi } from '../contexts/constant';
import trashIcon from '../../assets/trash-alt-solid.svg';
import { Link } from 'react-router-dom';
const Home = () => {
    const { postState:{postsAll,postsAllLoading,},
        getPostAll,} = useContext(PostContext);
    const {authState:{isAdmin},checkShowDelete,setCheckShowDelete} = useContext(AuthContext);
    const getPositionTrash = useRef();
    const moveTrashPost = useRef();
    // lay vi tri gio rac khi dom dc mout
    const [positionTrash,setPositionTrash] = useState({
        top:0,
        left:0,
    });
    // destructuring vi tri cua gio rac
    const {top,left} = positionTrash;
    // lay vi tri chuot 
    const [positionDom,setPositionDom]=useState(0);
    // lay vi tri cua bai viet xoa // lay src cua bai viet
    const [positionPost,setPositionPost]=useState({
        topPost:0,
        leftPost:0,
        srcPost:null,
        isShowDeleteImage:false,
    });
    // destructuring vi tri cua bai viet
    const {topPost,leftPost} = positionPost;
    // set loading on page when mount // and all posts when anyone access
    let body; 
    //show button delete with admin controller
    let showImageDelete=null;
    //set id setimeout to remove when unmonut componets >>leak memory
    let mysetTime,mysetTime2;

    // props truyen vao blog de lay ve gia tri bai viet khi click xoa
    //get value posion of post click delete set show animiton image fly trash
    const getPositionPost = (topPost,leftPost,srcPost,isShowDeleteImage)=>
    {
        setPositionPost({
            topPost,
            leftPost,
            srcPost,
            isShowDeleteImage,
        });
    }
    // handle set image fly form this post click >> trash 
    const handleMoveTrash=()=>{
        if(moveTrashPost.current)
        {
            moveTrashPost.current.style.top = (topPost-positionDom)+"px";
            moveTrashPost.current.style.left = (leftPost)+"px";
            moveTrashPost.current.style.display="block";
            mysetTime = setTimeout(() => {
                moveTrashPost.current.style.top = (top)+"px";
                moveTrashPost.current.style.left = (left)+"px";
            mysetTime2 = setTimeout(() => {
                    moveTrashPost.current.style.display="none"; 
                }, 1000);
            }, 1000);   
        }
    }
    // handle show button click delete and get again positon trash 
    const handleCheckShowDelete = ()=>
    {
        setCheckShowDelete(!checkShowDelete);
        setPositionTrash({
            top:getPositionTrash.current.offsetTop-30,
            left:getPositionTrash.current.offsetLeft-30,
        });
    }
   
    
    //get all posts when component mount and set button delete with admin controller not show agian
    useEffect(() => {   
        getPostAll();
        setCheckShowDelete(false);
    }, []);
    /// handle get posion on croll page. 
    const handleGetPositionOnPage=()=>
    {
        setPositionDom(window.scrollY);
        
    }
    // when component mount add event and unmount remove event
    useEffect(() => {
        document.addEventListener("scroll",handleGetPositionOnPage);
        return () => {
            document.removeEventListener("scroll",handleGetPositionOnPage);
        }
    }, [])
   //when positon post change and show animition
    useEffect(() => {
        moveTrashPost.current&& handleMoveTrash(); 
    }, [positionPost]);
    // set 2 thang nay de khoi gay leak 
    useEffect(() => {
        return () => {
            clearTimeout(mysetTime);
            clearTimeout(mysetTime2);
        }
    }, [mysetTime,mysetTime2]);
    // loading and show all post
    if(postsAllLoading)
    {
        body =<div className="center">
                <div className="loading">

                </div>
            </div> 
    }
    else
    {
        if(postsAll.length===0)
        {
           body= <h1>Don't have any post ? Create your post please</h1>
        }
        else
        {
            body = postsAll.map((post,index)=>{
                return (
                    <BlogAll getPositionPost={getPositionPost} key={index}>
                        {post}
                    </BlogAll>
                )
            })
        }
    }
    if(positionPost.isShowDeleteImage)
    {
        showImageDelete=<div ref={moveTrashPost} style={{display:"none"}} className="delete-image">
            <img src={`${urlApi}/uploads/${positionPost.srcPost}`} className="delete-image-img" alt="deleteImage"/>
        </div>
    }
    else
    {
        showImageDelete=null;
    }
    return (
        <div>
            <NavbarMenu/>
            {showImageDelete&&showImageDelete}
            <Container className="mtop-70">
                <span style={{color:'#fff',fontSize:'20px',
                                backgroundColor:'green',
                                borderRadius:'10px',
                                fontWeight:'500',
                                padding:'6px 4px',
                        }}>Welcome to Blog</span>
                {isAdmin&&(<div ref={getPositionTrash}  className="admin-manager">
                       <Link to ="posts/trash">  
                             <Button  title="Go to trash all post" style={{marginRight:"4px"}} onClick={handleCheckShowDelete}  variant="success">
                                 <img width="20" height="20" src={trashIcon} alt="trashIcon"/>
                             </Button>
                       </Link> 
                        <Button title="Go to admin controller" onClick={handleCheckShowDelete}  variant="success">Manager</Button>
                    </div>)}
                <Row className="mt-2" >
                 {body}
               </Row>
            </Container>
        </div>
    )
}

export default Home
