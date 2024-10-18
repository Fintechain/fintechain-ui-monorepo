import styled from 'tailwind';

const StyledSharedData = styled.div`
  color: pink;
`;

export function SharedData() {
  return (
    <StyledSharedData>
      <h1>Welcome to SharedData!</h1>
    </StyledSharedData>
  );
}

export default SharedData;
