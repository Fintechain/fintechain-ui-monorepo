import { render } from '@testing-library/react';

import Pacs008Page from './pacs-008-page';

describe('Pacs008Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pacs008Page />);
    expect(baseElement).toBeTruthy();
  });
});
