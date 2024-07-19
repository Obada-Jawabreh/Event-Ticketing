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
`;

// eslint-disable-next-line react/prop-types
function MainButton({ children }) {
  return <StyledMainButton>{children}</StyledMainButton>;
}

export default MainButton;
