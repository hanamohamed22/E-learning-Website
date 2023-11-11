import { useAuthContext } from "../hooks/useAuthContext";


const Instructor = (props) => {

const {user}=useAuthContext();
    useEffect(() => {
        getSubjects();
        getPrices();
        const fetchCourses = async () => {
        const response = await axios.get(
            `/instructorCourses/?id=${user.user._id}&q=${query}`
        );
        if (response) {
            setFilteredCourses(response.data);
            setCourses(response.data); //awl ma yebda2 dol el hyb2o displayed
        }
        };
        const viewInstructor = async () => {
        const response = await axios.get(`/viewInstructor/?id=${user.user._id}`);
        if (response) {
            //console.log(response);
            setMyInstructor(response.data.instructor);
            setReviews(response.data.instructor.reviews);

            //awl ma yebda2 dol el hyb2o displayed
        }
        };

        if (user){
        fetchCourses();
        viewInstructor();
        }
    }, [query,price,user]);


return(
    <div>
        <h1>HEY INSTOOO</h1>
    </div>
)}
