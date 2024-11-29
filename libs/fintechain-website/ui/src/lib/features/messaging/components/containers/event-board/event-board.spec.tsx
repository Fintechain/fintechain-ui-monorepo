import { render } from '@testing-library/react';

import EventBoard from './event-board';

describe('EventBoard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventBoard />);
    expect(baseElement).toBeTruthy();
  });
});
