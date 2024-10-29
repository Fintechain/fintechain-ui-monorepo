import { render } from '@testing-library/react';

import Web3WalletsDialog from './web3-wallets-dialog';

describe('Web3WalletsDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Web3WalletsDialog />);
    expect(baseElement).toBeTruthy();
  });
});
