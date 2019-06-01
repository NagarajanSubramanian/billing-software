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
    if(nameRef.current.value && addressRef.current.value && phoneNoRef.current.value && emailRef.current.value){
      setMessage('Customer Details saved successfully.');
      setSnackType('success');
      setOpen(false);
      gridData.push({
        name: nameRef.current.value,
        address: addressRef.current.value,
        phoneNo: phoneNoRef.current.value,
        email: emailRef.current.value
      });
      setGridData(gridData);
    } else {
      setMessage('Enter all fields.');
      setSnackType('error')
    }
    setSnackOpen(true);
  }

  const handleClose = () => {
    setSnackOpen(false);
  }

  return (
    <React.Fragment>
      <Table header={['Name', 'Address', 'Phone No', 'Email']} data={gridData}/>
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
