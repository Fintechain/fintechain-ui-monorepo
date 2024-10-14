import { render } from '@testing-library/react';

import AuthorBio from './author-bio';

describe('AuthorBio', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthorBio />);
    expect(baseElement).toBeTruthy();
  });
});
