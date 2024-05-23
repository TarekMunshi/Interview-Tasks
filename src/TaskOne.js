import React, { useState, useRef } from "react";
import "./TaskOne.css";

const getPartitionsRandomColor = () => {
  const letters = "0123456789ABCDEF";
  return `#${Array.from(
    { length: 6 },
    () => letters[Math.floor(Math.random() * 16)]
  ).join("")}`;
};

const Partitions = ({
  initialColor,
  fullSize = false,
  onRemove,
  remove,
  setRemove,
}) => {
  const [split, setSplit] = useState(null);
  const [colors, setColors] = useState([initialColor]);
  const [size, setSize] = useState();

  const partitionRef = useRef();

  const handleSplitPartitions = (direction) => {
    setRemove(true);
    if (split) return;
    setSplit(direction);
    setColors([initialColor, getPartitionsRandomColor()]);
  };

  const handleRemovePartitions = (indexToRemove) => {
    // console.log(indexToRemove);
    // console.log(colors);
    if (colors.length === 1 && onRemove) {
      onRemove();
    } else {
      setColors(colors.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const rect = partitionRef.current.getBoundingClientRect();
    const newWidth = e.clientX - rect.left;
    const newHeight = e.clientY - rect.top;
    setSize({
      width: newWidth > 100 ? newWidth : 100,
      height: newHeight > 100 ? newHeight : 100,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={partitionRef}
      className={`partitionWrapper ${split === "H" ? "column" : "row"} ${
        fullSize ? "fullSize" : "defaultSize"
      }`}
      style={{
        backgroundColor: initialColor,
        width: size?.width,
        height: size?.height,
      }}
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
            onClick={() => handleSplitPartitions("V")}
          >
            V
          </button>
          <button
            className="split-button"
            onClick={() => handleSplitPartitions("H")}
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
      <div className="resize-handle" onMouseDown={handleMouseDown} />
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
