// Burger.styled.ts
import styled from 'styled-components';

interface HTMLButtonElement {
  open?: boolean;
}
interface IProps {
  open: boolean;
}
export const StyledBurger = styled.button<IProps>`
  position: relative;
  top: 0;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 100%;
    height: 0.25rem;
    background: ${({ theme, open }) => { return (open ? theme.primaryDark : theme.primaryLight)}};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;
