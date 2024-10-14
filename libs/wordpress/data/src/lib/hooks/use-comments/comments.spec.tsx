import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useComments from './comments';

describe('useComments', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useComments());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
