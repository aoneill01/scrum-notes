import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const formatItem = item =>
  `- ${item.replace(
    /ccg-\d+/gi,
    "[$&](https://pointsource.atlassian.net/browse/$&)"
  )}`;

const ItemizedList = ({ items, onNewItem, onDeleteItem, editable }) => {
  const [newItem, setNewItem] = useState("");
  const handleSubmit = evt => {
    evt.preventDefault();
    if (newItem) {
      onNewItem(newItem);
      setNewItem("");
    }
  };

  return (
    <>
      {items.map((item, i) => (
        <div className="row">
          {editable && (
            <div className="delete-row" onClick={() => onDeleteItem(i)}>
              ×
            </div>
          )}
          <ReactMarkdown source={formatItem(item)} />
        </div>
      ))}
      {editable && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
        </form>
      )}
    </>
  );
};

export default ItemizedList;
