import React, { Component } from "react";

const Nav = props => {
  const popAdd = {
    display: props.pop && "block"
  };
  const popAdd2 = {
    display: props.pop2 && "block"
  };
  return (
    <React.Fragment>
      <div className="shield" style={popAdd} onClick={props.close}></div>
      <h1 className="text">Email</h1>
      <div className="newmail" onClick={props.add}>
        +&ensp;撰寫新郵件
      </div>
      <div className="pop" style={popAdd}>
        <div onClick={props.close} className="close">
          X
        </div>
        <form onSubmit={props.send}>
          <div>
            <span>收件者：</span>
            <input
              type="email"
              value={props.cont1}
              onChange={props.change1}
              required
            />
          </div>
          <div>
            <span>主旨：</span>{" "}
            <input type="text" value={props.cont0} onChange={props.change0} />
          </div>
          <div>
            <textarea value={props.cont} onChange={props.change} />
          </div>

          <input type="submit" className="btn" value="送出" />
        </form>
      </div>
      <div style={popAdd2} className="pop2">
        <div>是否放棄編輯？</div>
        <button onClick={props.cancel}>取消</button>
        <button onClick={props.sure}>確定</button>
      </div>
    </React.Fragment>
  );
};
export default Nav;
