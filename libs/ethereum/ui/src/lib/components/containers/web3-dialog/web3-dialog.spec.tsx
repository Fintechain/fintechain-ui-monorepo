import { render } from '@testing-library/react';

import Web3Dialog from './web3-dialog';

describe('Web3Dialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Web3Dialog />);
    expect(baseElement).toBeTruthy();
  });
});
