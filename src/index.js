import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as nanoid from "nanoid";
import Note from "./Note";
import History from "./History";
import useStateWithLocalStorage from "./useStateWithLocalStorage";

import "./styles.css";

const generateNewNote = () => ({
  timestamp: new Date(),
  yesterday: [],
  today: [],
  blockers: []
});

const App = () => {
  const [note, setNote] = useStateWithLocalStorage("note", generateNewNote());
  const [history, setHistory] = useStateWithLocalStorage("history", []);
  const [showHistory, setShowHistory] = useState(false);

  const addYesterday = value => addByProperty("yesterday", value);
  const addToday = value => addByProperty("today", value);
  const addBlocker = value => addByProperty("blockers", value);

  const addByProperty = (property, value) => {
    setNote({
      ...note,
      [property]: [...note[property], { id: nanoid(), message: value }]
    });
  };

  const deleteYesterday = id => deleteByProperty("yesterday", id);
  const deleteToday = id => deleteByProperty("today", id);
  const deleteBlocker = id => deleteByProperty("blockers", id);

  const deleteByProperty = (property, id) => {
    setNote({
      ...note,
      [property]: note[property].filter(val => val.id !== id)
    });
  };

  const newNote = () => {
    setHistory([{ ...note, timestamp: new Date() }, ...history]);
    setNote(generateNewNote());
  };

  const showNew = () =>
    note.yesterday.length > 0 ||
    note.today.length > 0 ||
    note.blockers.length > 0;

  return (
    <>
      <div className="current">
        <h1>Daily Scrum Notes</h1>
        <Note
          value={note}
          onAddYesterday={addYesterday}
          onAddToday={addToday}
          onAddBlocker={addBlocker}
          onDeleteYesterday={deleteYesterday}
          onDeleteToday={deleteToday}
          onDeleteBlocker={deleteBlocker}
        />
      </div>
      <div className="bottom">
        {showNew() && <button onClick={newNote}>New</button>}
        {history.length > 0 && (
          <>
            <button onClick={() => setShowHistory(!showHistory)}>
              {showHistory
                ? "Hide previous notes"
                : `Show previous notes (${history.length})`}
            </button>
            {showHistory && <History value={history} />}
          </>
        )}
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
