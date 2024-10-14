import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePages from './pages';

describe('usePages', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePages());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
