import React from 'react'

interface Props{
    src: string
}

const Video: React.FC<Props> = ({ src }) => {
    return (
        <div>
            <video 
                controls
                width='250'
                src={src}
            />
        </div>
    )
}

export default Video
