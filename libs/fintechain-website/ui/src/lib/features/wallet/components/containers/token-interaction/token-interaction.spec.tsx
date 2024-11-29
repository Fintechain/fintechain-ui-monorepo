import { render } from '@testing-library/react';

import TokenInteraction from './token-interaction';

describe('TokenInteraction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenInteraction />);
    expect(baseElement).toBeTruthy();
  });
});
