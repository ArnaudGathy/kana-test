import React from "react";
import { createRoot } from 'react-dom';
import { App } from "./App";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./styles/style.css";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
