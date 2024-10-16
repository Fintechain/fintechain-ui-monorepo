import { render } from '@testing-library/react';

import NotificationSection from './notification-section';

describe('NotificationSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationSection />);
    expect(baseElement).toBeTruthy();
  });
});
