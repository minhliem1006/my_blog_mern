import React,{useContext, useEffect} from 'react';
import styles from './DashBoard.module.css'
import addIcon from '../../assets/plus-circle-fill.svg'
import NavbarMenu from '../layouts/NavbarMenu';
import AddModalPost from '../layouts/AddModalPost';
import EditModalPost from '../layouts/EditModalPost';
import { Button,Toast,Container, Row } from 'react-bootstrap';
import { PostContext } from '../contexts/PostContext';
import Blog from '../layouts/Blog';
const DashBoard = () => {
    const { postState:{posts,postsLoading,},
            getPost,
            setShowModalAddPost,
            showToast:{show,message,type},setShowToast} = useContext(PostContext);
    //set all post of user       
    let body;
    
    if(postsLoading)
    {
        body =  <div className="center">
                    <div className="loading">

                    </div>
                 </div> 
    }
    else
    {
        if(posts.length===0)
        {
           body= <h1>You don't have any post ? Create post please</h1>
        }
        else
        {
            body = posts.map((post,index)=>{
                return (
                    <Blog key={index} index={index}>{post}</Blog>
                )
            })
        }
    }
    // get all post of user when component mount
    useEffect(() => {  
        setShowToast({ 
            show:false,
            message:'',
            type:null,
        });
        getPost();
    }, []);
    return (
        <div>
           <NavbarMenu></NavbarMenu>
           <Container className="mtop-70">
               <span style={{color:'#fff',fontSize:'20px',
                            backgroundColor:'green',
                            borderRadius:'10px',
                            fontWeight:'500',
                            padding:'6px 4px'
                    }}>Your blog</span>
               <Row className="mt-2" >
                 {body}
               </Row>
           </Container>

           <AddModalPost/>
           <EditModalPost/>
           <Toast show={show} animation={true} style={{position:"fixed",top:'10%',right:"20px",width:"200px"}}
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
           <Button onClick={setShowModalAddPost.bind(this,true)} title="Add somethings" className={styles.btnAddIcon}>
               <img width="60" height="60" src={addIcon} alt="addIcon"/>
           </Button>
        </div>
    )
}
export default DashBoard
