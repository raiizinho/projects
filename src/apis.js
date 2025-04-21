const express = require("express");
const router = express.Router()

router.get("/mangalivre", (req, res) => {
    res.json({testando: "ainda"})
})

module.exports = router;