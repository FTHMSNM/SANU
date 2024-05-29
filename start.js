
const app = require("./server")
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`,)
});
