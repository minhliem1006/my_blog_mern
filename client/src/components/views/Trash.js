import React,{useContext,useEffect} from 'react';
import NavbarMenu from '../layouts/NavbarMenu';
import {PostContext} from '../contexts/PostContext';
import BlogTrash from '../layouts/BlogTrash';
import { Container,Row } from 'react-bootstrap';
const Trash = () => {
    const {getTrashPost,postState:{postsTrash,postsTrashLoading}} = useContext(PostContext);
    let body;
    if(postsTrashLoading)
    {
        body =<div className="center">
            <div className="loading">

            </div>
         </div> 
    }
    else
    {
        if(postsTrash.length===0)
        {
           body= <h1>Don't have any Trash post !!!</h1>
        }
        else
        {
            body = postsTrash.map((post,index)=>{
                return (
                    <BlogTrash key={index}>
                        {post}
                    </BlogTrash>
                )
            })
        }
    }
    useEffect(() => {
        getTrashPost();
    }, []);
    return (
        <div>
            <NavbarMenu/>

            <div className="mtop-70">
                <Container>
                    <span style={{color:'#fff',fontSize:'20px',
                                backgroundColor:'green',
                                borderRadius:'10px',
                                fontWeight:'500',
                                padding:'6px 4px'
                            }}>Trash All Post</span>
                    <Row className="mt-2" >
                        {body}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Trash
