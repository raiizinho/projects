const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const apiRoute = require("./src/apis")

app.set("json spaces", 4)
app.use("/api", apiRoute)

app.get("/", (req, res) => {
    res.json({working: true})
})

app.listen(port, () => {
    console.log("rodando")
})