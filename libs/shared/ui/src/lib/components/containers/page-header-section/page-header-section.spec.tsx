import { render } from '@testing-library/react';

import PageHeaderSection from './page-header-section';

describe('PageHeaderSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageHeaderSection />);
    expect(baseElement).toBeTruthy();
  });
});
