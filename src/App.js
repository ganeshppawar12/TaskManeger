import React, { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import "./App.css";
import Editable from "./Components/Editable/Editable";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./context/themeSlice";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );
  localStorage.getItem("them");
  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
      desc: "",
      importance: "hi",
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };
  console.log(boards);
  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

  const [theme, setTheme] = useState(false);

  const handleThemeToggle = (e) => {
    e.preventDefault();
    setTheme(theme === "light" ? "dark" : "light");
  };

  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("them", lightTheme);
  }, [lightTheme]);
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <div className={"app" + (lightTheme ? "" : " dark")}>
          <div className="app_nav">
            <h1>Task Management Web Application</h1>
            <div
              onClick={() => {
                dispatch(toggleTheme());
              }}
            >
              {lightTheme && <ModeNightIcon />}
              {!lightTheme && (
                <WbSunnyIcon
                  className={"icon" + (lightTheme ? " " : " dark")}
                />
              )}
            </div>
          </div>
          <div className="app_boards_container">
            <div className={"app_boards" + (lightTheme ? "" : " dark")}>
              {boards.map((item) => (
                <Board
                  key={item.id}
                  board={item}
                  addCard={addCardHandler}
                  removeBoard={() => removeBoard(item.id)}
                  removeCard={removeCard}
                  dragEnded={dragEnded}
                  dragEntered={dragEntered}
                  updateCard={updateCard}
                />
              ))}

              <div className="app_boards_last">
                <Editable
                  displayClass={
                    "app_boards_add-board" + (lightTheme ? "" : " darka")
                  }
                  editClass={
                    "app_boards_add-board_edit" + (lightTheme ? " " : " darka")
                  }
                  placeholder="Enter Board Name"
                  text="Add Board"
                  buttonText="Add Board"
                  onSubmit={addboardHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
