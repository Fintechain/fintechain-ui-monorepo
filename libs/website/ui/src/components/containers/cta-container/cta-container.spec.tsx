import { render } from '@testing-library/react';

import CtaContainer from './cta-container';

describe('CtaContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CtaContainer />);
    expect(baseElement).toBeTruthy();
  });
});
