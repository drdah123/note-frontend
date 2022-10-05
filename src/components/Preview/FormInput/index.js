import React from 'react';

const index = ({ onChange, placeholder, id, type, lable }) => {
  return (
    <div className="form-control">
      <label>{lable}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};
export default index;
