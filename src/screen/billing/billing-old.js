import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import update from "immutability-helper";
import { Editors, Formatters } from "react-data-grid-addons";
import "react-data-grid/dist/react-data-grid.css";

const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;
const productNames = [
  {
    id: 0,
    title: "productName1"
  },
  {
    id: 1,
    title: "productName2"
  }
];
const productNamesEditor = <AutoCompleteEditor options={productNames} />;
const columns = [
  {
    key: "id",
    name: "ID"
  },
  {
    key: "product_name",
    name: "Product Name",
    editable: true,
    editor: productNamesEditor
  },
  {
    key: "product_qty",
    name: "Product Qty",
    editable: true
  },
  {
    key: "product_rate",
    name: "Product Rate",
    editable: true
  },
  {
    key: "product_disc",
    name: "Product Disc",
    editable: true
  }
];
const rows = [
  { id: 0, product_name: "Example" },
  { id: 1, product_name: "Demo" }
];
class BillingTable extends Component {
  constructor(props) {
    super(props);
    this._columns = columns;
    console.log(this._columns);
    //this.state = { rows: this.props.lineItems.rows };
  }

  rowGetter = i => {
    return this.state.rows[i];
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    console.log(fromRow);
    console.log(updated);
    // calling slice() without arguments makes a copy of array
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
      this.setState({ rows });
      this.props.onGridRowsUpdated(rows);
    }
  };
  render() {
    return (
      <ReactDataGrid
        ref={node => (this.grid = node)}
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rows={rows}
        rowsCount={4}
        maxHeight={300}
        onGridRowsUpdated={this.handleGridRowsUpdated}
      />
    );
  }
}

export default BillingTable;
