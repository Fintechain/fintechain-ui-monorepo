import { render } from '@testing-library/react';

import Philosophy from './philosophy';

describe('Philosophy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Philosophy />);
    expect(baseElement).toBeTruthy();
  });
});
