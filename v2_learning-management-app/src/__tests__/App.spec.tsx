import App from "../App";
import { render, screen } from "@testing-library/react";

describe("title", () => {
  it("should render title", () => {
    render(<App />);
    expect(screen.getByText("v2_LEARNING_MANAGEMENT_APPP")).toBeInTheDocument();
  });
});