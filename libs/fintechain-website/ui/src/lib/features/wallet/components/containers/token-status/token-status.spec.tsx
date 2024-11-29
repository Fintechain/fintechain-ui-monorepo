import { render } from '@testing-library/react';

import TokenStatus from './token-status';

describe('TokenStatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenStatus />);
    expect(baseElement).toBeTruthy();
  });
});
