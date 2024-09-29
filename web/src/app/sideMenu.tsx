"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

const SideMenuContainer = styled.div`
  height: 100vh;
  width: 250px;
  background-color: #222222;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  align-content: center;
  border-radius: 20px;
`;

const MenuItem = styled.div`
  color: #ffffff;
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  align-content: center;

  &:hover {
    background-color: #444;
  }
`;

const SideMenu = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <SideMenuContainer>
      <MenuItem onClick={() => handleNavigation("/collab/recruitment")}>
        コラボメンバーを募集する
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/")}>
        コラボに応募する
      </MenuItem>
    </SideMenuContainer>
  );
};

export default SideMenu;
