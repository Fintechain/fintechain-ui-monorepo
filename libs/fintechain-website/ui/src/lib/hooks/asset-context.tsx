import { createContext, useContext, ReactNode } from 'react';
import { assets, AssetsType } from '../../../../../../apps/fintechain-website/src/assets';

const AssetContext = createContext<AssetsType | undefined>(undefined);

export function AssetProvider({ children }: { children: ReactNode }) {
  return (
    <AssetContext.Provider value={assets}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
    const context = useContext(AssetContext);
    if (context === undefined) {
        throw new Error('useAssets must be used within an AssetProvider');
    }
    return context;
}

// Optional: Create specific hooks for different asset types
export function useImages() {
    const assets = useAssets();
    return assets.images;
}