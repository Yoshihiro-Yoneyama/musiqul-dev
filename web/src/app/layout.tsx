"use client"

import React from "react";
import styled from "styled-components";
import SideMenu from "@/app/sideMenu";

const BodyLayout = styled.body`
  background-color: #000000;
`

// サイドメニューを
const FlexContainer = styled.div`
  display: flex;
  height: 100vh
`;

const SideMenuLayout = styled.div`
  width: 250px;
  padding: 20px;
`;

const ChildrenLayout = styled.div`
  flex: 1;
  color: #ffffff;
  padding: 100px;
`;

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <BodyLayout>
        <FlexContainer>
          <SideMenuLayout>
            <SideMenu/>
          </SideMenuLayout>
          <ChildrenLayout>
            {children}
          </ChildrenLayout>
          
        </FlexContainer>
      </BodyLayout>
    </html>
  )
}