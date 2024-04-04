import connectMongo from "../../../utils/connectMongo";
const tasks = require("../../../models/tasksModels");
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import mongoose from "mongoose";
/**
 * Id for task patch & delete req
 */
export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
  } catch (err) {
    console.log(err);
  }

  const {
    method,
    query: { id },
  } = req;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    switch (method) {
      case "PATCH":
        // Modify Data into Database.
        try {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such task" });
          }
          const dbtask = await tasks.findOneAndUpdate(
            { _id: id },
            {
              ...req.body,
            }
          );
          if (!dbtask) {
            return res.status(404).json({ error: "No such task" });
          }

          res.status(200).json(dbtask);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
        break;
      case "DELETE":
        // Delete Data from Database.
        //const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "No such task" });
        }
        const dbtask = await tasks.findOneAndDelete({ _id: id });
        if (!dbtask) {
          return res.status(400).json({ error: "No such workout" });
        }
        res.status(200).json(dbtask);
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    // Not Signed in
    res.status(401);
    return;
  }
}
