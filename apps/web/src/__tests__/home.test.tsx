import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders booking call to action", () => {
    render(<HomePage />);
    expect(Boolean(screen.getByText(/Book a Lesson/i))).toBe(true);
  });
});
