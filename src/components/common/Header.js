import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Responsive from "./Responsive";
import { Link } from "react-router-dom";

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
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`;

// fixed 하단 컨텐츠 겹치므로
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/main/menu" className="logo">
            창원대학교
          </Link>
          <div className="right">
            <UserInfo>{user.id}</UserInfo>
            <Button onClick={onLogout} gray={true}>
              로그아웃
            </Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
