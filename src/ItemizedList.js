import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const formatItem = item =>
  `- ${item.replace(
    /\w{2,7}-\d{1,7}/gi,
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
    return items.map(item => (
      <ReactMarkdown source={formatItem(item.message)} />
    ));
  }

  return (
    <>
      <TransitionGroup>
        {items.map(item => (
          <CSSTransition key={item.id} timeout={500} classNames="item">
            <div className="row">
              <div className="delete-row" onClick={() => onDeleteItem(item.id)}>
                ×
              </div>
              <ReactMarkdown source={formatItem(item.message)} />
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
