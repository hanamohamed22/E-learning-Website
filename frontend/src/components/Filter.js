import Dropdown from 'react-bootstrap/Dropdown';

function Filter (props) {
    const call=props.call;
    const list = props.list;
    

    return(
        <div className="col md-1">
          <label>Filter By Subject: </label><select name="subject " onChange={call}><option value="none">no filter</option> {list.length>0?list.map((item) => {return (<option value={item}>{item}</option>)
          }):"no subjects to show"}</select></div>

    )
}

export default Filter