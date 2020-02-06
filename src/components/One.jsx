import React from "react";

const One = props => {
  return (
    <div className="mailbox">
      <div>
        <span>收件人：</span>
        {props.sentBox.email}
      </div>
      <div>
        <span>主旨：</span>
        {props.sentBox.title}
      </div>
      <div className="textArea">{props.sentBox.content}</div>
    </div>
  );
};
export default One;
