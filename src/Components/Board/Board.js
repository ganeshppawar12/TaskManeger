import React, { useEffect, useState } from "react";
// import { MoreHorizontal } from "react-feather";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";

import "./Board.css";
import Editable from "../Editable/Editable";
import { ThemeContext } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [color, setColor] = useState("");
  function colorchange() {
    const arr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];
    let hash = "#";
    for (let i = 0; i < 6; i++) {
      hash = hash + arr[Math.floor(Math.random() * arr.length)];
    }

    setColor(hash);
  }
  useEffect(() => {
    colorchange();
  }, [setColor]);

  const { darkTheme, togglethem } = React.useContext(ThemeContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  return (
    <div className="board">
      <div
        style={{ borderBottom: `4px solid ${color}` }}
        className="board_header"
      >
        <p className={"board_header_title" + (lightTheme ? "" : " dark")}>
          {props.board?.title}

          <span> ({props.board?.cards?.length || 0})</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={(event) => {
            event.stopPropagation();
            setShowDropdown(true);
          }}
        >
          <MoreHorizIcon />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            colorchange={colorchange}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass={"board_add-card" + (lightTheme ? "" : " darkadd")}
          editClass={"board_add-card_edit" + (lightTheme ? "" : " darkadd")}
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
