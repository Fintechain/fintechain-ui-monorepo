import { render } from '@testing-library/react';

import WpContent from './wp-content';

describe('WpContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WpContent />);
    expect(baseElement).toBeTruthy();
  });
});
