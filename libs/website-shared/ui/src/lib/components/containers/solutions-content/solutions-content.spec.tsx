import { render } from '@testing-library/react';

import SolutionsContent from './solutions-content';

describe('SolutionsContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SolutionsContent />);
    expect(baseElement).toBeTruthy();
  });
});
