import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ThoughtList from "./components/ThoughtList"; 
import "./index.css";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/saved-thoughts" element={<ThoughtList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
