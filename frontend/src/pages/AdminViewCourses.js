import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseList from "../components/CourseList";
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from "../components/CourseCard";
import Filter from "../components/Filter";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import InstructorCourseCard from "../components/InstructorCourseCard";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PromoForm from "../components/PromoForm";
import Pagination from "./Pagination";
import Modal from 'react-bootstrap/Modal';
import InstructorCard from "../components/InstructorCard";
import AlertModal from "../components/AlertModal";





function AdminViewCourses(props) {
  
  
  const [checkedState, setCheckedState] = useState([{}]);
  const[promoFlag,setPromoFLag]=useState(false);

  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const countryToCurrency = require("country-to-currency");
  const cur = countryToCurrency[props.con.value];
  const [currency, setCurrency] = useState("EGP");

  const [filteredCourses, setFilteredCourses] = useState([]);
  
  const [subjects,setSubjects]=useState([]);
  const [allprices,setAllprices]=useState([]);
  const[subjectfiltered,setSubjectFiltered]=useState(false);
  const[ratingfiltered,setRatingFiltered]=useState(false);
  const[pricefiltered,setPriceFiltered]=useState(false);
  const[priceUsedInFilter,setPriceUsedInFilter]=useState("none");
  const[subjectUsedInFilter,setSubjectUsedInFilter]=useState("none");
  const[ratingUsedInFilter,setRatingUsedInFilter]=useState("none");
  const [price, setPrice] = useState(1);
  const[courses,setCourses]=useState([]);
  const[alreadyPromoted,setAlreadyPromoted]=useState(false); //flag i set if he selected one of promoted courses
  const[alreadyPromotedForm,setAlreadyPromotedForm]=useState(false);
  
  const[showAlert,setShowAlert]=useState(false);
  const [alertMssg,setAlertMssg]=useState("");
  

const getSubjects =async ()=>{
    const response=await axios.get('/findsubjects');
    let unique = [...new Set(response.data.map((x)=>{return (x.toLowerCase())}))];
    
    if(response){
        setSubjects(unique)
        }
    }
    const getPrices =async ()=>{
        const response=await axios.get('/findprices');
        if(response){
            setAllprices(response.data)
        }
    }
    const fetchallCourses = async () => {
        const response = await axios.get('/courses');
        if (response) {
        return response.data; 
        }
    };

    useEffect(() => {
        getSubjects();
        getPrices();

        const fetchCourses = async () => {
            const response = await axios.get(`/search?q=${query.toLocaleLowerCase()}`);
            if (response) {
                setFilteredCourses(response.data); //awl ma yebda2 dol el hyb2o displayed 
            }
        };

        const currenciesrate = async () => {
        const response = await axios.get(
            "https://v6.exchangerate-api.com/v6/6d56731204e6abe03c0a12b5/latest/EGP"
        );

        if (response) {
            if (cur) {
            setCurrency(cur);
            Object.keys(response.data.conversion_rates).forEach((key) => {
                if (key === cur) {
                setPrice(response.data.conversion_rates[key]);
                }
            });
            }
        }
        };

    fetchCourses();
    currenciesrate();
  }, [query, cur, price]);
  
  useEffect(()=>{
    
    setFilteredCourses(courses.filter((course)=>{
      if(course.subject.toLowerCase()===subjectUsedInFilter || subjectUsedInFilter==="none"){
        if(course.price+""===priceUsedInFilter || priceUsedInFilter==="none"){
          if(Math.round(course.avgRating)+""===ratingUsedInFilter || ratingUsedInFilter==="none"){
                        
            return course;
          }else{
            return null;
          }
        }
        else{
          return null;
        }
        }else{
          return null;}
            
        }))
    

  },[pricefiltered,subjectfiltered,ratingfiltered,subjectUsedInFilter,ratingUsedInFilter,priceUsedInFilter,courses])

  useEffect(()=>{
    const updatePromotion = async () => {
      await axios.patch('/updatePromotion');
  };
  updatePromotion();

  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuery(input);
  };
  const Ratingfilter=async (e)=>{
    const data= await fetchallCourses();
    setRatingFiltered(true);
    setRatingUsedInFilter(e);
    setCourses(data);
    }

    const Subjectfilter=async (e)=>{
      const data= await fetchallCourses();
      setSubjectFiltered(true);
      setSubjectUsedInFilter(e);
      setCourses(data);
      }
  
  const Pricefilter=async(e)=>{
    const data= await fetchallCourses();
    setPriceFiltered(true)
    setPriceUsedInFilter(e);
    setCourses(data);
    }

///////////////////////for setting promotion///////////////////
const [promotion, setPromotion] = useState({
  percent: 0,
  startDate: { varOne: new Date() },
  endDate: { varOne: new Date() },
  admin:true
});
const [showPromoForm, setShowPromoForm] = useState(false);
const [selectAll ,setSelectAll]=useState(false);

    //for choosing
    const startPromotion= async ()=>{
      setPromoFLag(1);
      const allCourses=await fetchallCourses();
      const x= new Array( allCourses.length).fill(false);
      console.log(x);
      const y=allCourses.map((course)=>{return({id:course._id, state:false})})
      setCheckedState(y);
    }
    
      const handleOnChange = (course) => {
        if(course.promotion.valid)
          setAlreadyPromoted(true);
        const id=course._id;
        const updatedCheckedState = checkedState.map((item, index) =>
        item.id === id ? {id:item.id,state:!item.state} :{id:item.id,state:item.state}
      );
      setCheckedState(updatedCheckedState);
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      //console.log(name+"  "+value);
      setPromotion({ ...promotion, [name]: value });
    };
    const addPromo = async (e) => {
      e.preventDefault();
      try {
        const promoCourses=checkedState.map((x)=>{if(x.state)return x.id})
        const response = await axios.post('/addCoursePromo', { 
          ids:promoCourses,//send array of ids to apply promo
          promo: promotion,
        });
  
        if (response) {
          setShowAlert(true);
          setAlertMssg("Added successfully")
          setPromoFLag(false);
          setShowPromoForm(false);
        }
      } catch (err) {
        setShowAlert(true);
        setAlertMssg("Sorry Couldn't add")
      }
  
    };
    const handlePromoForm = () => {
      setShowPromoForm(!showPromoForm);
    };
    const handleAlreadyPromoted = () => {
      setAlreadyPromotedForm(!alreadyPromotedForm);
    };
    

  

/////////////////////////////return////////////////////////////////////////////
    return (
    
    <div className="container">
        <div className=" mx-5">            
          <form onSubmit={handleSubmit} className="wrapper w-50 ">
          <button className="searchButton" type="submit"> <SearchIcon color="disabled"/></button>
              <input
              type="text"
              placeholder="search by subject ,title or instructor... "
              className="search"
              onChange={(e) => {
                  setInput(e.target.value);
              }}
              value={input}
              />
            <button className="clear-icon" onClick={()=>{setQuery(""); setInput("")}} > <ClearIcon color="disabled"/></button>   
            </form>
            <Dropdown onSelect={Subjectfilter} className=" d-inline mx-2">
              <Dropdown.Toggle className="filters" >{subjectUsedInFilter==="none"?"subject" : subjectUsedInFilter}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item  eventKey="none">no filter</Dropdown.Item> {subjects.length>0?subjects.map((subject) => {return (<Dropdown.Item eventKey={subject}>{subject}</Dropdown.Item>)
                        }):"no subjects to show"}
                  </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={Pricefilter} className=" d-inline mx-2 ">
              <Dropdown.Toggle  className="filters">{priceUsedInFilter==="none"? "price" :priceUsedInFilter}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="none">no filter</Dropdown.Item> {allprices.length>0?allprices.map((courseprice) => {return (<Dropdown.Item eventKey={courseprice}>{(courseprice*price).toFixed(0)}</Dropdown.Item>)}):"no subjects to show"}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown  onSelect={Ratingfilter} className=" d-inline mx-2" >
        <Dropdown.Toggle className="filters" >{ratingUsedInFilter==="none"? "Rating" : ratingUsedInFilter+"star"}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="none">no filter</Dropdown.Item> {[1,2,3,4,5].map((rating) => {return (<Dropdown.Item eventKey={rating}>{rating}</Dropdown.Item>)
                })}
          </Dropdown.Menu>
        </Dropdown>
        
        </div>
        <Form>

        <div className="   p-5 ">
            <div className="d-flex">
              <p className="mx-3"> {filteredCourses.length} courses  </p> 
              {promoFlag ? <p className="text-primary ms-auto mx-auto">"Select courses you want to create promotion for or <Link onClick={()=>setPromoFLag(false)}>cancel</Link>"</p>:null}
              {promoFlag?<Button style={{border:"0",background:"transparent",marginLeft:"auto",marginRight:"10px",color:"black"}} onClick={alreadyPromoted?handleAlreadyPromoted: handlePromoForm} > <DoneIcon fontSize="large"/></Button>:
              <Button  className="w-25 ms-auto  " style={{marginRight:"8%"}} variant="primary" onClick={startPromotion}> Add Promotion</Button>
              }
            </div>
            
            <div>
            <div  className="mb-3 row">
                {/* {promoFlag&&
                <div><Form.Check
                inline
                type="checkbox"
                onChange={() => setSelectAll(!selectAll)}
                />select All</div> } */}
                {filteredCourses.length>0? filteredCourses.map((course,index)=>{return(
                  <div className="col-6 " >
                    {promoFlag&&
                    <Form.Check
                    inline
                    id={index}
                    name={course.title}
                    type="checkbox"
                    value={course._id}
                    checked={checkedState[checkedState.findIndex(x => {if (x.id === course._id) {return x.state} return false })]}
                    //el function find index betreturn el indext el betsatisfy el condition el gowa f lama bala2i el course el bel id da ba return el state
                    onChange={() => handleOnChange(course)}
                    />}
                  <Link 
                    to={`/course/${course._id}`} 
                    style={!(checkedState[checkedState.findIndex(x => {if (x.id === course._id) {return x.state} return false})]&&course.promotion.valid)?{ textDecoration: 'none', width:"95%"}:{ textDecoration: 'none', width:"95%",background:"red"}} 
                    className=" d-inline-block p-2 text-decoration-none" style={{width:"85%"}}
                  >

                  <InstructorCourseCard key={course._id} passCourse={course} price={price} currency={currency} index={index}/>
                  </Link>
                  </div>)}):"no courses to show"}
                  
                  </div>
            </div>
          </div>

        </Form>

        <PromoForm
          // id={id}
          showPromoForm={showPromoForm}
          handlePromoForm={handlePromoForm}
          handleChange={handleChange}
          addPromo={addPromo}
        />

        <Modal show={alreadyPromotedForm} onHide={handleAlreadyPromoted} className="justify-content-center">
          <Modal.Body>
            <p>Some Courses you selected already have a promotion</p>
            <p className="text-primary">current promotion will be cancelled and your new promotion will be added</p>
            <p>are you sure you want to continue?</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary"  onClick={()=>{handleAlreadyPromoted();handlePromoForm()}} >yes</Button>
          <Button variant="outline-secondary"  onClick={handleAlreadyPromoted} >cancel</Button>


          </Modal.Footer>
        </Modal>
        




          {/* <div className="   px-5 ">
            <p> {filteredCourses.length} courses  </p> 
            <div className="instructorCourseCards">
                {filteredCourses.length>0? filteredCourses.map((course)=>{return(
                <Link to={`/instructorViewCourse/${course._id}`} style={{ textDecoration: 'none'}}>
                  <InstructorCourseCard key={course._id} passCourse={course} price={price} currency={currency} />
                  </Link>)}):"no courses to show"}
            </div>
          </div> */}

      <AlertModal show={showAlert} hide={()=>{setShowAlert(false)}} message={alertMssg}/>

      </div>
    
  );
}

export default AdminViewCourses;
