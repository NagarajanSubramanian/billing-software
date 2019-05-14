import React from 'react';
import './dialog.css';

const dataInput = React.forwardRef((props,ref) => {


    const dialogData = (props.dialogShow ? ' ' : 'hide ') + 'newDataDialog';
    const backDrop = (props.dialogShow ? ' ' : 'hide ') + 'backDrop';

    return(
            <React.Fragment>
                <div className={backDrop}></div>
                <div className={dialogData}>
                    <div className="initialCloseButton">
                    <label className='customerHeaderDiv'>Customer Details</label>
                    <label className="closeButton" onClick={()=>props.onCancelClick()}>X</label>
                  </div>
                  <div className='dialogBody'>
                  <div className="empIdDiv align">
                    <label className="" >Name</label>
                    <input autofocus='true' ref={ref.customerName}></input>
                  </div>
                  <div className="empNameDiv align">
                    <label className="">Address</label>
                    <textarea ref={ref.customerAddress}></textarea>
                  </div>
                  <div className="seatNoDiv align">
                    <label className="">Mobile No</label>
                    <input ref={ref.customerEmail} type='number' maxLength='10'></input>
                  </div>
                  <div className="llNameDiv align">
                    <label className="">Email</label>
                    <input ref={ref.customerMobile}></input>
                  </div>
                  </div>
                  <div className='dialogFooter'>
                    <button onClick={()=>onSaveClick(props, ref)}>Save</button>
                    <button onClick={()=>props.onCancelClick()}>Cancel</button>
                  </div>
            </div>
        </React.Fragment>
    );
});

function onSaveClick(props, ref){
  //const ref = props.innerRef;

  const customerName = ref.customerName.current.value;
    const customerAddress = ref.customerAddress.current.value;
    const email = ref.customerEmail.current.value;
    const mobile = ref.customerMobile.current.value;
    const formMap = {name: customerName, address: customerAddress, 
      email: email, mobile: mobile};
  props.onSaveClick(formMap);
}
export default dataInput;