import { render } from '@testing-library/react';

import NeedsPage from './needs-page';

describe('NeedsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeedsPage />);
    expect(baseElement).toBeTruthy();
  });
});
