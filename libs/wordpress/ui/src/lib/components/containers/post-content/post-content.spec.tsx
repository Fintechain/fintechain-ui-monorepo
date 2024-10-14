import { render } from '@testing-library/react';

import PostContent from './post-content';

describe('PostContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostContent />);
    expect(baseElement).toBeTruthy();
  });
});
