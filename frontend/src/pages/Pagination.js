
import axios from "axios";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import CourseCard from "../components/CourseCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";



function Pagination(props) {
  const {user}=useAuthContext();
  const items=props.items;
  const [itemOffset, setItemOffset] = useState(0);


  const itemsPerPage=12;
  const endOffset = itemOffset + itemsPerPage;

 // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
 // console.log(items.length+"      "  +itemsPerPage)
  const pageCount = Math.ceil(items.length / itemsPerPage);
  //console.log(items+"      "+pageCount);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
       <div className="row">
            {currentItems.length > 0? currentItems.map((course,index) => {return(
                <Link key={index} to={`/course/${course._id}`} style={{ textDecoration: 'none'}} className=" col-lg-3 col-md-6 col-xs-12 p-2" >
                  <CourseCard key={course._id} passCourse={course} price={props.price} cur={props.currency} index={index}/></Link>
                );})
              : "no Items to show"}
           </div>
           <div className=" m-3 d-flex justify-content-center">
           <ReactPaginate
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </>
  );
}
export default Pagination;



