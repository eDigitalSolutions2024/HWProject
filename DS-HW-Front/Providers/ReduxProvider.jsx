"use client";

import { store } from "../store/store.js";
import { Provider } from "react-redux";

const Providers = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers