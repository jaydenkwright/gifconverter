import React from 'react'

interface Props{
    src: string
}

const Gif: React.FC<Props> = ({ src }) => {
    return (
        <div>
            <img 
                src={src} 
                width='400' 
                alt='Gif'
            />
        </div>
    )
}

export default Gif
