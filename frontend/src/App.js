import { useEffect } from "react"
import getData from "./scraper";

function App() {
  /*
  useEffect(()=>{
    getData()
  },[])
  */
  return (
    <div className="App">
      <button onClick={getData}>Test</button>
    </div>
  );
}

export default App;
