import React from 'react';
import Dialog from './../../components/dialog/dialog';

const customerdetails = React.forwardRef((props, ref) => {
    return (
      <React.Fragment>
         <Dialog ref={ref} dialogShow={props.dialogShow} 
            onCancelClick={() => props.onCancelClick()} onSaveClick={(data)=>props.onSaveClick(data)}></Dialog> 
      </React.Fragment>  
    );
});

export default customerdetails;