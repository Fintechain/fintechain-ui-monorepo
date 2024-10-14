import { render } from '@testing-library/react';

import VerticalPostList from './vertical-post-list';

describe('VerticalPostList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VerticalPostList />);
    expect(baseElement).toBeTruthy();
  });
});
