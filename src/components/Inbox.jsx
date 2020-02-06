import React from "react";
import Mail from "./Mail";

const Inbox = props => {
  return (
    <div>
      <div className="readStyle" onClick={props.read}>
        全部已讀
      </div>
      <div className="pageNum">
        {props.first + 1} - {props.last} of {props.total}
      </div>

      <div className="mailStyle">
        {props.mail.map(x => (
          <Mail key={x.id} mail={x} open={() => props.open(x.id)} />
        ))}
      </div>
    </div>
  );
};
export default Inbox;
