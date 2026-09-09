import { render, screen } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import { EmployeeLoader } from './EmployeeLoader';

describe("EmployeeLoader", () => {
  it("renders the loading state initially", () => {
    render(<EmployeeLoader />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it('renders employee loaded', async () => {
    render(<EmployeeLoader />);

    expect(await screen.findByText("Employee loaded")).toBeInTheDocument();
  });
})