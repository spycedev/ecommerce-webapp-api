import express from "express";
import cors from "cors";
import { fileUpload } from "express-fileupload";
import PRODUCT_ROUTES from "./routes/productRoutes";
import { selectUser } from "./queries/userQueries";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);

// Route for signing in as admin
app.post("/login", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  // Updating to async code allow for more readable code without so many callback functions
  const userExists = await selectUser(username, password);

  // If user is false (null), send a response to the front end saying unauthorzied.
  if (!userExists)
    return response.status(401).send({ message: "Not Authorized" });

  // I'm just sending full user to front end
  // In production this would be an authToken of sorts.
  response.send(userExists);
});

app.use("/products", PRODUCT_ROUTES);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
