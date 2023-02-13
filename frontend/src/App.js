import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"
import logo from "./logo.png"

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
          <div key={key} className="display-item">
            {key[0].toUpperCase()+key.substring(1)}
            <div className="display-item-view">
                {"View Availability"}
                <div className="display-item-availability">
                  {
                    value.availability.map(el=>{
                      return (
                        <p>
                          {`${el.location[0].toUpperCase()+el.location.substring(1)}- ${el.date.split("T")[0]}- ${el.course}`}
                        </p>
                      )
                    })
                  }
                </div>
              </div>
          </div>
        )
      }
    }
    else{
      for(let [key,value] of data){
        if(key.toLowerCase().includes(query.toLowerCase()))
          display.push(
            <div key={key} className="display-item">
              {key[0].toUpperCase()+key.substring(1)}
              <div className="display-item-view">
                {"View availability"}
                <div className="display-item-availability">
                  {
                    value.availability.map(el=>{
                      return (
                        <p>
                          {`${el.location[0].toUpperCase()+el.location.substring(1)}- ${el.date.split("T")[0]}- ${el.course}`}
                        </p>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          )
      }
    }
    
    return(
      <div className="display">
        {display.length!==0 ? display : <p>No items found</p>}
      </div>
    )
  }

  const searchBar=()=>{
    return(
      <div className="searchbar">
        <img className="searchbar-icon" src={logo}/>
        <input placeholder="Search" onChange={(e)=>setQuery(e.target.value)}/>
        <div className="searchbar-filter">
          Filter by:
          <div className="searchbar-filter-dh">
            
          </div>
          <div className="searchbar-filter-meals">

          </div>
          <div className="searchbar-filter-date">

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {searchBar()}
      {displayInfo()}
    </div>
  );
}

export default App;
