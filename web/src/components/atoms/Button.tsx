"use client"

import styled from "styled-components";
import React from "react";

type ButtonProps = {
  color: string;
  background: string;
  label: string;
  onClick: () => void;
};

const StyledButton = styled.button<ButtonProps>`
    color: ${(props) => props.color};
    background: ${(props) => props.background};
    border: 2px solid ${(props) => props.color};

    font-size: 1.5em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        font-size: 1.6em;
    }
`;

const Button: React.FC<ButtonProps> = ({ color, background, label, onClick }) => {
  return (
    <StyledButton color={color} background={background} onClick={onClick} label={label}>
      {label}
    </StyledButton>
  );
};

export default Button;