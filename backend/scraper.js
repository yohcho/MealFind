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
        const allMeals = []
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
                        allMeals.push({
                            name:this.children[0].data.trim(),
                            date:today.toISOString().split('T')[0],
                            location:diningHall
                        })
                    })
                    byDay.push(set)
                })
                byDiningHall.push(byDay)
            }
            all[diningHall] = byDiningHall
        }
        return allMeals
    }
    catch(error){
        console.log(error)
    }
}

module.exports = scrape;