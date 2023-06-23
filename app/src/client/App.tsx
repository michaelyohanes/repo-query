import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Routes from './Routes';
import 'src/client/styling/body.scss';

export default function App() {
    const [isClient, setIsClient] = useState<boolean>(false);
    
    useEffect(() => {
        if (!isClient) {
            setIsClient(true);
        }
    })
    
    const router = isClient ? createBrowserRouter(Routes) : null;

    return (
        <>
            <CssBaseline />
            {!!router && <RouterProvider router={router} />}
        </>
    );
}