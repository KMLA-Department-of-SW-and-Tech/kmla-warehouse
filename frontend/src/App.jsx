
import { useState, useEffect } from 'react'
import axios from 'axios'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    axios.get('/api')
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
  }, [])
  return (
    <>
      <h1>Data from Backend</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre>: <p>Loading...</p>}
    </>
  )
}

export default App




