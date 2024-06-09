import { data } from "@/constants/mock-data";
import React from "react";
import MyComponent from "./MyComponent/MyComponent";

const index = () => {
  return <MyComponent data={data} />;
};

export default index;
