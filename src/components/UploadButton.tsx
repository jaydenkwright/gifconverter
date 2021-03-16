import React, { useRef } from 'react'

interface Props{
    setVideo: any
    video: File | null | undefined
}

const UploadButton: React.FC<Props> = ({ setVideo, video }) => {

    const hiddenFileInput = useRef<any>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        hiddenFileInput?.current?.click();
    };
    return (
        <div>
            <input 
                type='file' 
                ref={hiddenFileInput} 
                onChange={(e) => setVideo(e.target.files?.item(0))} 
                accept='video/*' 
                style={{display: 'none'}}
            />
            {!video && <button className='uploadButton' onClick={handleClick} >Select Video File</button>}
        </div>
    )
}

export default UploadButton
