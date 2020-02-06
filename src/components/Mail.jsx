import React from "react";

const Mail = props => {
  const unreadStyle = {
    fontWeight: props.mail.unread && "bold"
  };
  return (
    <div
      className="oneMail"
      style={unreadStyle}
      onClick={() => props.open(props.mail.id)}
    >
      {props.mail.name}
    </div>
  );
};
export default Mail;
