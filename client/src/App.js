import React, { useState } from 'react';
import axios from "axios";
import Map from "./components/Map";

const App = () => {
  const [form, setForm] = useState({
    lat1: '', lon1: '', lat2: '', lon2: ''
  })
  const [distance, setDistance] = useState("")
  const [showMap, setShowMap] = useState(false)

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (isNaN(form.lat1) || isNaN(form.lat2) || isNaN(form.lon1) || isNaN(form.lon2)){
      return
    }
    if (!form.lat1.length || !form.lat2.length || !form.lon1.length || !form.lon2.length){
      return;
    }
    if (!isFinite(form.lat1) || !isFinite(form.lat2) || !isFinite(form.lon1) || !isFinite(form.lon2))
    {
      return;
    }
    if (form.lat1.trim() && form.lat2.trim() && form.lon1.trim() && form.lon2.trim()){
      axios({
        method: 'post',
        url: '/coordinates',
        data: form,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
        .then(function (response) {
          console.log(response)
          const data = response.data.distance.toFixed(1)
          console.log(data)
          setDistance(data)
          setShowMap(true)
        })
    }
  }


  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <div className='inputWrapper'>
          <div className='labelWrapper'>
            <label>
              Latitude 1:
              <input type="text" name='lat1' value={form.lat1} onChange={handleChange} />
            </label>
            <label>
              Longitude 1:
              <input type="text" name='lon1' value={form.lon1} onChange={handleChange} />
            </label>
          </div>
          <div className='labelWrapper'>
            <label>
              Latitude 2:
              <input type="text" name='lat2' value={form.lat2} onChange={handleChange}/>
            </label>
            <label>
              Longitude 2:
              <input type="text" name='lon2' value={form.lon2} onChange={handleChange}/>
            </label>
          </div>
        </div>
        <input className='submit' type="submit" value="Рассчитать" />
      </form>
      {distance? <Map form={form} distance={distance} showMap={showMap}/>:null}
    </div>
  );
};

export default App;



