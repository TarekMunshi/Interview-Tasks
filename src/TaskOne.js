import React, { useState } from "react";
import "./TaskOne.css";

// generate random color function
const getPartitionsRandomColor = () => {
  const letters = "0123456789ABCDEF";
  return `#${Array.from(
    { length: 6 },
    () => letters[Math.floor(Math.random() * 16)]
  ).join("")}`;
};
// partitions component
const Partitions = ({
  initialColor,
  fullSize = false,
  onRemove,
  remove,
  setRemove,
}) => {
  const [split, setSplit] = useState(null);

  const [colors, setColors] = useState([initialColor]);

  // split partition
  const handleSplitPartitions = (direction) => {
    setRemove(true);
    if (split) return;
    setSplit(direction);
    setColors([initialColor, getPartitionsRandomColor()]);
  };

  // remove partition
  const handleRemovePartitions = (indexToRemove) => {
    if (colors.length === 1 && onRemove) {
      onRemove();
    } else {
      setColors(colors.filter((_, index) => index !== indexToRemove));
    }
  };
  return (
    <div
      className={`partitionWrapper ${split === "H" ? "column" : "row"} ${
        fullSize ? "fullSize" : "defaultSize"
      }`}
      style={{ backgroundColor: initialColor }}
    >
      {split ? (
        colors.map((color, index) => (
          <Partitions
            key={index}
            initialColor={color}
            remove={remove}
            setRemove={setRemove}
            onRemove={() => handleRemovePartitions(index)}
          />
        ))
      ) : (
        <div className="partition">
          <button
            className="split-button"
            onClick={() => {
              handleSplitPartitions("V");
            }}
          >
            V
          </button>
          <button
            className="split-button"
            onClick={() => {
              handleSplitPartitions("H");
            }}
          >
            H
          </button>
          {onRemove && colors.length <= 1 && remove && (
            <button onClick={onRemove} className="remove-button">
              -
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const TaskOne = () => {
  const [partitions, setPartitions] = useState([getPartitionsRandomColor()]);
  const [remove, setRemove] = useState(false);

  const handleRemoveRootPartition = () => {
    setPartitions([]);
  };

  return (
    <div className="taskOne">
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Recursive Partitioning
      </h1>
      {partitions.length > 0 && (
        <Partitions
          initialColor={partitions[0]}
          fullSize={true}
          onRemove={handleRemoveRootPartition}
          setRemove={setRemove}
          remove={remove}
        />
      )}
    </div>
  );
};

export default TaskOne;
