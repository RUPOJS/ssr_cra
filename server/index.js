import express from 'express';
import Loadable from 'react-loadable';

import indexController from './controller/index';

const port = 3000;

// initialize the application and create the routes
const app = express();

app.use(indexController);

// start the app
app.listen(port, (error) => {
    if(error) {
        return console.log('Some error occured while starting the server', error);
    }

    console.log("Server started on", port);
});