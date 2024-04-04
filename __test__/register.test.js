import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import Register from "../pages/register";

describe("Register Form", () => {
  test("render Every Field correctly", () => {
    render(<Register />);
    const nameElement = screen.getByRole("textbox", { name: "Name: *" });
    expect(nameElement).toBeInTheDocument();

    const userNameElement = screen.getByRole("textbox", {
      name: "Username: *",
    });
    expect(userNameElement).toBeInTheDocument();

    const numberElement = screen.getByRole("textbox", {
      name: "Number:",
    });
    expect(numberElement).toBeInTheDocument();

    const emailElement = screen.getByText(/email:/i);
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByLabelText(/password: \*/i);
    expect(passwordElement).toBeInTheDocument();

    const uploadImageElement = screen.getByLabelText(/image:/i);
    expect(uploadImageElement).toBeInTheDocument();
  });

  //Test 2 validation for Name element
  test("Show all Validation errors when user click on submit", async () => {
    render(<Register />);

    const signUpButton = screen.getByRole("button", { name: /Submit/i });
    await user.click(signUpButton);

    const userNameRequiredError = screen.getByText(/username is required/i);
    expect(userNameRequiredError).toBeInTheDocument();

    const firstNameRequiredError = screen.getByText(/first name is required/i);
    expect(firstNameRequiredError).toBeInTheDocument();

    const emailRequiredError = screen.getByText(/email is required/i);
    expect(emailRequiredError).toBeInTheDocument();

    const imageRequiredError = screen.getByText(/product image is required\./i);
    expect(imageRequiredError).toBeInTheDocument();
  });
});

describe("File Validation", () => {
  test("upload file present in dom", async () => {
    const file = new File(["test content"], "test-file.txt", {
      type: "text/plain",
    });

    render(<Register />);
    const uploadImageElement = screen.getByLabelText(/image:/i);
    await user.upload(uploadImageElement, file);
    expect(screen.getByDisplayValue(/test-file.txt/)).toBeInTheDocument();
  });

  test("display upload file type validation error", async () => {
    const file = new File(["test content"], "test-file.txt", {
      type: "text/plain",
    });

    render(<Register />);
    const uploadImageElement = screen.getByLabelText(/image:/i);
    await user.upload(uploadImageElement, file);
    expect(screen.getByDisplayValue(/test-file.txt/)).toBeInTheDocument();

    const signUpButton = screen.getByRole("button", { name: /Submit/i });
    await user.click(signUpButton);

    const imageRequiredError = screen.getByText(
      /only png, jpeg, gif supported/i
    );
    expect(imageRequiredError).toBeInTheDocument();
  });

  test("File Size validation", async () => {
    const file = new File([""], "darthvader.png");
    Object.defineProperty(file, "size", { value: 1024 * 1024 + 1 });

    render(<Register />);
    const uploadImageElement = screen.getByLabelText(/image:/i);
    await user.upload(uploadImageElement, file);

    const signUpButton = screen.getByRole("button", { name: /Submit/i });
    await user.click(signUpButton);

    const imageRequiredError = screen.getByText(/max 1 mb/i);
    expect(imageRequiredError).toBeInTheDocument();
  });
});
