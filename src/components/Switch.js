import React from 'react';

const Switch = (props) => (
  <div className="switch-container">
    <span>{props.label}</span>
    <label>
      <input className="switch" type="checkbox"/>
      <div className="switch-btn" onClick={props.onClick}></div>
    </label>
  </div>
);

export default Switch;