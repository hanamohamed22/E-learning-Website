import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ProgressModel(props) {
   
    const progress=props.progress;
    const arr=[0,1,2,3,4]

    var p=progress;
    const x=Math.floor(progress/20.1);
    // console.log(x);

    const tooltip = (
        <Tooltip id="tooltip">
          {progress<100?<p>you completed {progress}% of course content<br/> keep going to get your<strong> Certificate</strong></p>:<p>CONGRATULATIONS!<br/> you have completed 100% of the course content</p>} 
        </Tooltip>
      );


    return(
        <div className='progressModel position-relative h-100 w-100' >
            <OverlayTrigger placement="top" overlay={tooltip}>
                <DirectionsWalkIcon  style={{fontSize:"4rem",position:"absolute",bottom:`${(x*2.5)+0.3}rem`,left:`${x*4.5}rem`}}/>
            </OverlayTrigger>
            {arr.map(x=>{console.log(p);p=progress-(20*x);p<0?p=0:p=p; return(
            <div className="progress " style={{position:"absolute",bottom:`${(x*2.5)-0.5}rem`,left:`${x*4.5}rem`}}>
            <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{width:`${p*5}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>)})
                }

            {progress==0?
            <p style={{position:"absolute",bottom:"-1rem",left:`${(x*4.5)+9}rem`}}>Every step matters <strong> Start Now</strong> </p>:
            progress<=20?
            <p style={{position:"absolute",bottom:"-1rem",left:`${(x*4.5)+9}rem`}}>Make learning a habit</p>:
            progress<=40?
            <p style={{position:"absolute",bottom:`${(x*2.5)-0.5}rem`,left:`${(x*4.5)+9}rem`}}>You are doing great</p>:
            progress<=60?
            <p style={{position:"absolute",bottom:`${(x*2.5)-0.5}rem`,left:`${(x*4.5)+9}rem`}}>HALF WAY THROUGH</p>:
            progress<=80?
            <p style={{position:"absolute",bottom:`${(x*2.5)-0.5}rem`,left:`${(x*4.5)+9}rem`}}>You have come a long way</p>:
            progress<=99?
            <p style={{position:"absolute",bottom:`${(x*2.5)-0.5}rem`,left:`${(x*4.5)+9}rem`}}><strong>keep going! </strong> almost done</p>:
            progress==100&&
            <strong style={{position:"absolute",bottom:`${(x*2.5)-0.5}rem`,left:`${(x*4.5)+9}rem`}}>YOU MADE IT!</strong>
            }
            
            

        </div>
       


    )
}

export default ProgressModel