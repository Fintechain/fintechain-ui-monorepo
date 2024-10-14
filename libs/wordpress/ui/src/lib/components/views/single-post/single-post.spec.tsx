import { render } from '@testing-library/react';

import SinglePost from './single-post';

describe('SinglePost', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SinglePost />);
    expect(baseElement).toBeTruthy();
  });
});
