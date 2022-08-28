import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders a button", () => {
  render(<Button action={"SEND"} placeholder="enter your name" />);
  const element = screen.findAllByPlaceholderText("enter your name");
  expect(element).toBeDefined();
});
