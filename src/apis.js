const express = require("express");
const { mangalivre, pinterest } = require ("./functions");

const router = express.Router()

router.get("/mangalivre", (req, res) => {
    manga = req.query.query;
    if (!manga) return res.json({error: "parâmetros incorretos"})
    var ress = mangalivre(`https://mangalivre.tv/?s=${manga.replace(" ", "+")}&post_type=wp-manga`).then((result) => {
        res.json(result)
    })
})
router.get("/pinterest", (req, res) => {
    query = req.query.query;
    if (!query) return res.json({error: "parâmetros incorretos"})
    var ress = pinterest(`https://br.pinterest.com/${query}/`).then((result) => {
        res.json((result.profileURL === null && result.userName === null && result.accountName === null && result.bio === null) ? {error: "Não econtrado ou a conta é privada"} : result)
    })
})
module.exports = router