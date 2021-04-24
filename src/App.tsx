import { useState, useEffect } from 'react'
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import Video from './components/Video'
import Gif from './components/Gif'
import UploadButton from './components/UploadButton'
import ConvertButton from './components/ConvertButton'
import Loading from './components/Loading'
import Error from './components/Error'

const ffmpeg = createFFmpeg({ log: false })
function App() {
  const [ready, setReady] = useState<boolean>(false)
  const [video, setVideo] = useState<File | null | undefined>()
  const [gif, setGif] = useState<any>()
  const [convertLoading, setConvertLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  
  const load = async() => {
    try{
      await ffmpeg.load()
      setReady(true)
    }catch(e){
      setError('Something went wrong!')
    }
  }

  useEffect(() => {
    load()
  }, [])

  return ready && !error ? (
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
        setError={setError}
      />}
      <UploadButton 
        setVideo={setVideo} 
        video={video} 
      />
    </div>
  ): !ready && !error ? <Loading /> : <Error error={error} />;
}

export default App;
