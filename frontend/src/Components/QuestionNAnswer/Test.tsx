import React from 'react'
import QuestionNAnswer from './QuestionNAnswer'
import axios from "axios";
import styled from "styled-components";

export interface IComments{
    courseId?: string;
  question: string;
  userId: any;
  answers?: any;
  _id:string
}
const Button= styled.button`
    color: white;
    background-color: #0073b1;
    padding: 0.5% 15px;
`
const CommentBox=styled.div`
    display: grid;
    grid-template-rows: 50px auto 20px;
    margin: auto;
    width: 90%;
    border: 1px solid black;
    padding:1rem;
    img{
        height:40px;
        border-radius: 50%;
    }

`
const ImageHolder=styled.div`
    border-radius: 50%;
    height:50px;
`
const NameTag=styled.div`
    display: grid;
    grid-template-columns: 8% 79%;
    
`

const Box=styled.div`
    textarea{
        width:100%;
        height: auto;
        min-height: 100px;
    }
`

export default function Test({id="60c6e5a4bac4a7241c74f84f"}:any) {
    const [comments, setComments] = React.useState([])
    const [message,setMessage]=React.useState("")
    const [question,setQuestion]= React.useState("")
    const handlePostQuestion = async ( )=>{
        const  payload= {
            "question":question,
            "userId":"60c4d0228a7b100f2840d795",
            "courseId":id ||"60c6e5a4bac4a7241c74f84f"
        }
         let response= await axios.post('http://localhost:5000/add-question',payload);
         console.log(response)
        // setMessage(response?.data.message) 
    }
    const calling = async()=>{
        try {
            
            let data = await axios.get(`http://localhost:5000/getQnAWithCourseId/${id}`)    
   
            setComments(data.data.QNA)
        
        } catch (error) {
            console.log(error)
        }

    }
    React.useEffect(()=>{
        calling()
        // handlePostQuestion()
    },[comments])

    const userData = {
        name:"name",
        clg:"collage"
    }
    // calling()
    return (
        <section  style={{height:"auto"}}>
            {/* <div>
                {message.length!==0 && <h1>{message}</h1>}
            </div> */}
        <CommentBox>
            
        <NameTag>
                <ImageHolder>
                    <img src="https://via.placeholder.com/168x160" alt="" />
                </ImageHolder>
                <div>
                    <span>Name</span>
                    <br />  
                    <span>description</span>
                </div>
            </NameTag>
            <Box>
                <textarea
                 value={question}
                 onChange={(e)=>setQuestion(e.target.value)}
                 />
            </Box>
            <div style={{display:'flex' , justifyContent:"space-between"}}>
                <span>
                <span><input type="checkbox" /></span>
                <span>Also post on my LinkedIn feed</span>
                </span>
                <span><Button onClick={handlePostQuestion}>Post</Button></span>
            </div>
        </CommentBox>
        <div>
            {
                comments.length && comments.map((item:IComments)=> <QuestionNAnswer key={item?._id} {...item}/>
                )
            }
        </div>
    </section>
    )
}

