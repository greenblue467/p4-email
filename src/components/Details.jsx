import React from "react";

const Details = props => {
  return (
    <div>
      <div className="back" onClick={props.back}>
        &larr;&nbsp; 返回
      </div>
      <span className="mail">
        <li onClick={props.past}>＜&emsp;</li>
        <li onClick={props.forward}>&emsp;＞</li>
      </span>
      <div className="detailStyle">{props.article}</div>
    </div>
  );
};
export default Details;
