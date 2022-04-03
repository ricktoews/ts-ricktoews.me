import { StyledBurger } from './Burger.styled';

interface IProps {
  open: boolean;
  setOpen: Function;
}

const Burger = ({ open, setOpen }: IProps) => {
console.log('Burger isOpen', open);
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open) }>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

export default Burger;

