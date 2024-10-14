import { render } from '@testing-library/react';

import HorizontalPostList from './horizontal-post-list';

describe('HorizontalPostList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HorizontalPostList />);
    expect(baseElement).toBeTruthy();
  });
});
