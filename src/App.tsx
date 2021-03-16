import { useState, useEffect } from 'react'
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import Video from './components/Video'
import Gif from './components/Gif'
import UploadButton from './components/UploadButton'
import ConvertButton from './components/ConvertButton'

const ffmpeg = createFFmpeg({ log: true })
function App() {
  const [ready, setReady] = useState<boolean>(false)
  const [video, setVideo] = useState<File | null | undefined>()
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

  useEffect(() => {
    load()
  }, [])

  return ready ? (
    <div className="container">
      {video && !gif && <Video src={URL.createObjectURL(video)} /> }
      {convertLoading && 'Converting...'}
      {gif && <Gif src={gif} />}
      {video && !gif && 
      <ConvertButton 
        video={video} 
        setConvertLoading={setConvertLoading} 
        setGif={setGif} 
        ffmpeg={ffmpeg}
      />}
      <UploadButton 
        setVideo={setVideo} 
        video={video} 
      />
    </div>
  ): <p>Loading...</p>;
}

export default App;
