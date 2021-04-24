import React from 'react'

interface Props{
    error: string | undefined
}

const Error: React.FC<Props> = ({ error }) => {
    return (
        <div className='error'>
            {error}
        </div>
    )
}

export default Error
