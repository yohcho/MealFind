const axios = require("axios")
const cheerio = require("cheerio")

const Food_Items = require('../models/foodItemsSchema')

//direct functions
const getData = async(req,res) => {
    const data = await Food_Items.find({availability: {$ne: []}})
    res.status(200).json({data:data})
}


//helper functions
const initializeDatabase = async() => {
    const diningHalls = [
        "bursley",
        "east-quad",
        "markley",
        "mosher-jordan",
        "north-quad",
        "south-quad",
        "twigs-at-oxford"
    ]
    let counter = 0;
    const scrapedData = new Map()
    for(let i = 0; i<15; i++){
        for(const diningHall of diningHalls){
            const today = new Date()
            today.setHours(today.getHours()-5)
            today.setDate(today.getDate()+i)
            const currUrl = `https://dining.umich.edu/menus-locations/dining-halls/${diningHall}/?menuDate=${today.toISOString().split('T')[0]}`
            const res = await axios.get(currUrl)
            const $=cheerio.load(res.data)
            const courses = $(".calhours li")
            const coursesList = []
            courses.each(function(){
                const name = $(this).find(".calhours-title").text()
                const time = $(this).find(".calhours-times").text()
                if(name==="" && time==="")
                    return false
                coursesList.push(`${name}: ${time}`)
            })
            if(coursesList.length===0)
                continue
            const sections = $(".courses")
            let j = 0;
            sections.each(async function(){
                const items = $(this).find(".item-name")
                items.each(async function(){
                    counter++
                    const name = this.children[0].data.trim()
                    if(scrapedData.has(name)){
                        scrapedData.get(name).push({
                            date:today.toISOString().split('T')[0],
                            location:diningHall,
                            course:coursesList[j]
                        })
                    }
                    else{
                        scrapedData.set(name, [{
                            date:today.toISOString().split('T')[0],
                            location:diningHall,
                            course:coursesList[j]
                        }])
                    }
                })
                j++;
            })
        }
    }
    await Food_Items.deleteMany({})
    for(let [key,value] of scrapedData){
        await addNewMeal({
            name:key,
            availability:value
        })
    }
}

const addNewMeal = async (meal)=>{
    const check = await Food_Items.find({name:meal.name})
    if(check.length==0){
        await Food_Items.create(meal)
    }
    else{
        await Food_Items.updateOne(
            {name:meal.name},
            {$push:{
                availability:{
                    date:meal.availability.date,
                    location:meal.availability.location,
                    course:meal.availability.course
                }
            }}
        )
    }
}

module.exports = {getData}