import React, { useEffect, useState } from 'react';
import './DragAndDrop.scss';
/* components */
/* Util */
interface DragAndDropProps {
  handleFilesDrop: (files: any) => void;
  dragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = DragAndDropProps;

const DragAndDrop: React.FC<Props> = ({ dragging, setDragging, children, handleFilesDrop }) => {
  const [dragCounter, setDragCounter] = useState(0);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter === 0) {
      setDragging(false);
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  useEffect(() => {
    if (dragCounter === 0) {
      setDragging(false);
    }
  }, [dragCounter, setDragging]);

  return (
    <div
      className="draganddrop__div"
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {dragging && <div className="draganddrop__highlight"></div>}
      {children}
    </div>
  );
};

export default DragAndDrop;
