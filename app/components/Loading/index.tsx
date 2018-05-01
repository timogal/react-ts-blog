import * as React from "react";

import styled, { keyframes } from "../styled";

const bouncing = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  > span {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: ${props => props.theme.color};
    border-radius: 50%;
    animation: ${bouncing} 0.6s infinite alternate;
  }

  > span:nth-child(2) {
    animation-delay: 0.2s;
  }

  > span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const Loading: React.StatelessComponent<any> = () => (
  <LoadingWrapper>
    <span />
    <span />
    <span />
  </LoadingWrapper>
);

export default Loading;
