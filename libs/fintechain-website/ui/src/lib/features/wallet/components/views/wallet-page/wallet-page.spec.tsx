import { render } from '@testing-library/react';

import WalletPage from './wallet-page';

describe('WalletPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WalletPage />);
    expect(baseElement).toBeTruthy();
  });
});
