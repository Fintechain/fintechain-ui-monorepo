import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider, connect } from "react-redux";
import { RootState, Dispatch, store } from "@fintechain-monorepo/wordpress-data";
import App from './app/app';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>,
        </ThemeProvider>
    </StrictMode>
);
