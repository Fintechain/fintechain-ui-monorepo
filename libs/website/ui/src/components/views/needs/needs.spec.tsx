import { render } from '@testing-library/react';

import Needs from './needs';

describe('Needs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Needs />);
    expect(baseElement).toBeTruthy();
  });
});
