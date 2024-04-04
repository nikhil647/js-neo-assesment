import connectMongo from "../../../utils/connectMongo";
const User = require("../../../models/userModel");

export default async function handler(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
  } catch (err) {
    console.log(err);
  }

  const { method } = req;

  switch (method) {
    case "GET":
      // Get data from your database.
      //   const allTasks = await tasks.find({}).sort({ createdAt: -1 });
      //   res.status(200).json(allTasks);
      break;
    case "POST":
      // add to the database
      const { name, username, email, password, number, profilepath } = req.body;

      try {
        const user = await User.signup(
          name,
          username,
          email,
          password,
          number,
          profilepath
        );        

        res.status(200).json({ message: "User Created" });
        
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    // case "PATCH":
    //   // Modify Data into Database.
    //   const { id } = req.params;

    //   try {
    //     if (!mongoose.Types.ObjectId.isValid(id)) {
    //       return res.status(404).json({ error: "No such task" });
    //     }
    //     const dbtask = await tasks.findById(id);
    //     if (!dbtask) {
    //       return res.status(404).json({ error: "No such task" });
    //     }
    //     res.status(200).json(dbtask);
    //   } catch (error) {
    //     res.status(400).json({ error: error.message });
    //   }
    //   break;
    // case "DELETE":
    //   // Delete Data from Database.
    //   const { id: _id } = req.params;
    //   if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ error: "No such task" });
    //   }
    //   const dbtask = await tasks.findOneAndDelete({ _id: _id });
    //   if (!dbtask) {
    //     return res.status(400).json({ error: "No such workout" });
    //   }
    //   res.status(200).json(dbtask);
    //   break;
    default:
      res.setHeader("Allow", ["GET,POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
