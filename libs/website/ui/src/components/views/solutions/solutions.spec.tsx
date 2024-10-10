import { render } from '@testing-library/react';

import Solutions from './solutions';

describe('Solutions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Solutions />);
    expect(baseElement).toBeTruthy();
  });
});
