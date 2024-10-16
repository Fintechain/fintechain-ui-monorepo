import { render } from '@testing-library/react';

import PostView from './post-view';

describe('PostView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostView />);
    expect(baseElement).toBeTruthy();
  });
});
