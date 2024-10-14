import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePosts from './posts';

describe('usePosts', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePosts());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
