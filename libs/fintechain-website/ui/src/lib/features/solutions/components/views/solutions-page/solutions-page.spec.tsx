import { render } from '@testing-library/react';

import SolutionsPage from './solutions-page';

describe('SolutionsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SolutionsPage />);
    expect(baseElement).toBeTruthy();
  });
});
