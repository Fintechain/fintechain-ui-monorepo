import { render } from '@testing-library/react';

import TagCloud from './tag-cloud';

describe('TagCloud', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TagCloud />);
    expect(baseElement).toBeTruthy();
  });
});
