import { render } from '@testing-library/react';

import SolutionsView from './solutions-view';

describe('SolutionsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SolutionsView />);
    expect(baseElement).toBeTruthy();
  });
});
