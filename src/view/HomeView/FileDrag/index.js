import React, { useEffect, useState } from "react";
import DFileDrag from "@/components/DFileDrag";
import "./index.scss";
const FileDrag = () => {
  useEffect(() => {}, []);
  return (
    <>
      <div className="file-drag">
        <DFileDrag />
      </div>
    </>
  );
};

export default FileDrag;
