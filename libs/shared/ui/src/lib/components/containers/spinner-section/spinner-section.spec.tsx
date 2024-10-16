import { render } from '@testing-library/react';

import SpinnerSection from './spinner-section';

describe('SpinnerSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpinnerSection />);
    expect(baseElement).toBeTruthy();
  });
});
