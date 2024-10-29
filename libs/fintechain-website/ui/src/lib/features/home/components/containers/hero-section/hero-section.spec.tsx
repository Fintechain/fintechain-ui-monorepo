import { render } from '@testing-library/react';

import HeroSection from './hero-section';

describe('HeroSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeroSection />);
    expect(baseElement).toBeTruthy();
  });
});
