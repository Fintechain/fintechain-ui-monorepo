import { render } from '@testing-library/react';

import VerticalPostList from './post-list';

describe('VerticalPostList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostList />);
    expect(baseElement).toBeTruthy();
  });
});
