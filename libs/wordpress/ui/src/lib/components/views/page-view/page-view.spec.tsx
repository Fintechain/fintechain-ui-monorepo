import { render } from '@testing-library/react';

import PageView from './page-view';

describe('PageView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageView />);
    expect(baseElement).toBeTruthy();
  });
});
