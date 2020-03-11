import React from "react";
import "./emptyData.css";
import SearchIcon from "@material-ui/icons/Search";

const EmptyData = props => {
  const emptyDataClass = props.emptyDataShow ? "emptyDataClass" : "hide ";
  return (
    <div className={emptyDataClass}>
      <div className="emptyDataCircle">
        <div className="circleDiv">
          <SearchIcon
            style={{
              position: "relative",
              top: "20%",
              fontSize: "61px",
              color: "grey"
            }}
          />
        </div>
        <label className="emptyDataHeader">{props.emptyDataHeader}</label>
        <label className="emptyDataDescription">
          {props.emptyDataDescription}
        </label>
      </div>
    </div>
  );
};

export default EmptyData;
