import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
  position: fixed; /** 스크롤 해도 상단에 고정 */
  width: 100%;
  background: white;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
`;

// Responsive componet 속성에 스타일 추가
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin-left: 10px;
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .right {
    border: 1px solid black;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`;

// fixed 하단 컨텐츠 겹치므로
const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">창원대학교</div>
          <div className="right">
            <Button to="/login">로그인</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
