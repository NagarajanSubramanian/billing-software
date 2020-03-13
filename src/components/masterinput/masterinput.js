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
        catagoryName: currentTarget.value,
        searchField: ["catagoryName", "catagoryShort", "catagoryCommodityCode"],
        offset: 0,
        size: 5
      })
    })
      .then(res => res.json())
      .then(
        data => {
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
          //render.style.top = "-2px";
          setTotalPage(count > 0 ? count : 1);
          setCurrentPage(1);
          setMenuData(data.value);
          setSelectIndex(-1);
          render.style.display = "block";
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
        inputRef.current.value = menuData[selectedIndex].name;
        mainRef.current.setAttribute("keyId", menuData[selectedIndex].id);
        mainRef.current.setAttribute("keyValue", menuData[selectedIndex].name);
        setDefaultValue(menuData[selectedIndex].name);
        document.getElementById(renderId).style.display = "none";
        inputRef.current.focus();
      }
    }
  }

  function onClickHandler(event) {
    var data = menuData.filter(value => value.id === event.target.id);
    if (data.length > 0) {
      var value = data[0].name;
      inputRef.current.value = value;
      mainRef.current.setAttribute("keyId", data.id);
      mainRef.current.setAttribute("keyValue", data.name);
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
        catagoryName: "",
        searchField: ["catagoryName", "catagoryShort", "catagoryCommodityCode"],
        offset: offset,
        size: 5
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
    //setTimeout(() => {
    if (
      (mainRef.current &&
        mainRef.current.attributes.keyId &&
        mainRef.current.attributes.keyId.value) ||
      onClickFlag ||
      !inputRef.current.value
    ) {
    } else {
      fetch(BACKEND_URL + "/searchMaster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catagoryName: inputRef.current.value,
          searchField: [
            "catagoryName",
            "catagoryShort",
            "catagoryCommodityCode"
          ],
          offset: 0,
          size: 5
        })
      })
        .then(res => res.json())
        .then(
          data => {
            inputRef.current.focus();
            if (data.value.length > 0) {
              setSelectedId(data.value[0].id);
              mainRef.current.setAttribute("keyId", data.value[0].id);
              mainRef.current.setAttribute("keyValue", data.value[0].name);
            }
          },
          error => {}
        );
      inputRef.current.value = "";
    }
    //}, 500);
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
        ref={mainRef}
        label={props.label}
        onKeyUp={onKeyUp}
        onBlur={onFocusOut}
        defaultValue={defaultValue}
      />
      <Paper
        id={renderId}
        elevation={3}
        style={{ width: "180px", height: "auto", display: "none", zIndex: 30 }}
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
