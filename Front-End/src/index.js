import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import './style.css';
import AppRouter from "./routers/AppRouter";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./stores/configureStore";

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(
    <React.StrictMode>{jsx}</React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
