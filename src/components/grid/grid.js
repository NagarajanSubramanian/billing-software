import React from "react";
import { drawText, wrapText } from "./canvas";
import NumericInput from "./../numericinput/numericinput";
import TextField from "./../textfield/textfield";
import { withStyles } from "@material-ui/styles";
import "./grid.css";

const styles = (theme) => ({
  input: {
    margin: "1px 0 1px",
    background: "white",
  },
});

var selectCell = "";
var selectHeaderCell = "";
const Grid = React.forwardRef((props, refs) => {
  var ref = React.createRef();
  var editorRef = React.createRef();
  var textRef = React.createRef();
  var numericRef = React.createRef();
  var editable = props.editable ? props.editable : false;
  var columnValue = props.columns;
  //const [selectCell, setSelectCell] = React.useState("1--0");
  //const [selectHeaderCell, setSelectHeaderCell] = React.useState("0--0");
  const defaultHideStyle = {
    zIndex: -3,
    display: "none",
    border: "1px solid #1c63e8",
  };
  const [numericStyle, setNumericStyle] = React.useState(defaultHideStyle);
  const [numericValue, setNumericValue] = React.useState();
  var initialX = 0;
  var initialY = 5;
  var widthList = [];
  var totalList = [];
  var fieldIdMap = {};
  var textPadding = 5;
  var fontFamily =
    "sans-serif, Meiryo, Meiryo UI, Hiragino Kaku Gothic Pro, Helvetica";
  var cxt = "";

  const onClick = function (event) {
    var data = Object.entries(fieldIdMap);
    var returnValue = data.filter((value) => {
      return (
        value[1].left <= event.nativeEvent.offsetX &&
        value[1].left + value[1].width >= event.nativeEvent.offsetX &&
        value[1].top <= event.nativeEvent.offsetY &&
        value[1].top + value[1].height >= event.nativeEvent.offsetY
      );
    });
    var splitData;
    if (returnValue.length > 0) {
      var dataReturn = returnValue[0][0];
      splitData = dataReturn.split("--");
      if (splitData[0] !== "0") {
        selectCell = dataReturn;
        selectHeaderCell = "0--" + splitData[1];
      }
    }
    drawGrid();
  };

  const showEditor = function (refs, selectedCell, value) {
    var rect = ref.current.getBoundingClientRect();
    var left = rect.left;
    var top = rect.top;
    var element = refs.current;
    var parentElement = element.parentElement.parentElement;
    parentElement.style.zIndex = 3;
    parentElement.style.position = "absolute";
    parentElement.style.top = parseInt(top + selectedCell.top) - 1 + "px";
    parentElement.style.left = parseInt(left + selectedCell.left) + "px";
    element.style.width = parseInt(selectedCell.width - 2 - 12) + "px";
    element.style.borderRadius = "0px";
    parentElement.style.height = parseInt(selectedCell.height + 1) + "px";
    parentElement.style.display = "block";
    refs.current.focus();
    if (value) {
      refs.current.value = value;
    } else {
      refs.current.value = "";
    }
  };

  const hideEditor = function () {
    document.getElementById("numeric-editor").style.display = "none";
    document.getElementById("text-editor").style.display = "none";
  };

  const onDoubleClick = function (event) {
    var data = Object.entries(fieldIdMap);
    var returnValue = data.filter((value) => {
      return (
        value[1].left <= event.nativeEvent.offsetX &&
        value[1].left + value[1].width >= event.nativeEvent.offsetX &&
        value[1].top <= event.nativeEvent.offsetY &&
        value[1].top + value[1].height >= event.nativeEvent.offsetY
      );
    });
    var splitData;
    if (returnValue.length > 0) {
      var dataReturn = returnValue[0][0];
      splitData = dataReturn.split("--");

      var column = parseInt(splitData[1]);
      var columnDetail = columnValue[column];
      hideEditor();
      if (
        columnDetail &&
        parseInt(splitData[0]) > 0 &&
        editable &&
        columnDetail.editable
      ) {
        var dataValue = props.data
          ? props.data[parseInt(splitData[0]) - 1][columnDetail.field]
          : "";
        var selectedCell = fieldIdMap[dataReturn];
        if (columnDetail.type === "number") {
          showEditor(numericRef, selectedCell, dataValue);
        } else {
          showEditor(textRef, selectedCell, dataValue);
        }
      }
      if (splitData[0] !== "0") {
        selectCell = dataReturn;
        selectHeaderCell = "0--" + splitData[1];
      }
    }
    drawGrid();
    console.log("double click");
  };

  const onFocus = function () {
    if (!selectHeaderCell) {
      selectCell = "1--0";
      selectHeaderCell = "0--0";
    }
    console.log("on focus");
  };

  React.useEffect(() => {
    ref.current.focus();
    drawGrid();
  });

  function drawGrid(headervalue) {
    var canvas = ref.current;
    cxt = canvas.getContext("2d");

    if (props.columns) {
      var parentDiv = ref.current.parentElement.getBoundingClientRect();
      var parentWidth = parseInt(parentDiv.width);
      var parentHeight = parseInt(parentDiv.height);
      var headerHeight = props.headerHeight ? props.headerHeight : 40;
      var rowHeight = props.rowHeight ? props.rowHeight : 35;
      var startX = initialX;
      var startY = initialY;
      var lineList = [];
      ref.current.width = parentWidth;
      ref.current.height = parentHeight;
      cxt.clearRect(0, 0, ref.current.width, ref.current.height);
      cxt.beginPath();
      cxt.fillStyle = "#EAEAEA";
      columnValue.forEach((data, index) => {
        var totalWidth = 0;
        if (data.width.indexOf("%") >= 0) {
          totalWidth = parseInt(data.width.replace("%", ""));
          totalWidth = parentWidth * (totalWidth / 100);
        } else if (data.width.indexOf("px") >= 0) {
          totalWidth = parseInt(data.width.replace("px", ""));
        } else {
        }
        fieldIdMap["0--" + index] = {
          top: startY,
          left: startX,
          width: totalWidth,
          height: headerHeight,
          id: "0--" + data["field"],
        };
        if (selectHeaderCell && "0--" + index === selectHeaderCell) {
          cxt.fillStyle = "#dbd9d9";
        } else {
          cxt.fillStyle = "#EAEAEA";
        }
        cxt.fillRect(startX, 5, totalWidth, headerHeight);
        var font = "";
        if (data.headerBold) {
          font = font + "bold ";
        }
        if (data.headerItalic) {
          font = font + "italic ";
        }
        font =
          font + (data.fontSize ? data.fontSize + " " : "14px ") + fontFamily;
        cxt.font = font;
        var content = wrapText(cxt, data.headerName, totalWidth);
        drawText(
          cxt,
          content,
          startX,
          startY,
          startX + totalWidth,
          startY + headerHeight,
          false,
          cxt.font,
          "#000000",
          data.headerHorizontalAlign ? data.headerHorizontalAlign : "center",
          data.headerVerticalAlign ? data.headerVerticalAlign : "middle"
        );
        var lineMap = {};
        lineMap = {
          from: { x: startX, y: initialY },
          to: { x: startX, y: headerHeight + initialY },
        };
        lineList.push(lineMap);
        //cxt.fillText;
        startX = parseInt(startX + totalWidth);
      });
      var lineMap = {};
      lineMap = {
        from: { x: initialX, y: initialY },
        to: { x: startX, y: initialY },
      };
      lineList.push(lineMap);
      lineMap = {};
      lineMap = {
        from: { x: initialX, y: headerHeight + initialY },
        to: { x: startX, y: headerHeight + initialY },
      };
      lineList.push(lineMap);
      if (props.data) {
        var startY = headerHeight + 5;
        cxt.fillStyle = "#FFFFFF";
        props.data.map((value, index) => {
          startX = initialX;
          columnValue.map((column, indexVal) => {
            var filedData = fieldIdMap["0--" + indexVal];
            cxt.fillRect(startX, startY, filedData["width"], rowHeight);
            var font =
              (column.fontSize ? column.fontSize + " " : "14px ") + fontFamily;

            var content = wrapText(
              cxt,
              value[column["field"]],
              filedData["width"] - 2 * textPadding
            );
            cxt.font = font;
            drawText(
              cxt,
              content,
              startX,
              startY,
              startX + filedData["width"],
              startY + rowHeight,
              false,
              cxt.font,
              "#000000",
              column.horizontalAlign ? column.horizontalAlign : "left",
              column.verticalAlign ? column.verticalAlign : "middle"
            );
            lineMap = {};
            lineMap = {
              from: { x: startX, y: startY },
              to: { x: startX, y: rowHeight + startY },
            };
            lineList.push(lineMap);
            fieldIdMap[index + 1 + "--" + indexVal] = {
              top: startY,
              left: startX,
              width: filedData["width"],
              height: rowHeight,
              id: index + 1 + "--" + column["field"],
            };
            startX = startX + filedData["width"];
          });
          lineMap = {};
          lineMap = {
            from: { x: initialX, y: rowHeight + startY },
            to: { x: startX, y: rowHeight + startY },
          };
          lineList.push(lineMap);
          startY = startY + rowHeight;
        });
        cxt.strokeStyle = "#7f8282";
        cxt.lineWidth = 0.25;
        lineList.map((data) => {
          cxt.moveTo(data.from.x, data.from.y);
          cxt.lineTo(data.to.x, data.to.y);
        });
        cxt.stroke();
        setCurrentSelectCell();
      }
    }
  }

  const onKeyDown = function (event) {
    var data = Object.entries(fieldIdMap);
    var count = 0;
    data.forEach((value) => {
      if (value[0].indexOf("0--") >= 0) {
        count++;
      }
    });
    console.log(event.which);
    if (event.which === 13) {
      if (props.enterToNextCell) {
        event.which = 39;
      } else {
        event.which = 40;
      }
    }
    var getCell = selectCell;
    var splitData = getCell.split("--");
    if (
      event.which === 37 ||
      (event.which === 9 && event.nativeEvent.shiftKey)
    ) {
      //left
      if (getCell !== "1--0") {
        event.preventDefault();
        if (parseInt(splitData[1]) === 0) {
          selectCell = parseInt(splitData[0]) - 1 + "--" + (count - 1);
          selectHeaderCell = "0--" + (count - 1);
        } else {
          selectCell = splitData[0] + "--" + (parseInt(splitData[1]) - 1);
          selectHeaderCell = "0--" + (parseInt(splitData[1]) - 1);
        }
      } else {
        if (event.which === 9 && event.nativeEvent.shiftKey) {
          selectCell = "";
          selectHeaderCell = "";
        }
      }
    } else if (event.which === 38) {
      if (getCell.indexOf("1--") < 0) {
        selectCell = parseInt(splitData[0]) - 1 + "--" + splitData[1];
      }
    } else if (event.which === 39 || event.which === 9 || event.which === 13) {
      if (selectCell) {
        if (parseInt(splitData[1]) === count - 1) {
          if (fieldIdMap[parseInt(splitData[0]) + 1 + "--0"]) {
            event.preventDefault();
            selectCell = parseInt(splitData[0]) + 1 + "--0";
            selectHeaderCell = "0--0";
          } else {
            if (event.which === 9) {
              selectCell = "";
              selectHeaderCell = "";
            }
          }
        } else {
          event.preventDefault();
          selectCell = splitData[0] + "--" + (parseInt(splitData[1]) + 1);
          selectHeaderCell = "0--" + (parseInt(splitData[1]) + 1);
        }
      } else {
        event.preventDefault();
        selectCell = "0--0";
        selectHeaderCell = "1--0";
      }
    } else if (event.which === 40) {
      var cellValue = parseInt(splitData[0]) + 1 + "--" + splitData[1];
      if (fieldIdMap[cellValue]) {
        selectCell = parseInt(splitData[0]) + 1 + "--" + splitData[1];
      }
    } else if (event.which === 113) {
      event.preventDefault();
      if (selectHeaderCell) {
        var column = parseInt(selectHeaderCell.split("--")[1]);
        var columnDetail = columnValue[column];
        var a = numericRef;
        if (
          columnDetail &&
          parseInt(splitData[0]) > 0 &&
          editable &&
          columnDetail.editable
        ) {
          var selectedCell = fieldIdMap[selectCell];
          var dataValue = props.data
            ? props.data[parseInt(splitData[0]) - 1][columnDetail.field]
            : "";
          if (columnDetail.type === "number") {
            showEditor(numericRef, selectedCell, dataValue);
          } else {
            showEditor(textRef, selectedCell, dataValue);
          }
        }
      }
    } else if (
      (event.which >= 65 && event.which <= 90) ||
      (event.which >= 48 && event.which <= 57) ||
      (event.which >= 96 && event.which <= 105)
    ) {
      if (selectHeaderCell) {
        var column = parseInt(selectHeaderCell.split("--")[1]);
        var columnDetail = columnValue[column];
        var a = numericRef;
        if (
          columnDetail &&
          parseInt(splitData[0]) > 0 &&
          editable &&
          columnDetail.editable
        ) {
          var selectedCell = fieldIdMap[selectCell];
          var value = String.fromCharCode(event.which);
          if (columnDetail.type === "number") {
            value = !isNaN(value) ? value : "";
            showEditor(numericRef, selectedCell, "");
          } else {
            showEditor(textRef, selectedCell, "");
          }
        }
      }
    }
    drawGrid();
  };

  const onFocusOut = function () {
    //setNumericStyle(defaultHideStyle);
    hideEditor();
    //element.style.display = "none";
  };

  const setCurrentSelectCell = function () {
    if (selectCell && selectCell.split("--")[0] !== "0") {
      cxt.lineWidth = 1;
      if (
        editable &&
        selectHeaderCell &&
        columnValue[parseInt(selectHeaderCell.split("--")[1])].editable
      ) {
        cxt.strokeStyle = "#1c63e8";
      } else {
        cxt.strokeStyle = "#7f8282";
      }
      var dataVal = fieldIdMap[selectCell];
      cxt.strokeRect(dataVal.left, dataVal.top, dataVal.width, dataVal.height);
    }
  };

  const onFocusIn = function () {
    textRef.current.classList.add("input_editor_focus");
    numericRef.current.classList.add("input_editor_focus");
  };

  const onTotalKeyDown = function (event, refs) {
    console.log(event.which);
    var column = parseInt(selectHeaderCell.split("--")[1]);
    var columnField = columnValue[column].field;
    var splitData = selectCell.split("--");
    var rownumber = parseInt(splitData[0]) - 1;
    if (
      event.which === 9 ||
      (event.which === 9 && event.nativeEvent.shiftKey) ||
      event.which === 13
    ) {
      props.data[rownumber][columnField] = refs.current.value;
      ref.current.focus();
      hideEditor();
      onKeyDown(event);
    } else if (event.which === 27) {
      hideEditor();
      ref.current.focus();
    }
  };

  const onInputKeyDown = function (event) {
    onTotalKeyDown(event, numericRef);
  };
  const onTextInputKeyDown = function (event) {
    onTotalKeyDown(event, textRef);
  };
  const { classes } = props;
  return (
    <div style={{ width: props.width, height: props.height, margin: "0 auto" }}>
      <canvas
        onFocus={onFocus}
        ref={ref}
        tabIndex={1}
        autoFocus
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        style={{ outline: "none" }}
      />
      <div ref={editorRef}>
        <NumericInput
          autoFocus
          id="numeric-editor"
          ref={numericRef}
          style={{ display: "none" }}
          commaSeparate={true}
          onFocusOut={onFocusOut}
          onFocus={onFocusIn}
          onkeydown={onInputKeyDown}
          precision={2}
        />

        <TextField
          autoFocus
          id="text-editor"
          ref={textRef}
          style={{ display: "none" }}
          commaSeparate={true}
          onFocusOut={onFocusOut}
          precision={2}
          onFocus={onFocusIn}
          onKeyDown={onTextInputKeyDown}
        />
      </div>
    </div>
  );
});
export default withStyles(styles)(Grid);
