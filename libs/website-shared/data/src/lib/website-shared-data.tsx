import styled from 'tailwind';

const StyledWebsiteSharedData = styled.div`
  color: pink;
`;

export function WebsiteSharedData() {
  return (
    <StyledWebsiteSharedData>
      <h1>Welcome to WebsiteSharedData!</h1>
    </StyledWebsiteSharedData>
  );
}

export default WebsiteSharedData;
