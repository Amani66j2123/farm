import React from "react"; 
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../src/Components/About.jsx";
import '@testing-library/jest-dom';

describe("About Component", () => {
  // Test Case 1
  it("should render the main heading 'About Our Farm'", () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: /about our farm/i });
    expect(heading).toBeInTheDocument();
  });

  // Test Case 2
  it("should include welcome message text", () => {
    render(<About />);
    const welcomeText = screen.getByText(/welcome to our charming green farm/i);
    expect(welcomeText).toBeInTheDocument();
  });

  // Test Case 3
  it("should have a heading for 'Rental Pricing Details'", () => {
    render(<About />);
    const pricingHeading = screen.getByRole('heading', { name: /rental pricing details/i });
    expect(pricingHeading).toBeInTheDocument();
  });

  // Test Case 4
  it("should display the contact email", () => {
    render(<About />);
    const emailLink = screen.getByRole('link', { name: /greenFarm@gmail.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:greenFarm@gmail.com');
  });
});
