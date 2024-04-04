import connectMongo from "../../../utils/connectMongo";
const tasks = require("../../../models/tasksModels");
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
/**
 *
 * Get & Post req for tasks
 */
export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
  } catch (err) {
    console.log(err);
  }

  const { method } = req;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    switch (method) {
      case "GET":
        // Get data from your database.
        console.log("getting call from test env ?");
        const allTasks = await tasks
          .find({ user_id: session.id })
          .sort({ createdAt: -1 });
        res.status(200).json(allTasks);
        break;
      case "POST":
        // add to the database
        const { title, date, priorityValue, stage } = req.body;
        try {
          const dbtask = await tasks.create({
            title,
            date,
            priorityValue,
            stage,
            user_id: session.id,
          });
          res.status(200).json(dbtask);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    // Not Signed in
    res.status(401).json({ error: "Auth Required" });
    return;
  }
}
