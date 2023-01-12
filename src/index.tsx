import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles.css";
import {MantineProvider} from '@mantine/core';
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
            fontFamily: 'Poppins, sans-serif',
            colorScheme: 'dark',
            shadows: {
                md: '1px 1px 3px rgba(0, 0, 0, .25)',
                xl: '5px 5px 3px rgba(0, 0, 0, .25)',
            },
        }}>
        <App/>
    </MantineProvider>
);
