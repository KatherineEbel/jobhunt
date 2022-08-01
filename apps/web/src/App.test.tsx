import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders correct heading", () => {
  render(<App />);
  const heading = screen.getByText(/jobhunt/i);
  expect(heading).toBeInTheDocument();
});
