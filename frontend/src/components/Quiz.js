import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import AnsweredQuiz from "./AnsweredQuiz";
import { blueGrey } from "@mui/material/colors";

export default function Quiz(props) {
    //const id1=props.id;
    //console.log(props)
    //console.log(id1)
    const id=props.subtitleId;
	const studentId=props.user.user._id;
	const courseId=props.courseId;
	const studentType=props.user.message;
	const exerciseId=props.exerciseId;

	const [questions,setQuestions]=useState([{questionText:"",answerOptions: [{answerText:"",isCorrect:false}]}])
    //const [questions,setQuestions]=useState([{}])
    const [render2nd,setRender2nd]=useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [showCorrectAnswers,setShowCorrectAnswers]=useState(false);
    const[wrongans,setwrongans]=useState([{}]);
	const [solved, setSolved] = useState(false);
    const [answerClicked,setAnswerClicked]=useState();
   // const id="6375979d5f7796f397ab8fdb"
    const [showQuiz, setShowQuiz] = useState(true);
    useEffect(() => {
        const fetchExer = async () => {
            const response = await axios.get(`/getSubtitleExer/?id=${id}`);
            console.log("da elresponse")
            console.log(response.data)
            if (response.data.exercises[0].questionText) {
                setQuestions(response.data.exercises); 
                setCurrentQuestion(0);
                setShowScore(false);
                setShowCorrectAnswers(false);
                setScore(0);
                if(!solved)
				setwrongans(new Array(response.data.exercises.length).fill(0));
            }
            else{
                console.log("failed elresponse")
                setQuestions([{questionText:"",answerOptions: [{answerText:"",isCorrect:false}]}]);
                setCurrentQuestion(0);
                setShowScore(false);
                setShowCorrectAnswers(false);
                setScore(0);

          };
        }
		const fetchTakes = async () => {
			const response = await axios.get(`/studentTakesCourse?courseId=${courseId}&studentId=${studentId}&studentType=${studentType}`)
			if (response) {
               
				const myExer =response.data.exercisesSolved.filter(exer=>{ if(exer.exerciseId===exerciseId) return exer })
                console.log(exerciseId);
                console.log(myExer);
				if(myExer.length>0){
				setSolved(true);
                console.log("solveeeeddd")
				setwrongans(myExer[0].answers)
                setScore(myExer[0].grade.right)}
                else{
                    setSolved(false);
              console.log("not solveeed")

                }
			  }
			 else {
			  alert("you are not registered")
              
			 }
             
			}
            

        fetchExer();
		fetchTakes();
    },[exerciseId,id]);
    //render2nd,id
    useEffect(() => {
    },[showCorrectAnswers,answerClicked]);
    
    const handleAnswerOptionClick = (isCorrect,index,counter) => {
        setAnswerClicked(index);
        console.log("click: "+index)
        if (isCorrect ) {
            setScore(score + 1);
			setwrongans(wrongans.map((x, i) =>  i === currentQuestion?{wrong:0,element:index}: x  ))
            //setwrongans([...wrongans,{wrong:0,element:index}])
            
        }else{
			setwrongans(wrongans.map((x, i) => i === currentQuestion?  {wrong:1,element:index}:x))
            //setwrongans([...wrongans,{wrong:1,element:index}])
        }
		console.log(wrongans)
	

       
    };
	const handleNextAnswer = async() => {
        setAnswerClicked(-1);
		const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
			console.log("seeeeennddddd")
			//backendcall
			try {
				const len=questions.length;
				const res=await axios.post("/addSolvedExercise", {
					studentId,
					courseId,
					studentType,
					exerciseId,
					grade:{right:score,total:len},
                    answers:wrongans
				});
			console.log(res)
			
			} catch (err) {
				alert("Couldn't add exercise");
			}
        }
    };
    return (
        <div  style={{backgroundColor:"white", padding:"15px", margin:"15px 0", boxShadow: "4px 4px 4px 4px lightgrey", borderRadius:"7px"}}>
    {showQuiz? (
            <>
            <div   visibility= 'hidden' >
			{solved?
             <div className='score-section'>
             You scored {score} out of {questions.length}
             <AnsweredQuiz  subtitleId={id} wrong={wrongans} user={props.user}></AnsweredQuiz>
             </div>:
            <>
            {showScore ? (

                <div className='score-section'>
                    You scored {score} out of {questions.length}
                <div>{!showCorrectAnswers?<Button onClick={(e)=>{setShowCorrectAnswers(true); setShowScore(true)}}>View Answers</Button>:<AnsweredQuiz  subtitleId={id} wrong={wrongans} user={props.user}></AnsweredQuiz>}</div>
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
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }} >
                        {questions[currentQuestion].answerOptions.map((answerOption,index) => (
                            <nav>{answerClicked!==index?<ListItemButton  onClick={() => handleAnswerOptionClick(answerOption.isCorrect,index)}>{answerOption.answerText}</ListItemButton>:
                            <ListItemButton style={{backgroundColor:"lightgray"}} onClick={() => handleAnswerOptionClick(answerOption.isCorrect,index)}>{answerOption.answerText}</ListItemButton>}<Divider color="grey"/>    </nav>
                        ))}
                        <div className="d-flex">
						<Button variant="outline-primary ms-auto my-2"style={{alignItems:"flex-end"}} onClick={() => handleNextAnswer()}>Next</Button>
                        </div>
                        </Box>
                        </List>
                    </div>
                </>
            )}</>}
            
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

