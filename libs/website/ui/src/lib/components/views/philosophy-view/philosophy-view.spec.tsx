import { render } from '@testing-library/react';

import PhilosophyView from './philosophy-view';

describe('PhilosophyView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhilosophyView />);
    expect(baseElement).toBeTruthy();
  });
});
