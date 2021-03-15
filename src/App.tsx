import { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })
function App() {
  const [ready, setReady] = useState(false)
  const [video, setvideo] = useState<File | null | undefined>()
  const [gif, setGif] = useState<any>()

  const load = async() => {
    try{
      await ffmpeg.load()
      setReady(true)
    }catch(e){
      console.log(e)
    }
  }

  const convert = async () => {
    if (video){
      ffmpeg.FS('writeFile', video.name, await fetchFile(video))
      await ffmpeg.run('-i', video.name, '-t', '30', '-f', 'gif', 'gif.gif')
      const convertedGif = ffmpeg.FS<any>('readFile', 'gif.gif')
      const gifUrl = URL.createObjectURL(new Blob([convertedGif.buffer], {type: 'image/gif'}))
      setGif(gifUrl)
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
      <input type='file' onChange={(e) => setvideo(e.target.files?.item(0))} accept='video/*' />
      <button onClick={convert}>Convert</button>
      {gif && <img src={gif} />}
    </div>
  ): <p>Loading...</p>;
}

export default App;
