import React from "react";
import ReactDOM from "react-dom";

import DataGrid from "react-data-grid";
import MasterInput from "./../../components/masterinput/masterinput";
import NumericInput from "./../../components/numericinput/numericinput";
import "react-data-grid/dist/react-data-grid.css";
import "./billing.css";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  input: {
    border: "2px solid #1172ab",
    margin: "1px 0 1px",
    background: "white",
  },
});

class NumberFormat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  getValue() {
    var key = this.props.column.key;
    var returnMap = {};
    returnMap[key] = this.ref.current.value;
    return returnMap;
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this);
  }

  onFocusOut = (event) => {
    var key = this.props.column.key;
    var returnMap = {};
    returnMap[key] = this.ref.current.value;
    this.setState(returnMap, () => this.props.onCommit());
  };
  render() {
    const { classes } = this.props;
    return (
      <NumericInput
        ref={this.ref}
        defaultValue={
          this.props.row[this.props.column.key]
            ? this.props.row[this.props.column.key]
            : ""
        }
        autoFocus
        commaSeparate={this.props.column.commaSeparate}
        precision={
          this.props.column.precision ? this.props.column.precision : ""
        }
        maxLength={
          this.props.column.maxLength ? this.props.column.maxLength : ""
        }
        onFocusOut={this.onFocusOut}
        InputProps={{
          className: classes.input,
        }}
      />
    );
  }
}

const NumberField = withStyles(styles)(NumberFormat);

class MasterInputEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productName: "" };
    this.catagoryref = React.createRef();
  }

  getValue() {
    console.log(ReactDOM.findDOMNode(this).getAttribute("keyid"));
    return {
      productId: this.catagoryref.current.getAttribute("keyid"),
      productName: this.catagoryref.current.getAttribute("keyvalue"),
    };
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
  }

  handleChangeComplete = (event) => {
    this.setState({ productName: event.target.value });
  };
  handleFocusout = (event) => {
    this.setState(
      {
        productId: this.catagoryref.current.getAttribute("keyid"),
        productName: this.catagoryref.current.getAttribute("keyvalue"),
      },
      () => this.props.onCommit()
    );
  };

  onComplete = (event) => {
    console.log(ReactDOM.findDOMNode(this).getAttribute("keyid"));
    this.setState(
      {
        productId: this.catagoryref.current.getAttribute("keyid"),
        productName: this.catagoryref.current.getAttribute("keyvalue"),
      },
      () => this.props.onCommit()
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <MasterInput
        id="catagory-master-input"
        ref={this.catagoryref}
        autoFocus
        parentId="body"
        keyId={this.props.row.productId ? this.props.row.productId : ""}
        keyName={this.props.row.productName ? this.props.row.productName : ""}
        defaultValue={
          this.props.row.productName ? this.props.row.productName : ""
        }
        style={{ width: "100%", background: "white" }}
        masterId="product_name_master"
        onComplete={this.onComplete}
        InputProps={{
          className: classes.input,
        }}
      />
    );
  }
}

const MasterField = withStyles(styles)(MasterInputEditor);

const columns = [
  { key: "id", name: "No", width: "5%" },
  {
    key: "productName",
    name: "Product Name",
    value: "number",
    width: "30%",
    editor: MasterField,
  },
  {
    key: "productMrp",
    name: "Product Rate",
    width: "10%",
    editable: true,
    commaSeparate: true,
    precision: 2,
    editor: NumberField,
  },
  {
    key: "quantity",
    name: "Product Quantity",
    width: "10%",
    editable: true,
    commaSeparate: false,
    maxLength: 5,
    editor: NumberField,
  },
  {
    key: "productOffer",
    name: "Discount in %",
    width: "10%",
    editable: true,
    commaSeparate: true,
    precision: 1,
    editor: NumberField,
  },
  {
    key: "totalPrice",
    name: "Total Price",
    width: "10%",
  },
];

const rows = [{ id: 1 }];

class BillingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: rows };
  }
  onDoubleClick = (event) => {
    console.log(event);
  };
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    var dataMap = {};
    this.props.productData.map((data) => {
      dataMap[data["productCode"]] = data;
    });
    console.log(dataMap);
    this.setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        if (rows[i].productName || updated.productName) {
          rows[i] = { ...rows[i], ...updated };
          var dataValue = rows[i];
          var totalValue = dataMap[dataValue["productId"]];
          if (updated["productName"]) {
            rows[i] = { ...rows[i], ...totalValue };
            console.log(totalValue);
          }
          if (rows[i].productId && rows[i].productMrp && rows[i].quantity) {
            var total =
              parseFloat(rows[i].productMrp) * parseFloat(rows[i].quantity);
            if (rows[i].productOffer) {
              var offerTotal = total * (parseFloat(rows[i].productOffer) / 100);
              total = total - offerTotal;
            }

            rows[i]["totalPrice"] = parseFloat(
              parseFloat(total).toFixed(2)
            ).toLocaleString("en-IN");

            if (rows[i]["totalPrice"].indexOf(".") < 0) {
              rows[i]["totalPrice"] = rows[i]["totalPrice"] + ".0";
            }
          }
          if (rows[i].productName) {
            if (!rows[i].productMrp || !rows[i].quantity) {
              rows[i]["totalPrice"] = "0.0";
            }
          }
        }
      }
      return { rows };
    });
  };
  handleKeyDown = (event) => {
    console.log("key down");
    console.log(event);
  };
  render() {
    return (
      <DataGrid
        columns={columns}
        rows={this.state.rows}
        rowGetter={(i) => this.state.rows[i]}
        rowsCount={this.state.rows.length}
        onRowsUpdate={this.onGridRowsUpdated}
        enableCellSelect={true}
        onRowClick={this.handleKeyDown}
        rowKey="productId"
        onDoubleClick={this.onDoubleClick}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productData: state.loadProduct,
  };
};

export default connect(mapStateToProps)(BillingTable);
