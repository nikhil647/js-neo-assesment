import { render, screen } from "@testing-library/react";
import { renderHook, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
// import user from "@testing-library/user-event";
// import Register from "../pages/register";
// import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Header from "../Components/Header";

describe("Sign In", () => {
  it("Sign In working ", async () => {
    render(
      <SessionProvider
        session={{
          expires: "1",
          user: {
            email: "goku@yopmail.com",
            name: "Goku",
            image:
              "http://localhost:3000/uploads/1700298964988-8705cc7afba8d66989d0a04c0e31cce1.jpg",
          },
        }}
      >
        <Header />
      </SessionProvider>
    );

    await waitFor(() => expect(screen.queryByText("Goku")).toBeInTheDocument());
  });
});
