import { useEffect, useState, useRef } from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  
  useEffect(()=>{
    const getData = async()=>{
      const config = {
          method: 'get',
          url: 'http://localhost:5000/api/getData'
      }
      const res = await axios(config)
      const map = new Map(res.data.data.map(item=> [item.name, {
          availability:item.availability,
          _id:item._id
      }]))
      setData(map)
    }
    getData()
  },[])

  const displayInfo=()=>{
    const display = []
    if(query === ""){
      for(let [key,value] of data){
        display.push(
          <div key={key}>{key}</div>
        )
      }
    }
    else{
      for(let [key,value] of data){
        if(key.toLowerCase().includes(query.toLowerCase()))
          display.push(
            <div>{`${key}`}</div>
          )
      }
    }
    return(
      <div>
        {display}
      </div>
    )
  }

  return (
    <div className="App">
      <input onChange={(e)=>setQuery(e.target.value)}/>
      {displayInfo()}
    </div>
  );
}

export default App;
