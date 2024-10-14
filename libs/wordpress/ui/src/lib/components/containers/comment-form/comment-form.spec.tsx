import { render } from '@testing-library/react';

import CommentForm from './comment-form';

describe('CommentForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentForm />);
    expect(baseElement).toBeTruthy();
  });
});
