import { useState, useEffect, useRef } from 'react'
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

  const hiddenFileInput = useRef<any>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    hiddenFileInput?.current?.click();
  };


  return ready ? (
    <div className="container">
      {video && <video 
        controls 
        width='250' 
        src={URL.createObjectURL(video)} 
      />
      }
      {video && <button onClick={convert} className='convertButton'>Convert</button>}
      <input type='file' ref={hiddenFileInput} onChange={(e) => setvideo(e.target.files?.item(0))} accept='video/*' style={{display: 'none'}}/>
      <button className='uploadButton' onClick={handleClick} >Select Video File</button>
      {gif && <img src={gif} />}
    </div>
  ): <p>Loading...</p>;
}

export default App;
