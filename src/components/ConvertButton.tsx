import React from 'react'
import { fetchFile } from '@ffmpeg/ffmpeg'

interface Props{
    video: File | null | undefined
    setConvertLoading: any
    setGif: any
    ffmpeg: any
    setError: any
}

const ConvertButton: React.FC<Props> = ({ video, setConvertLoading, setGif, ffmpeg, setError }) => {
    const convert = async () => {
        try{
            if (video){
                setConvertLoading(true)
                ffmpeg.FS('writeFile', video.name, await fetchFile(video))
                await ffmpeg.run('-i', video.name, '-t', '30', '-f', 'gif', 'gif.gif')
                const convertedGif = ffmpeg.FS('readFile', 'gif.gif')
                const gifUrl = URL.createObjectURL(new Blob([convertedGif.buffer], {type: 'image/gif'}))
                setGif(gifUrl)
                setConvertLoading(false)
              }
        }catch(e){
            setError('Something went wrong!')
        }
    
    }
    return (
        <div>
            <button onClick={convert} className='convertButton'>Convert</button>
        </div>
    )
}

export default ConvertButton
