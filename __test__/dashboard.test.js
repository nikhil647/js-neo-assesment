import { render, screen, waitFor } from "@testing-library/react"; // "../test-utils.tsx";
import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { useGetTasksQuery } from "../redux/tasks";
import user from "@testing-library/user-event";
// import AddEditWidget from "../Components/AddEditWidget";
import Dashboard from "../pages/dashboard";
import { renderWithProviders } from "../test-utils.tsx";

describe("Widget elements", () => {
  test("resp coming from API rendering on dom", async () => {
    const { getByText, debug } = renderWithProviders(<Dashboard />);
    // await waitForNextUpdate();
    await act(async () => {
      await waitFor(() => {});
    });
    const titleElement = getByText(/cc/i);
    expect(titleElement).toBeInTheDocument();
  });
});
