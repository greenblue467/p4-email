import React, { Component } from "react";
import One from "./One";

const Sent = props => {
  return (
    <div className="outbox">
      {props.sentBox.map(x => (
        <One key={x.id} sentBox={x} />
      ))}
    </div>
  );
};
export default Sent;
