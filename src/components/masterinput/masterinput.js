import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ListData from "./../list/list";
import Typography from "@material-ui/core/Typography";
import Icon from "./../icons/icons";
import { BACKEND_URL } from "./../../constants/constants";

const MasterInput = React.forwardRef((props, ref) => {
  var renderId = props.id + "-render";
  var [selectedIndex, setSelectIndex] = React.useState(-1);
  var [selectedId, setSelectedId] = React.useState("");
  var [defaultValue, setDefaultValue] = React.useState("");
  var [currentPage, setCurrentPage] = React.useState(1);
  var [totalPage, setTotalPage] = React.useState(2);
  var inputRef = React.createRef();
  var mainRef = ref;
  var onClickFlag = true;
  var [menuData, setMenuData] = React.useState([]);

  useOutsideAlerter();

  function setBold(value) {
    var searchData = inputRef.current.value.split(" ").join("|");

    var regex = new RegExp("(?:\\b" + searchData + ")", "gi");
    /**
    var totalList = value.match(regex);
    if (totalList) {
      totalList.map(val => {
        value = value.replace(val, "<mark>" + val + "</mark>");
      });
      return value;
    } else {
      return value;
    }
  */
    var lastIndex = 0;
    var totalRegex = 0;
    var dataContent = [];
    var regexResult;
    while ((regexResult = regex.exec(value))) {
      totalRegex++;
      dataContent.push(value.substring(lastIndex, regexResult.index));
      dataContent.push(value.substring(regexResult.index, regex.lastIndex));
      lastIndex = regex.lastIndex;
    }
    dataContent.push(value.substring(lastIndex));

    var returnResult = "";
    var i;
    if (dataContent.length > 1) {
      for (var index = 0; index < totalRegex; index++) {
        i = index * 2;
        returnResult = returnResult + dataContent[i];
        returnResult = returnResult + "<b>" + dataContent[i + 1] + "</b>";
      }
      returnResult = returnResult + dataContent[i + 2];
    } else {
      returnResult = dataContent[0];
    }
    return returnResult;
  }

  function useOutsideAlerter() {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      var total = document.getElementById(renderId).querySelectorAll("*");
      var input = document
        .getElementById(renderId)
        .previousElementSibling.querySelectorAll("*");
      var list = [];

      list.push(document.getElementById(renderId));
      list.push(document.getElementById(renderId).previousElementSibling);
      for (var i = 0; i < total.length; i++) {
        list.push(total[i]);
      }
      for (var i = 0; i < input.length; i++) {
        list.push(input[i]);
      }
      if (list.indexOf(event.target) < 0) {
        document.getElementById(renderId).style.display = "none";
        onClickFlag = false;
      } else {
        onClickFlag = true;
      }
    }

    React.useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  function onChange(event) {
    var currentTarget = event.currentTarget;
    inputRef.current.focus();
    mainRef.current.removeAttribute("keyId");
    mainRef.current.removeAttribute("keyValue");
    event.persist();
    fetch(BACKEND_URL + "/searchMaster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchValue: currentTarget.value,
        offset: 0,
        size: 5,
        masterId: props.masterId,
        checkCount: "true"
      })
    })
      .then(res => res.json())
      .then(
        data => {
          if (data.value) {
            var count = Math.ceil(data.count / 5);
            var rect = currentTarget.getBoundingClientRect();
            var render = document.getElementById(renderId);
            var parentId = document.getElementById(props.parentId);
            render.style.position = "absolute";
            if (parentId) {
              var clientRect = parentId.getBoundingClientRect();
              render.style.left = rect.x - parentId.x + "px";
              render.style.top = rect.height + rect.y - parentId.y + "px";
            } else {
              render.style.left = rect.x + "px";
              render.style.top = rect.height + rect.y + "px";
            }
            render.style.width = rect.width + "px";
            //data.value.map(value => {
            //  value.name = setBold(value.name);
            //});
            //render.style.top = "-2px";
            setTotalPage(count > 0 ? count : 1);
            setCurrentPage(1);
            setMenuData(data.value);
            setSelectedId("");
            setSelectIndex(-1);
            render.style.display = "block";
          }
        },
        error => {}
      );
  }

  function onKeyUp(event) {
    event.preventDefault();
    if ((event.which === 38 || event.which === 40) && menuData.length > 0) {
      if (event.which === 40) {
        if (selectedIndex === -1) {
          setSelectedId(menuData[selectedIndex + 1].id);
          setSelectIndex(0);
          inputRef.current.focus();
        } else if (selectedIndex === 4) {
          if (currentPage != totalPage) {
            handleMove(currentPage, currentPage + 1, 0);
          }
        } else if (
          selectedIndex < 4 &&
          selectedIndex > -1 &&
          menuData[selectedIndex + 1]
        ) {
          setSelectedId(menuData[selectedIndex + 1].id);
          setSelectIndex(selectedIndex + 1);
          inputRef.current.focus();
        }
      } else {
        if (selectedIndex === 4) {
          setSelectedId(menuData[selectedIndex - 1].id);
          setSelectIndex(selectedIndex - 1);
          inputRef.current.focus();
        } else if (selectedIndex === 0) {
          if (currentPage > 1) {
            handleMove(currentPage - 2, currentPage - 1, 4);
          }
        } else if (
          selectedIndex < 4 &&
          selectedIndex > 0 &&
          menuData[selectedIndex - 1]
        ) {
          setSelectedId(menuData[selectedIndex - 1].id);
          setSelectIndex(selectedIndex - 1);
          inputRef.current.focus();
        }
      }
    } else if (event.which === 13) {
      if (selectedIndex >= 0) {
        inputRef.current.value = menuData[selectedIndex].setText.toString();
        mainRef.current.setAttribute("keyId", menuData[selectedIndex].id);
        mainRef.current.setAttribute(
          "keyValue",
          menuData[selectedIndex].setText
        );
        setDefaultValue(menuData[selectedIndex].setText);
        document.getElementById(renderId).style.display = "none";
        inputRef.current.focus();
      }
    }
  }

  function onClickHandler(event) {
    var data = menuData.filter(value => value.id === event.target.id);
    if (data.length > 0) {
      var value = data[0].setText;
      inputRef.current.value = value.toString();
      mainRef.current.setAttribute("keyId", data[0].id);
      mainRef.current.setAttribute("keyValue", data[0].setText);
      setDefaultValue(value);
      document.getElementById(renderId).style.display = "none";
      inputRef.current.focus();
    }
  }

  function handleMove(offset, nextPage, selectIndex) {
    inputRef.current.focus();
    fetch(BACKEND_URL + "/searchMaster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchValue: inputRef.current.value,
        offset: offset,
        size: 5,
        masterId: props.masterId
      })
    })
      .then(res => res.json())
      .then(
        data => {
          inputRef.current.focus();
          setCurrentPage(nextPage);
          setMenuData(data.value);
          setSelectIndex(selectIndex);
          if (data.value.length > 0 && selectIndex >= 0) {
            setSelectedId(data.value[selectIndex].id);
          }
        },
        error => {}
      );
  }

  function onPreviousClick() {
    inputRef.current.focus();
    if (currentPage > 1 && totalPage > 1) {
      handleMove(currentPage - 2, currentPage - 1, -1);
    }
  }

  function onNextClick() {
    inputRef.current.focus();
    if (currentPage < totalPage) {
      handleMove(currentPage, currentPage + 1, -1);
    }
  }

  function onFocusOut() {
    if (
      (mainRef.current &&
        mainRef.current.attributes.keyId &&
        mainRef.current.attributes.keyId.value) ||
      onClickFlag ||
      !inputRef.current.value
    ) {
    } else {
      fetch(BACKEND_URL + "/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchValue: inputRef.current.value,
          masterId: props.masterId,
          offset: 0,
          size: 5
        })
      })
        .then(res => res.json())
        .then(
          data => {
            if (data.value && data.value.length > 0) {
              inputRef.current.value = data.value[0].setText.toString();
              setSelectedId(data.value[0].id);
              mainRef.current.setAttribute("keyId", data.value[0].id);
              mainRef.current.setAttribute("keyValue", data.value[0].setText);
            } else {
              inputRef.current.value = "";
            }
          },
          error => {}
        );
    }
  }

  function onPaperClick() {
    inputRef.current.focus();
  }

  return (
    <React.Fragment>
      <TextField
        id={props.id}
        fullWidth={props.fullWidth}
        style={props.style}
        label={props.label}
        onChange={onChange}
        inputRef={inputRef}
        fullWidth={props.fullWidth}
        ref={mainRef}
        autoComplete="off"
        label={props.label}
        onKeyUp={onKeyUp}
        onBlur={onFocusOut}
        defaultValue={defaultValue}
      />
      <Paper
        id={renderId}
        elevation={3}
        style={{
          width: "180px",
          height: "auto",
          display: "none",
          zIndex: 30,
          maxWidth: "200px"
        }}
        onClick={onPaperClick}
      >
        <div style={{ borderBottom: "1px solid grey", minHeight: "32px" }}>
          <ListData
            marginLeft="0"
            values={menuData}
            initial={selectedId}
            selectIndex={selectedIndex}
            id="sidedrawer-list"
            clickSideMenuHandler={onClickHandler}
            disableTypography={true}
            style={{
              padding: "2px",
              fontSize: "25px",
              height: "30px",
              display: "grid"
            }}
            listItemStyle={{
              height: "inherit",
              fontSize: "17px",
              margin: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "arial sans-serif",
              display: "table-cell",
              verticalAlign: "middle"
            }}
          />
        </div>
        <div
          style={{
            textAlign: "right",
            paddingRight: "8px",
            background: "#e3e4e8",
            height: "28px",
            userSelect: "none"
          }}
        >
          <Icon
            style={{
              fontSize: "17px",
              verticalAlign: "middle",
              color: currentPage > 1 && totalPage > 1 ? "#35db5e" : "black",
              cursor: currentPage > 1 && totalPage > 1 ? "pointer" : "default"
            }}
            icon="leftarrow"
            onClick={onPreviousClick}
          />
          <Typography
            variant="button"
            display="inline"
            gutterBottom
            style={{ verticalAlign: "middle", cursor: "default" }}
          >
            {currentPage}
          </Typography>
          <Typography
            variant="button"
            display="inline"
            gutterBottom
            style={{ cursor: "default", verticalAlign: "middle" }}
          >
            /
          </Typography>
          <Typography
            variant="button"
            display="inline"
            gutterBottom
            style={{
              verticalAlign: "middle",
              marginRight: "4px",
              cursor: "default"
            }}
          >
            {totalPage}
          </Typography>
          <Icon
            style={{
              fontSize: "17px",
              verticalAlign: "middle",
              color: currentPage < totalPage ? "#35db5e" : "black",
              cursor: currentPage < totalPage ? "pointer" : "default"
            }}
            icon="rightarrow"
            onClick={onNextClick}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
});

export default MasterInput;
