import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
// import { apiSlice } from "./app/api/apiSlice";
import { taskSlice } from "./redux/tasks";

import { setupStore } from "./redux/store";
import { server } from "./mock/api/server";
const store = setupStore({});
export {};

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  //store.dispatch(taskSlice.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
