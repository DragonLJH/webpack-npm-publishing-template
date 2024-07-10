import React, { useState } from "react";
import DDrag from "@/components/DDrag";

const TimeTableView = () => {
  return (
    <>
      <div className="time-table-view">
        <TableDrag />
      </div>
    </>
  );
};

const TableDrag = () => {
  const initArr = new Array(10).fill(null).map((_, index) => {
    return { id: index, name: `name${index}` };
  });
  const [arr, setArr] = useState(initArr);
  return (
    <div className="table-drag">
      <DDrag
        dragstartCallback={(event) => {
          const { index, id } = event.target.dataset;
          console.log("dragstartCallback", index, id);
          event.dataTransfer.setData("index", index);
          event.dataTransfer.setData("id", id);
        }}
        dropCallback={(event) => {
          const dragIndex = parseInt(event.dataTransfer.getData("index"));
          const dropIndex = parseInt(event.target.dataset.index);
          console.log("dropCallback", arr);
          const newArr = [...arr];
          newArr.splice(dropIndex, 0, newArr.splice(dragIndex, 1)[0]);
          setArr(newArr);
        }}
      >
        {arr &&
          arr.map(({ name, id }, index) => {
            return (
              <div key={index} data-id={id} data-index={index}>
                {name}
              </div>
            );
          })}
      </DDrag>
    </div>
  );
};

export default TimeTableView;
