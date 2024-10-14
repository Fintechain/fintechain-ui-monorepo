import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useSearch from './search';

describe('useSearch', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
