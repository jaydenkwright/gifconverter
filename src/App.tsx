import { useState, useEffect, useRef } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })
function App() {
  const [ready, setReady] = useState<boolean>(false)
  const [video, setvideo] = useState<File | null | undefined>()
  const [gif, setGif] = useState<any>()
  const [convertLoading, setConvertLoading] = useState<boolean>(false)

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
      setConvertLoading(true)
      ffmpeg.FS('writeFile', video.name, await fetchFile(video))
      await ffmpeg.run('-i', video.name, '-t', '30', '-f', 'gif', 'gif.gif')
      const convertedGif = ffmpeg.FS<any>('readFile', 'gif.gif')
      const gifUrl = URL.createObjectURL(new Blob([convertedGif.buffer], {type: 'image/gif'}))
      setGif(gifUrl)
      setConvertLoading(false)
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
      {video && !gif && <video 
        controls 
        width='400' 
        src={URL.createObjectURL(video)} 
      />
      }
      {convertLoading && 'Converting...'}
      {gif && <img src={gif} width='400' alt='Gif'/>}
      {video && !gif && <button onClick={convert} className='convertButton'>Convert</button>}
      <input type='file' ref={hiddenFileInput} onChange={(e) => setvideo(e.target.files?.item(0))} accept='video/*' style={{display: 'none'}}/>
      {!video || gif ? <button className='uploadButton' onClick={handleClick} >Select Video File</button> : null}
    </div>
  ): <p>Loading...</p>;
}

export default App;
