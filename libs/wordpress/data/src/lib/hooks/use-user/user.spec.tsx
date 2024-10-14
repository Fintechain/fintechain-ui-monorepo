import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUser from './user';

describe('useUser', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
