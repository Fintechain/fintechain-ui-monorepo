import { render } from '@testing-library/react';

import Join from './join';

describe('Join', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Join />);
    expect(baseElement).toBeTruthy();
  });
});
