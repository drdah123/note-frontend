import React from "react";

const Alert = (props) => (
  <div className="alert-container">
    <ul>
      {props.validationMassages.map((massage, index) => (
        <li key={index}>{massage}</li>
      ))}
    </ul>
  </div>
);

export default Alert;
