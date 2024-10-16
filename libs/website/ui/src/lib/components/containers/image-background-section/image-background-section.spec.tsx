import { render } from '@testing-library/react';

import ImageBackgroundSection from './image-background-section';

describe('ImageBackgroundSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageBackgroundSection />);
    expect(baseElement).toBeTruthy();
  });
});
