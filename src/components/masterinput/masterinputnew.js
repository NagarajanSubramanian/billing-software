import React from "react";
import TextField from "./../textfield/textfield";
import Paper from "@material-ui/core/Paper";
import ListData from "./../list/list";
import Typography from "@material-ui/core/Typography";
import Icon from "./../icons/icons";

import { BACKEND_URL } from "./../../constants/constants";

const MasterInput = React.forwardRef((props, ref) => {
  var onClickPaper = false;
  var renderId = props.id + "-render";
  var [selectedIndex, setSelectIndex] = React.useState(-1);
  var [selectedId, setSelectedId] = React.useState("");
  var [defaultValue, setDefaultValue] = React.useState(props.defaultValue);
  var [currentPage, setCurrentPage] = React.useState(1);
  var [totalPage, setTotalPage] = React.useState(1);
  var [menuData, setMenuData] = React.useState([]);

  const handleClickOutside = function (event) {
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
      onClickPaper = false;
    } else {
      onClickPaper = true;
    }
  };
  React.useEffect(() => {
    var mainRef = ref.current;
    if (props.keyId) {
      mainRef.setAttribute("keyid", props.keyId);
      mainRef.setAttribute("keyvalue", props.defaultValue);
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function onPreviousClick() {
    ref.current.focus();
    if (currentPage > 1 && totalPage > 1) {
      handleMove(currentPage - 2, currentPage - 1, -1);
    }
  }

  function onNextClick() {
    ref.current.focus();
    if (currentPage < totalPage) {
      handleMove(currentPage, currentPage + 1, -1);
    }
  }

  function handleMove(offset, nextPage, selectIndex) {
    ref.current.focus();
    fetch(BACKEND_URL + "/searchMaster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchValue: ref.current.value,
        offset: offset,
        size: 5,
        masterId: props.masterId,
      }),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          ref.current.focus();
          setCurrentPage(nextPage);
          setMenuData(data.value);
          setSelectIndex(selectIndex);
          if (data.value.length > 0 && selectIndex >= 0) {
            setSelectedId(data.value[selectIndex].id);
          }
        },
        (error) => {}
      );
  }

  function onClickHandler(event) {}

  const onPaperClick = function (event) {
    var mainRef = ref.current;
    ref.current.focus();
    var data = menuData.filter((value) => value.id === event.target.id);
    if (data.length > 0) {
      var value = data[0].setText;
      ref.current.value = value.toString();
      mainRef.setAttribute("keyid", data[0].id);
      mainRef.setAttribute("keyvalue", data[0].setText);
      setDefaultValue(value);
      document.getElementById(renderId).style.display = "none";
    }
  };

  const onFocus = function () {
    ref.current.classList.add("input_focus");
  };

  const onFocusOut = function () {
    var mainRef = ref.current;

    if (
      (mainRef && mainRef.attributes.keyid && mainRef.attributes.keyid.value) ||
      onClickPaper ||
      !ref.current.value
    ) {
      if (!onClickPaper) {
        ref.current.classList.remove("input_focus");
      }
    } else {
      var render = document.getElementById(renderId);
      render.style.display = "none";
      mainRef.removeAttribute("keyid");
      mainRef.removeAttribute("keyvalue");
      fetch(BACKEND_URL + "/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchValue: ref.current.value,
          masterId: props.masterId,
          offset: 0,
          size: 5,
        }),
      })
        .then((res) => res.json())
        .then(
          (data) => {
            if (data.value && data.value.length > 0) {
              ref.current.value = data.value[0].setText.toString();
              setSelectedId(data.value[0].id);
              mainRef.setAttribute("keyid", data.value[0].id);
              mainRef.setAttribute("keyvalue", data.value[0].setText);
            } else {
              ref.current.value = "";
            }
          },
          (error) => {}
        );
    }
  };

  function onKeyUp(event) {
    var mainRef = ref.current;
    event.preventDefault();
    if ((event.which === 38 || event.which === 40) && menuData.length > 0) {
      event.stopPropagation();
      if (event.which === 40) {
        if (selectedIndex === -1) {
          setSelectedId(menuData[selectedIndex + 1].id);
          setSelectIndex(0);
          ref.current.focus();
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
          ref.current.focus();
        }
      } else {
        if (selectedIndex === 4) {
          setSelectedId(menuData[selectedIndex - 1].id);
          setSelectIndex(selectedIndex - 1);
          ref.current.focus();
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
          ref.current.focus();
        }
      }
    } else if (event.which === 13) {
      if (selectedIndex >= 0) {
        ref.current.value = menuData[selectedIndex].setText.toString();
        mainRef.setAttribute("keyid", menuData[selectedIndex].id);
        mainRef.setAttribute("keyvalue", menuData[selectedIndex].setText);
        setDefaultValue(menuData[selectedIndex].setText);
        document.getElementById(renderId).style.display = "none";
        ref.current.focus();
        if (props.onComplete) {
          props.onComplete();
        }
      }
    } else if (event.which === 37 || event.which === 39) {
      event.stopPropagation();
    }
  }

  function onKeydown(event) {
    var mainRef = ref.current;
    event.stopPropagation();
    if (
      (event.which === 37 ||
        event.which === 39 ||
        event.which === 38 ||
        event.which === 40) &&
      selectedIndex > -1
    ) {
      event.preventDefault();
    }
    if (event.which === 9) {
      fetch(BACKEND_URL + "/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchValue: ref.current.value,
          masterId: props.masterId,
          offset: 0,
          size: 5,
        }),
      })
        .then((res) => res.json())
        .then(
          (data) => {
            if (data.value && data.value.length > 0) {
              ref.current.value = data.value[0].setText.toString();
              setSelectedId(data.value[0].id);
              mainRef.setAttribute("keyid", data.value[0].id);
              mainRef.setAttribute("keyvalue", data.value[0].setText);
            } else {
              ref.current.value = "";
            }
          },
          (error) => {}
        );
      document.getElementById(renderId).style.display = "none";
    }
  }
  const onChange = function (event) {
    var mainRef = ref.current;
    var currentTarget = event.currentTarget;
    ref.current.focus();
    mainRef.removeAttribute("keyid");
    mainRef.removeAttribute("keyvalue");
    event.persist();
    fetch(BACKEND_URL + "/searchMaster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchValue: currentTarget.value,
        offset: 0,
        size: 5,
        masterId: props.masterId,
        checkCount: "true",
      }),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.value) {
            var count = Math.ceil(data.count / 5);
            var rect = currentTarget.getBoundingClientRect();
            var render = document.getElementById(renderId);
            render.style.position = "fixed";
            render.style.left = rect.x + "px";
            render.style.top = rect.y + 32 + "px";
            render.style.width = rect.width + "px";
            render.style.display = "inline-block";
            //data.value.map(value => {
            //  value.name = setBold(value.name);
            //});
            //render.style.top = "-2px";
            setTotalPage(count > 0 ? count : 1);
            setCurrentPage(1);
            setMenuData(data.value);
            setSelectedId("");
            setSelectIndex(-1);
          }
        },
        (error) => {}
      );
  };
  return (
    <div id={props.id + "-master-input-div"}>
      <TextField
        id={props.id}
        label={props.label}
        ref={ref}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        defaultValue={
          props.defaultValue && props.keyId ? props.defaultValue : ""
        }
        required={props.required}
        autoComplete="off"
        onFocus={onFocus}
        onChange={onChange}
        onFocusOut={onFocusOut}
        onKeydown={onKeydown}
        onKeyUp={onKeyUp}
      />
      <Paper
        id={renderId}
        elevation={3}
        tabIndex={-1}
        style={{
          width: "180px",
          height: "auto",
          zIndex: 30,
          display: "none",
        }}
        onClick={onPaperClick}
      >
        <div style={{ borderBottom: "1px solid grey", minHeight: "32px" }}>
          <ListData
            tabIndex={-1}
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
              display: "grid",
            }}
            listItemStyle={{
              height: "inherit",
              fontSize: "17px",
              margin: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "var(--var-input-font-family)",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "right",
            paddingRight: "8px",
            background: "#e3e4e8",
            height: "28px",
            userSelect: "none",
          }}
        >
          <Icon
            style={{
              fontSize: "17px",
              verticalAlign: "middle",
              color: currentPage > 1 && totalPage > 1 ? "#35db5e" : "black",
              cursor: currentPage > 1 && totalPage > 1 ? "pointer" : "default",
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
              cursor: "default",
            }}
          >
            {totalPage}
          </Typography>
          <Icon
            style={{
              fontSize: "17px",
              verticalAlign: "middle",
              color: currentPage < totalPage ? "#35db5e" : "black",
              cursor: currentPage < totalPage ? "pointer" : "default",
            }}
            icon="rightarrow"
            onClick={onNextClick}
          />
        </div>
      </Paper>
    </div>
  );
});

export default MasterInput;
