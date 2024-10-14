import { render } from '@testing-library/react';

import SinglePage from './single-page';

describe('SinglePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SinglePage />);
    expect(baseElement).toBeTruthy();
  });
});
