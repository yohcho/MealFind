import axios from "axios"

const getData = async()=>{
    console.log("hi")
    const config = {
        method: 'get',
        url: 'http://localhost:5000/api/scrape'
    }
    const res = await axios(config)
    console.log(res.data)
}

export default getData