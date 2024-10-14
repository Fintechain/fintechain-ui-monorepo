import { render } from '@testing-library/react';

import UiSection from './ui-section';

describe('UiSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiSection />);
    expect(baseElement).toBeTruthy();
  });
});
