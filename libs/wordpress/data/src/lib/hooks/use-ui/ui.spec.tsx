import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useUI from './ui';

describe('useUI', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useUI());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
