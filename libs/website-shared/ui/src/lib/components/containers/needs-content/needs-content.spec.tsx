import { render } from '@testing-library/react';

import NeedsContent from './needs-content';

describe('NeedsContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeedsContent />);
    expect(baseElement).toBeTruthy();
  });
});
