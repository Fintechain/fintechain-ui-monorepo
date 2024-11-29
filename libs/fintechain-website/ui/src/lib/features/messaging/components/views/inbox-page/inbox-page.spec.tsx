import { render } from '@testing-library/react';

import InboxPage from './inbox-page';

describe('InboxPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InboxPage />);
    expect(baseElement).toBeTruthy();
  });
});
