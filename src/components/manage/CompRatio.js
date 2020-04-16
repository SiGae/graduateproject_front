import React from "react";
import styled, { css } from "styled-components";
import classNames from "classnames/bind";
import styles from "./CompRatio.module.scss";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import { AiFillPlusCircle } from "react-icons/ai";

const DivTemplate = styled(Responsive)`
  margin-top: 20px;
  padding: 0px;
`;

const commonStyle = css`
  width: 140px;
`;
const FirstInput = styled.input`
  ${commonStyle}
  height: 30px;
`;

const SecondInput = styled.input`
  ${commonStyle}
  height: 50px;
`;
const DataList = ({ onChange, ratio, index, onDoubleClick }) => {
  return (
    <div className={cn("listBody")} onDoubleClick={onDoubleClick}>
      <FirstInput
        placeholder="평가이름"
        name="name"
        value={ratio.name}
        onChange={onChange}
      ></FirstInput>
      <SecondInput
        placeholder="%"
        name="ratio"
        value={ratio.ratio}
        onChange={onChange}
      ></SecondInput>
    </div>
  );
};

const cn = classNames.bind(styles);
const CompRatio = ({
  ratioArr,
  onChange,
  onAddData,
  onSendData,
  onDoubleClick
}) => {
  return (
    <DivTemplate>
      <div className={cn("body")}>
        {ratioArr &&
          ratioArr.map((ratio, index) => (
            <DataList
              key={index}
              ratio={ratio}
              onChange={e => onChange(e, index)}
              onDoubleClick={() => onDoubleClick(index)}
            />
          ))}
        <AiFillPlusCircle className={cn("plus")} onClick={onAddData} />
      </div>
      <div className={cn("footer")}>
        <Button gray="true" onClick={onSendData}>
          설정
        </Button>
      </div>
    </DivTemplate>
  );
};

export default React.memo(CompRatio);

/**
 *
 */
