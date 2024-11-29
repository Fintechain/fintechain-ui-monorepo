import "reflect-metadata";
import { StrictMode } from 'react';
import { Provider } from "react-redux";
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider as InversifyProvider } from 'inversify-react';

import App from './app/app';
import { store } from "./app/store";
import { container } from './app/container';
import { WalletProvider } from "@fintechain-monorepo/ethereum-ui";
import { AssetProvider } from "@fintechain-monorepo/fintechain-website-ui";

console.log(import.meta.env.VITE_BASE_APP_API_URL)
console.log(import.meta.env.VITE_QT_API_URL)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <AssetProvider>
            <WalletProvider>
                <ThemeProvider>
                    <Provider store={store}>

                        <InversifyProvider container={container}>
                            <App />
                        </InversifyProvider>
                    </Provider>
                </ThemeProvider>
            </WalletProvider>
        </AssetProvider>
    </StrictMode>
);
