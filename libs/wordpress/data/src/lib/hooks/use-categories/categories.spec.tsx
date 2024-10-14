import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCategories from './categories';

describe('useCategories', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCategories());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
