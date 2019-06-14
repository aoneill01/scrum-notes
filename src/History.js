import React from "react";
import { distanceInWordsToNow } from "date-fns";
import Note from "./Note";

const History = ({ value }) => {
  return (
    <div class="history">
      {value.map(note => (
        <div>
          <p>{distanceInWordsToNow(note.timestamp)} ago</p>
          <Note value={note} editable={false} />
        </div>
      ))}
    </div>
  );
};

export default History;
