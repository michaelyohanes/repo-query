import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.querySelector('#root');

if (!rootElement) {
    throw new Error('Failed to find the root element');
}

hydrateRoot(rootElement,
    <StrictMode>
        <App />
    </StrictMode>
);
