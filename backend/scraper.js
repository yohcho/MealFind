const axios = require("axios")
const cheerio = require("cheerio")

const diningHalls = [
    "bursley",
    "east-quad",
    "markley",
    "mosher-jordan",
    "north-quad",
    "south-quad",
    "twigs-at-oxford"
]

const scrape = async()=>{
    try{
        const all = {}
        for(const diningHall of diningHalls){
            const url = `https://dining.umich.edu/menus-locations/dining-halls/${diningHall}/?menuDate=`
            const byDiningHall = []
            for(let i = 0; i<15; i++){
                const today = new Date()
                today.setDate(today.getDate()+i)
                const currUrl = url + today.toISOString().split('T')[0]
                const res = await axios.get(currUrl)
                const $=cheerio.load(res.data)
                const sections = $(".courses")
                const byDay = []
                sections.each(function(){
                    const items = $(this).find(".item-name")
                    const set = []
                    items.each(function(){
                        set.push(this.children[0].data.trim())
                    })
                    byDay.push(set)
                })
                byDiningHall.push(byDay)
            }
            console.log(diningHall)
            all[diningHall] = byDiningHall
        }
        return all
    }
    catch(error){
        console.log(error)
    }
}

module.exports = scrape;