import React from "react";
import classNames from "classnames/bind";
import styles from "./ItemList.module.scss";

const cn = classNames.bind(styles);

// parameter : array[], html, num of item at each one div
const ItemList = ({ dataList, children, maxItemNum }) => {
  let length = maxItemNum;
  return (
    <div className={cn("ItemList")}>
      {length === length++ % maxItemNum ? <div>{children}</div> : { children }}
    </div>
  );
};

export default ItemList;
