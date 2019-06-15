import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

  if (!editable) {
    return items.map(item => <ReactMarkdown source={formatItem(item)} />);
  }

  return (
    <>
      <TransitionGroup>
        {items.map((item, i) => (
          <CSSTransition key={item} timeout={500} classNames="item">
            <div className="row">
              <div className="delete-row" onClick={() => onDeleteItem(i)}>
                ×
              </div>
              <ReactMarkdown source={formatItem(item)} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
      </form>
    </>
  );
};

export default ItemizedList;
