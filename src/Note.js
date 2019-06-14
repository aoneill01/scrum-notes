import React from "react";
import ItemizedList from "./ItemizedList";

const Note = ({ value, onAddYesterday, onAddToday, onAddBlocker }) => {
  return (
    <>
      <h2>Yesterday, I …</h2>
      <ItemizedList items={value.yesterday} onNewItem={onAddYesterday} />
      <h2>Today, I will …</h2>
      <ItemizedList items={value.today} onNewItem={onAddToday} />
      <h2>I am blocked by …</h2>
      {value.blockers.length === 0 && <p>Nothing! 🎉</p>}
      <ItemizedList items={value.blockers} onNewItem={onAddBlocker} />
    </>
  );
};

export default Note;
