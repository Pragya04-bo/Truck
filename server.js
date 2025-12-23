import app from "./index.js";
import dotenv from "dotenv";


dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`server running on port http://localhost:${process.env.PORT}`);
}); 