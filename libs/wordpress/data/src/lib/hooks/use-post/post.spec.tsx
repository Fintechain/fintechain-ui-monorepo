import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePost from './post';

describe('usePost', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePost());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
