import express from "express";

import serverRenderer from '../middleware/renderer';
import configureStore from '../../src/store/configureStore';
import { setData } from '../../src/store/appReducer';

const router = express.Router();
const path = require("path");

const axios = require('axios');


const intialPageWithData = (req, res, next) => {
    axios.get('https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6')
        .then(response => {
            console.log(response.data.products);
            const store = configureStore();
            store.dispatch(setData(response.data.products));
            serverRenderer(store)(req, res, next);
        })
        .catch(error => {
            console.error("ERROR WHILE GETTING DATA", error);
        });
};


// root (/) should always serve our server rendered page
router.use('^/$', intialPageWithData);

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', '..', 'build'),
    { maxAge: '30d' },
));

export default router;