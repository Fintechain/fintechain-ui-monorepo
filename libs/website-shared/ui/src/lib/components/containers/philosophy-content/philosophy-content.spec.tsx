import { render } from '@testing-library/react';

import PhilosophyContent from './philosophy-content';

describe('PhilosophyContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhilosophyContent />);
    expect(baseElement).toBeTruthy();
  });
});
