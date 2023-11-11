import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function AnsweredQuiz(props) {

    const id=props.subtitleId;
    const userType=props.user.message;
    //console.log(userType)
    //console.log(props.wrong)

    //console.log(id);
    const [questions,setQuestions]=useState([{questionText:"",answerOptions: [{answerText:"",isCorrect:false}]}])
    //const [questions,setQuestions]=useState([{}])
    const [render2nd,setRender2nd]=useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
   // const id="6375979d5f7796f397ab8fdb"
    const [showQuiz, setShowQuiz] = useState(true);
	const [exercisesSolved,setExercisesSolved]=useState([]);

    useEffect(() => {
        const fetchExer = async () => {
            const response = await axios.get(`/getSubtitleExer/?id=${id}`);
            console.log("da elresponse")
            if (response.data.exercises[0].questionText) {
                setQuestions(response.data.exercises); 
                setCurrentQuestion(0);
                setShowScore(false);
                setScore(0);
                console.log(questions)  
            }
            else{
                console.log("failed elresponse")
                setQuestions([{questionText:"",answerOptions: [{answerText:"",isCorrect:false}]}]);
                setCurrentQuestion(0);
                setShowScore(false);
                setScore(0);

          };
        }
		
        fetchExer();
    },[id]);
    //render2nd,id
    
    const handleNextAnswer = (isCorrect) => {
       
        const nextQuestion = currentQuestion + 1;
        console.log("next"+currentQuestion)
        if (nextQuestion===questions.length){
            setCurrentQuestion(nextQuestion-1)
        }
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } 
    };
    const handlePrevAnswer = (isCorrect) => {
        const prevQuestion = currentQuestion - 1;
        console.log("prev"+currentQuestion)
        if (prevQuestion === -1) {
            setCurrentQuestion(0);
        } 
        else{
        setCurrentQuestion(prevQuestion)}
    };
    return (
        <div  style={{backgroundColor:"white", padding:"15px", margin:"15px 0", boxShadow: "4px 4px 4px 4px lightgrey", borderRadius:"7px"}}>
        {showQuiz? (
            <>
            <div   visibility= 'hidden' >
            
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count' style={{  width:"100%", fontSize:"15px"}}>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                    
                        <Box sx={{  width:"100%", fontSize:20, fontWeight:"bold"}}>
                    
                        <div className='question-text' >  
                        {questions[currentQuestion].questionText}</div>
                        </Box>
                        
                    </div>
                    <div className='answer-section'>
                    
                    <List>
                        {userType!="instructor"?
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {questions[currentQuestion].answerOptions.map((answerOption,index) => (
                        <div>  { answerOption.isCorrect===true? <nav><ListItemButton  style={{color:"lightgreen"}}>{answerOption.answerText}</ListItemButton>
                                <Divider color="grey"/> </nav>:props.wrong[currentQuestion].wrong && props.wrong[currentQuestion].element===index?<nav><ListItemButton  style={{color:"red"}}>{answerOption.answerText}</ListItemButton> <Divider color="grey"/></nav>:<nav><ListItemButton  >{answerOption.answerText}</ListItemButton> <Divider color="grey"/></nav>} 
                                </div>
                            ))}
                            
                        </Box>:
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {questions[currentQuestion].answerOptions.map((answerOption,index) => (
                       <div>  { answerOption.isCorrect===true? <nav><ListItemButton  style={{color:"lightgreen"}}>{answerOption.answerText}</ListItemButton>
                            <Divider color="grey"/> </nav>:<nav><ListItemButton  >{answerOption.answerText}</ListItemButton> <Divider color="grey"/></nav>} 
                            </div>
                        ))}
                        
                        </Box>

                        }
                    </List>
                        {/* <Box  sx={{ '& > :not(style)': {m: 0,}, }}> */}
                        <ButtonGroup>
                            
                        {currentQuestion!=0&&<Button style={{ marginLeft : "0" }} onClick={() => handlePrevAnswer()}>Back</Button>}
                        {currentQuestion!=questions.length-1&&<Button style={{alignItems:"flex-start"}} onClick={() => handleNextAnswer()}>Next</Button>}
                        
                        </ButtonGroup>
                    
                        {/* </Box> */}
                    
                    </div>
                    
                    
          
                </>
            )}
            
        </div>
        </>
        ) : (<div>No questions to show</div>) }
        </div>
    );
}
// const questions1 = [
//  {
//      questionText: 'What is the capital of France?',
//      answerOptions: [
//          { answerText: 'New York', isCorrect: false },
//          { answerText: 'London', isCorrect: false },
//          { answerText: 'Paris', isCorrect: true },
//          { answerText: 'Dublin', isCorrect: false },
//      ],
//  },
//  {
//      questionText: 'Who is CEO of Tesla?',
//      answerOptions: [
//          { answerText: 'Jeff Bezos', isCorrect: false },
//          { answerText: 'Elon Musk', isCorrect: true },
//          { answerText: 'Bill Gates', isCorrect: false },
//          { answerText: 'Tony Stark', isCorrect: false },
//      ],
//  },
//  {
//      questionText: 'The iPhone was created by which company?',
//      answerOptions: [
//          { answerText: 'Apple', isCorrect: true },
//          { answerText: 'Intel', isCorrect: false },
//          { answerText: 'Amazon', isCorrect: false },
//          { answerText: 'Microsoft', isCorrect: false },
//      ],
//  },
//  {
//      questionText: 'How many Harry Potter books are there?',
//      answerOptions: [
//          { answerText: '1', isCorrect: false },
//          { answerText: '4', isCorrect: false },
//          { answerText: '6', isCorrect: false },
//          { answerText: '7', isCorrect: true },
//      ],
//  },
// ];

