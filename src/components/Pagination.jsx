import React from "react";

const Pagination = props => {
  const page = [];
  for (let i = 1; i <= props.numberOfPages; i++) {
    const active = {
      color: props.currentPage == i && "rgb(21, 186, 245)",
      fontWeight: props.currentPage == i && "bold",
      borderBottom: props.currentPage == i && "0.3rem solid rgb(21, 186, 245)"
    };
    page.push(
      <li key={i} style={active} onClick={() => props.changePage(i)}>
        {i}
      </li>
    );
  }
  return (
    <ul className="pageStyle">
      {props.currentPage > 1 && <li onClick={props.prev}>＜</li>}
      {page}
      {props.currentPage < props.numberOfPages && (
        <li onClick={props.next}>＞</li>
      )}
    </ul>
  );
};
export default Pagination;
