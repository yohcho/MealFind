//exploring options for web scraping directly from the front end so as to not have to worry about hosting a backend as well
import axios from 'axios';

const fetchData = async () => {
    const response = await axios.get(
      'https://api.webscrapingapi.com/v1?api_key=LbIMWiKwdwPgXx2nYAlC0QLevucdXRBV&url=https://dining.umich.edu/menus-locations/dining-halls/bursley/?menuDate=2023-02-15'
    )
    const arr = response.data.split('class="courses"')
    console.log(arr)
};

export default fetchData