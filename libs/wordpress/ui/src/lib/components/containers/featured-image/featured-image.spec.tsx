import { render } from '@testing-library/react';

import FeaturedImage from './featured-image';

describe('FeaturedImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeaturedImage />);
    expect(baseElement).toBeTruthy();
  });
});
