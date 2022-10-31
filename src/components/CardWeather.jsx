import axios from 'axios'
import {useEffect,useState } from 'react'

const CardWeather = ( {lat, lon} ) => {

    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true)

    

    useEffect(() => {

        if(lon){
        const APIkey= '776141096ca902ceb47a780c0579b140' 
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    axios.get(URL)
    .then(res => {
      setWeather (res.data)
    const temp = {
      farenheit:  `${Math.round (res.data.main.temp -273.15)}°C`,  
      celsius: `${Math.round (res.data.main.temp - 273.15) * 9 / 5 + 32}°F`
    
    }

setTemperature(temp)

    }) 
    .catch(err=> console.log(err))
    }
    }, [lat, lon])

    console.log(weather)

    const handleClick = () => setIsCelsius(!isCelsius)
  return (
    <article className='all'>
      <h1 className='title'>WINDAPP</h1>
      <h2> {`${weather?.name}, ${weather?.sys.country}`} </h2>

      <div>

        <div className='icono'>
        <img src={ weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
        </div>

      <div>
        <h3> "{weather?.weather[0].description}" </h3>
      

      <ul className='list'>
        <li><span>Wind Speed </span> {weather?.wind.speed}m/s</li>
        <li><span>Clouds </span> {weather?.clouds.all}%</li>
        <li><span>Pressure </span> {weather?.main.pressure} hPa</li>
        
      </ul>
      </div>
      </div>
      <h2 className='tempnum'> {isCelsius ? temperature?.farenheit : temperature?.celsius } </h2>
      <button className='change' onClick={handleClick}> {isCelsius ? 'Change to °F' : 'Change to °C' } </button>


    </article>

  )
}

export default CardWeather