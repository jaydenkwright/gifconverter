import { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })
function App() {
  const [ready, setReady] = useState(false)

  const load = async() => {
    try{
      await ffmpeg.load()
      setReady(true)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    load()
  }, [])
  return ready ? (
    <div className="App">
      
    </div>
  ): <p>Loading...</p>;
}

export default App;
