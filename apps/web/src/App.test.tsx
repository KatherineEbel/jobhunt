import React from "react";
import { render, screen } from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom'
import App from "./App";

test("renders correct heading", () => {
  render(<App />, { wrapper: BrowserRouter});
  const heading = screen.getByText(/jobhunt/i);
  expect(heading).toBeInTheDocument();
});
