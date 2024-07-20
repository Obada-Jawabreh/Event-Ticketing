import styled from "styled-components";

const StyledMainButton = styled.button`
  border-radius: 8px;
  color: #fff;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #ff204e;
  padding: 12px 20px;
  width: 100%;

  &:hover {
    background: #d4054c;
  }
`;

// eslint-disable-next-line react/prop-types
function MainButton({ children, id, onClick }) {
  return (
    <StyledMainButton id={id} onClick={onClick}>
      {children}
    </StyledMainButton>
  );
}

export default MainButton;
