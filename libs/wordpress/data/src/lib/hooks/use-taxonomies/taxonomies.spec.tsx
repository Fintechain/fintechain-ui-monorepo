import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useTaxonomies from './taxonomies';

describe('useTaxonomies', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useTaxonomies());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
