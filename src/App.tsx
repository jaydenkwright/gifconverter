import { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })
function App() {
  const [ready, setReady] = useState(false)
  const [video, setvideo] = useState<any>()

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
      {video && <video 
        controls 
        width='250' 
        src={URL.createObjectURL(video)} 
      />}
      <input type='file' onChange={(e) => setvideo(e.target.files?.item(0))}/>
    </div>
  ): <p>Loading...</p>;
}

export default App;
