import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useTags from './tags';

describe('useTags', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useTags());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
