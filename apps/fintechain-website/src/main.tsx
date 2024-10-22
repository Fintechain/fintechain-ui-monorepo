import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider, connect } from "react-redux";
import App from './app/app';
import NxWelcome from './app/nx-welcome';
import { container } from './app/container';
import { Provider as InversifyProvider } from 'inversify-react';
import { store } from '@fintechain-monorepo/page-architect';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                {/* <App /> */}

                <InversifyProvider container={container}>
                    <NxWelcome title={'Use Data hook'} />
                </InversifyProvider>
            </Provider>,
        </ThemeProvider>
    </StrictMode>
);
