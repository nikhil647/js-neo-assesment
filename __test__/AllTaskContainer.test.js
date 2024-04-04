import { render, screen, waitFor } from "@testing-library/react"; // "../test-utils.tsx";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import AllTaskContainer from "../Components/AllTaskContainer.js";
//import Dashboard from "../pages/dashboard";
import { renderWithProviders } from "../test-utils.tsx";

const data = {
  createdAt: "2023-11-18T14:37:21.915Z",
  date: "2023-11-18T14:36:19.388Z",
  priorityValue: "Low",
  stage: 0,
  title: "cc",
  updatedAt: "2023-11-18T14:37:21.915Z",
  user_id: "655880d5cac7c768f2b54920",
  __v: 0,
  _id: "6558cc21735e124e35eb8d5e",
};

describe("Widget elements", () => {
  test("Data is loading in card container", async () => {
    const { getByText, debug } = renderWithProviders(
      <AllTaskContainer taskList={[data]} />
    );

    const titleElement = screen.getByText(/cc/i);
    expect(titleElement).toBeInTheDocument();

    const lowElement = screen.getByText(/low/i);
    expect(lowElement).toBeInTheDocument();
  });
});
