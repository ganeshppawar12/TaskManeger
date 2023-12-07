import React, { useEffect, useState } from "react";
// import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

import Dropdown from "../Dropdown/Dropdown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSelector } from "react-redux";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels } = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return month + " " + day + " " + new Date().getFullYear();
  };

  const [color, setColor] = useState("");
  function colorchange() {
    const arr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
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
  const people = [
    {
      id: "1",
      name: "vaishnavi",
    },
    {
      id: "2",
      name: "neeta",
      //  },{
      //     id:"3",
      //     name:"ganesh"
      //  },{
      //     id:"4",
      //     name:"lvng"
      //
    },
  ].sort(() => Math.random() - 0.5);

  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className={"card " + (lightTheme ? "" : " darkcard")}
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className={"card_top_labels"}>
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>

          <div className="CardTask">
            <p>Task{props.card.length} </p>
          </div>
          <div
            className="card_top_more"
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
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        {props.card.desc && (
          <div className="desc">
            <h5>Description</h5>
            <p>{props.card.desc}</p>
          </div>
        )}

        <div className="cardTaskListContainer">
          {tasks && tasks?.length > 0 && (
            <p className="card_footer_item">
              <CheckBoxOutlineBlankIcon className="card_footer_icon" />
              Task List {tasks?.filter((item) => item.completed)?.length}/
              {tasks?.length}
            </p>
          )}
        </div>

        <div className="card_footer">
          <div className="peoplelist">
            {people.map((item) => (
              <p className="PeopleList">{item.name[0]}</p>
            ))}
          </div>

          {date && (
            <p className="Date">
              <AccessTimeIcon className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}

          {/* <p>{props.card.importance}gd</p>
         <p>{props.card.desc}</p> */}
        </div>
      </div>
    </>
  );
}

export default Card;
