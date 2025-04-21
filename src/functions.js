const cheerio = require("cheerio");
const axios = require("axios");

const mangalivre = async (query) => {
        var dados = [{resultados: 0}]
        var res = await axios.get(query);
    
        const $ = cheerio.load(res.data)
    
        $("div.manga__item").each((i, e) => {
            const url = $(e).find(".manga__thumb > div > a").attr("href")
            const title = $(e).find(".manga__content > div > div > h2 > a").text().replace(/[\t\n]/g, '')
            const sinopse = $(e).find(".manga__content > div > div > div > p").text()
            const chapters = Number($(e).find(".manga__content > div > div > div > span").text().slice(0, 2))
            const genres = $(e).find(".manga__content > div > div > span > span > a").text().match(/([A-ZÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ][a-záàâãéèíïóôõöúçñ]+(?:\s[A-ZÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ][a-záàâãéèíïóôõöúçñ]+)*)/g); //match desgraçado pois os gêneros estavam vindo tudo junto 
            dados.push({ res: {title, url, sinopse, chapters, genres} })
        })
        // apenas para pegar a quantidade de resultados encontrados
        $("div.manga__item").each((i, e) => {
            dados[0].resultados++
        })
        return dados    
    }

    const pinterest = async (query) => {
        const responseData = await axios.get(query, {
                headers: {
                    "Accept-Language": "pt-BR"
                }
            });
            var dados = {
                profileURL: null,
                userName: null,
                accountName: null,
                bio: null
            }
            const $ = cheerio.load(responseData.data);
            
            $("div.Jea.KS5.a3i").each((i, e) => { // informações do usuário
                const profilePic = $(e).find(".S9z > div > div > div > div > img").attr("src");
                const userName = $(e).find(".qGb.zI7 > div.S9z > h1 > div").text();
                const accountName = $(e).find(".qGb.zI7 > div.KS5 > div > div > span").text();
                const bio = $(e).find(".qGb.zI7 > div.S9z.eEj > div > div > div > div > span").text();
                dados.profileURL = profilePic;
                dados.userName = userName;
                dados.accountName = accountName;
                dados.bio = (bio == '') ? null : bio;
            })
            return dados
        }

module.exports = { mangalivre, pinterest }