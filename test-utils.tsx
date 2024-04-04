import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { SessionProvider } from "next-auth/react";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <SessionProvider
          session={{
            session: {
              status: "authenticated",
              user: { name: "Goku" },
            },
          }}
        >
          {children}
        </SessionProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
