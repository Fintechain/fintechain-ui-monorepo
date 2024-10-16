import { render } from '@testing-library/react';

import PostListView from './post-list-view';

describe('PostListView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostListView />);
    expect(baseElement).toBeTruthy();
  });
});
