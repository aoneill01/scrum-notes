import React from "react";
import ItemizedList from "./ItemizedList";

const Note = ({
  value,
  onAddYesterday,
  onAddToday,
  onAddBlocker,
  onDeleteYesterday,
  onDeleteToday,
  onDeleteBlocker,
  editable = true
}) => {
  return (
    <>
      <h2>Yesterday, I …</h2>
      <ItemizedList
        items={value.yesterday}
        onNewItem={onAddYesterday}
        onDeleteItem={onDeleteYesterday}
        editable={editable}
      />
      <h2>Today, I will …</h2>
      <ItemizedList
        items={value.today}
        onNewItem={onAddToday}
        onDeleteItem={onDeleteToday}
        editable={editable}
      />
      <h2>I am blocked by …</h2>
      {value.blockers.length === 0 && (
        <p>
          Nothing!{" "}
          <span role="img" aria-label="tada!">
            🎉
          </span>
        </p>
      )}
      <ItemizedList
        items={value.blockers}
        onNewItem={onAddBlocker}
        onDeleteItem={onDeleteBlocker}
        editable={editable}
      />
    </>
  );
};

export default Note;
