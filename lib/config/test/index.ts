import * as express from "express";

const app: express.Application = express();
app.listen(8000);
app.use(express.json());

export default app;
