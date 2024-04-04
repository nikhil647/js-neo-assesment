import { render, screen, waitFor } from "@testing-library/react"; // "../test-utils.tsx";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import AddEditWidget from "../Components/AddEditWidget";
//import Dashboard from "../pages/dashboard";
import { renderWithProviders } from "../test-utils.tsx";

describe("Widget elements", () => {
  test("render Every Field correctly in AddEditWidget", async () => {
    const { getByText, debug } = renderWithProviders(<AddEditWidget />);

    await waitFor(() => {
      const titleElement = getByText(/title/i);
      expect(titleElement).toBeInTheDocument();

      const calendarElement = getByText(/deadline date/i);
      expect(calendarElement).toBeInTheDocument();

      const PriorityElement = getByText(/priority/i);
      expect(PriorityElement).toBeInTheDocument();
    });
  });
});
