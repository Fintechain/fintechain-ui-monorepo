import { render } from '@testing-library/react';

import TokenForm from './token-form';

describe('TokenForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TokenForm />);
    expect(baseElement).toBeTruthy();
  });
});
