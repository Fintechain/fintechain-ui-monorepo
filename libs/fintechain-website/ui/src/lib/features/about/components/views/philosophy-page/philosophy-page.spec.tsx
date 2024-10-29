import { render } from '@testing-library/react';

import PhilosophyPage from './philosophy-page';

describe('PhilosophyPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhilosophyPage />);
    expect(baseElement).toBeTruthy();
  });
});
