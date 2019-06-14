import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Note from "./Note";

import "./styles.css";

const generateNewNote = () => ({
  timestamp: new Date(),
  yesterday: [],
  today: [],
  blockers: []
});

const App = () => {
  const [notes, setNotes] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : {
          current: generateNewNote()
        }
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addYesterday = value => addByProperty("yesterday", value);
  const addToday = value => addByProperty("today", value);
  const addBlocker = value => addByProperty("blockers", value);

  const addByProperty = (property, value) => {
    setNotes({
      current: {
        ...notes.current,
        [property]: [...notes.current[property], value]
      }
    });
  };

  const newNote = () =>
    setNotes({
      current: generateNewNote()
    });

  const showNew = () =>
    notes.current.yesterday.length > 0 ||
    notes.current.today.length > 0 ||
    notes.current.blockers.length > 0;

  return (
    <div className="App">
      <h1>Daily Scrum Notes</h1>
      <Note
        value={notes.current}
        onAddYesterday={addYesterday}
        onAddToday={addToday}
        onAddBlocker={addBlocker}
      />
      {showNew() && <button onClick={newNote}>New</button>}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
