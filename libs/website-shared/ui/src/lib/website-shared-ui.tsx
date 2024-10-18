import styled from 'tailwind';

const StyledWebsiteSharedUi = styled.div`
  color: pink;
`;

export function WebsiteSharedUi() {
  return (
    <StyledWebsiteSharedUi>
      <h1>Welcome to WebsiteSharedUi!</h1>
    </StyledWebsiteSharedUi>
  );
}

export default WebsiteSharedUi;
