import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { InternalLink } from "~/components/InternalLink";

describe("InternalLink", () => {
  test("renders link", () => {
    render(<InternalLink to="/">Test internal link</InternalLink>, {
      wrapper: BrowserRouter,
    });

    expect(
      screen.getByRole("link", { name: "Test internal link" })
    ).toBeDefined();
  });
});
