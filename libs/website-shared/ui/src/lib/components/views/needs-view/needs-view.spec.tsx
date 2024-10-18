import { render } from '@testing-library/react';

import NeedsView from './needs-view';

describe('NeedsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeedsView />);
    expect(baseElement).toBeTruthy();
  });
});
