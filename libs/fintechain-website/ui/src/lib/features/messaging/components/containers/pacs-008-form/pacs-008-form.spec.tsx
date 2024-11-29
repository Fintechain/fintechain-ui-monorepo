import { render } from '@testing-library/react';

import Pacs008Form from './pacs-008-form';

describe('Pacs008Form', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pacs008Form />);
    expect(baseElement).toBeTruthy();
  });
});
