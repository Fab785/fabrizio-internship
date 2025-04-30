import React from "react";
import ImageSkeleton from "./ImageSkeleton";
import TextSkeleton from "./TextSkeleton";

const CardSkeleton = () => (
  <div style={{ width: "100%", padding: "16px" }}>
    <ImageSkeleton />
    <TextSkeleton width="60%" />
    <TextSkeleton width="40%" />
  </div>
);

export default CardSkeleton;
