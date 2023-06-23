import React, { StrictMode } from 'react';
import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from 'src/client/App';

async function handleRender(req: Request, res: Response) {
    const indexFile = path.resolve('./src/index.html');

    const reactHtml = ReactDOMServer.renderToString(
        <StrictMode>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </StrictMode>
    );

    try {
        const data = fs.readFileSync(indexFile, 'utf-8');

        res.send(
            data.replace('<div id="root">', `<div id="root">${reactHtml}`)
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Serverside error.');
    };
}

const app = express();

app.use('/dist', express.static('./dist'));

app.get('*', handleRender);

const port = process.env['APP_PORT'] || 3000;
app.listen(port);
console.log(`App is running on port ${port}`);
