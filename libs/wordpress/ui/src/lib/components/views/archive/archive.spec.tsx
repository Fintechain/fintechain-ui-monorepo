import { render } from '@testing-library/react';

import Archive from './archive';

describe('Archive', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Archive />);
    expect(baseElement).toBeTruthy();
  });
});
