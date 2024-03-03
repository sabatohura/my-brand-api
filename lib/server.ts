import app from "./index";
import dbConnect from "./config/db/index";
import { config } from "dotenv";

dbConnect();
config();
app.listen(process.env.PORT);
export default app;
