import React from "react";
import FormDialog from "../../components/dialog/dialog";
import Fab from "./../../components/fab/Fab";
import TextField from "@material-ui/core/TextField";
import Snackbar from './../../components/snackbar/snackbar';
import Table from './../../components/table/table';

const customerdetails = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [snackopen, setSnackOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [snackType, setSnackType] = React.useState('success');
  const [gridData, setGridData] = React.useState([]);
  const idRef = React.createRef();
  const nameRef = React.createRef();
  const addressRef = React.createRef();
  const phoneNoRef = React.createRef();
  const emailRef = React.createRef();

  const onAddClick = () => {
    setOpen(true);
  };

  const onCancelClick = () => {
    setOpen(false);
  };

  const onKeyPress = event => {
    if (event.target.id === 'mobile') {
      if (phoneNoRef.current.value && phoneNoRef.current.value.length >= 10) {
        event.preventDefault();
      }
    }
  };

  const onSaveClick = () => {
    if(idRef.current.value && nameRef.current.value && addressRef.current.value && 
      phoneNoRef.current.value && emailRef.current.value){
      if(validateCustomerId(idRef.current.value)){
        setMessage('Customer Id already exists.');
        setSnackType('error');
      } else if(phoneNoRef.current.value.length < 10){
        setMessage('Enter proper mobile no.');
        setSnackType('error');
      } else if(!validateEmail(emailRef.current.value)){
        setMessage('Enter proper email address.');
        setSnackType('error');
      } else {
        setMessage('Customer Details saved successfully.');
        setSnackType('success');
        setOpen(false);
        gridData.push({
          id: idRef.current.value,
          name: nameRef.current.value,
          address: addressRef.current.value,
          phoneNo: phoneNoRef.current.value,
          email: emailRef.current.value
        });
        setGridData(gridData);
      }
    } else {
      setMessage('Enter all fields.');
      setSnackType('error')
    }
    setSnackOpen(true);
  }

  const handleClose = () => {
    setSnackOpen(false);
  }

  const validateCustomerId = (id) => {
    var existFlag = false;
    gridData.forEach(function(data){
      existFlag = data.id === id ? true : existFlag;
    });
    return existFlag;
  }
  
  const validateEmail = (email) => {
    var emailCheck = 
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailCheck.test(String(email).toLowerCase());
  }

  return (
    <React.Fragment>
      <Table header={['Id', 'Name', 'Address', 'Phone No', 'Email']} data={gridData}/>
      <Fab id="customermaster-add" onClick={onAddClick} />
      <FormDialog
        open={open}
        onCancelClick={() => onCancelClick()}
        onSaveClick={data => onSaveClick(data)}
        dialogTitle='Add New Customer'
      >
        <TextField
          autoFocus
          margin="dense"
          id="id"
          label="Customer Id"
          type="text"
          inputRef={idRef}
          fullWidth
        />

        <TextField
          margin="dense"
          id="name"
          label="Customer Name"
          type="text"
          inputRef={nameRef}
          fullWidth
        />
        <TextField
          margin="normal"
          id="address"
          multiline
          rowsMax="4"
          label="Customer Address"
          inputRef={addressRef}
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="mobile"
          label="Mobile No."
          inputRef={phoneNoRef}
          type="number"
          onKeyPress={onKeyPress}
          fullWidth
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          inputRef={emailRef}
          fullWidth
        />
      </FormDialog>
      <Snackbar open={snackopen} type={snackType} message={message} handleClose={() => handleClose()}/>
    </React.Fragment>
  );
});

export default customerdetails;
