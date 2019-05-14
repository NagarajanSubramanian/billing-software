import React from 'react';
import './toastr.css';

const toastrData = (props) => {
    let toastData = !props.toastShow ? 'hide snackBar' : 'snackBar';
    return (
      <div id="toastId" className={toastData} style={{backgroundColor:props.toastColor}}>
        <label className="dataset">{props.toastData}</label>
        <label className="closeLabel" onClick={() => props.onClick()}>X</label>
      </div>
    );
};

export default toastrData;