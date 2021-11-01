import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router'
import App from '../../src/App';

const path = require('path');
const fs = require('fs');

export default (store) => (req, res, next) => {
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if(err) {
            console.error('ERR', err);
            return res.status(404).end;
        }

        const context = {};

        const html = ReactDOMServer.renderToString(
            <ReduxProvider store={store}>
                <StaticRouter location={req.url} context={context}><App /></StaticRouter>
            </ReduxProvider>
        );

        const reduxState = JSON.stringify(store.getState());

        return res.send(
            htmlData
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${html}</div>`
                )
                .replace('"__SERVER_REDUX_STATE__"', reduxState)
        );
    });
}