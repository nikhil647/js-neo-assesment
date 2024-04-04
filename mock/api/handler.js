import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:3000/api/tasks", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          title: "cake",
          date: "2023-11-23T14:36:43.000Z",
          stage: 0,
          priorityValue: "Medium",
          user_id: "655880d5cac7c768f2b54920",
          _id: "655a1d86b38ec176195768d5",
          createdAt: "2023-11-19T14:36:54.875Z",
          updatedAt: "2023-11-19T14:36:54.875Z",
          __v: 0,
        },
      ]),
      ctx.delay(0)
    );
  }),
  rest.get("http://localhost:3000/api/tasks", (req, res, ctx) => {
    // successful response
    return res(
      ctx.status(200),
      ctx.json([
        {
          createdAt: "2023-11-18T14:37:21.915Z",
          date: "2023-11-18T14:36:19.388Z",
          priorityValue: "Low",
          stage: 0,
          title: "cc",
          updatedAt: "2023-11-18T14:37:21.915Z",
          user_id: "655880d5cac7c768f2b54920",
          __v: 0,
          _id: "6558cc21735e124e35eb8d5e",
        },
      ]),
      ctx.delay(0)
    );
  }),
  rest.get("http://localhost:3000/api/auth/session", (req, res, ctx) => {
    // successful response
    return res(
      ctx.status(200),
      ctx.json([
        {
          user: {
            name: "Goku",
            email: "goku@yopmail.com",
          },
          expires: "2023-12-19T06:45:26.558Z",
          id: "655880d5cac7c768f2b54920",
          profilepath:
            "/uploads/1700298964988-8705cc7afba8d66989d0a04c0e31cce1.jpg",
        },
      ]),
      ctx.delay(30)
    );
  }),
];

/*
 // rest.post("http://localhost:3000/api/tasks")
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    // successful response
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: "Xabi Alonzo" },
        { id: 2, name: "Lionel Messi" },
        { id: 3, name: "Lionel Love" },
        { id: 4, name: "Lionel Poe" },
        { id: 5, name: "Lionel Gink" },
      ]),
      ctx.delay(30)
    );
  }),
 */
