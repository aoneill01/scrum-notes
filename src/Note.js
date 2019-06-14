import React from "react";
import ItemizedList from "./ItemizedList";

const Note = ({ value, onAddYesterday, onAddToday, onAddBlocker, editable = true }) => {
  return (
    <>
      <h2>Yesterday, I …</h2>
      <ItemizedList items={value.yesterday} onNewItem={onAddYesterday} editable={editable} />
      <h2>Today, I will …</h2>
      <ItemizedList items={value.today} onNewItem={onAddToday} editable={editable} />
      <h2>I am blocked by …</h2>
      {value.blockers.length === 0 && (
        <p>
          Nothing!{" "}
          <span role="img" aria-label="tada!">
            🎉
          </span>
        </p>
      )}
      <ItemizedList items={value.blockers} onNewItem={onAddBlocker} editable={editable} />
    </>
  );
};

export default Note;
