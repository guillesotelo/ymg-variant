import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../app/context/AppContext'
import { isTooBright } from '../../helpers'
import Image from 'next/image'

type Props = {
    label?: string
    className?: string
    bgColor?: string
    textColor?: string
    handleClick: () => any
    disabled?: boolean
    svg?: string
    style?: React.CSSProperties
}

export default function Button({ label, handleClick, className, bgColor, textColor, disabled, svg, style }: Props) {
    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({ ...style })
    const { darkMode } = useContext(AppContext)

    useEffect(() => {
        setButtonStyle({
            ...buttonStyle,
            backgroundColor: bgColor || '',
            color: textColor || 'black',
        })
    }, [darkMode])

    return svg ?
        <div
            className="button__icon"
            onClick={handleClick}
            style={{
                backgroundColor: bgColor || '',
                border: `1px solid ${bgColor || ''}`,
                color: textColor || 'black',
                opacity: disabled ? '.3' : '',
                padding: '.2vw',
                cursor: disabled ? 'not-allowed' : '',
                display: 'flex',
                flexDirection: 'row',
                minHeight: '2rem',
                alignItems: 'center',
                gap: '.5rem',
                paddingInline: '.5rem',
                ...buttonStyle
            }}
            onMouseEnter={() => setButtonStyle({
                ...style,
                backgroundColor: 'transparent',
                color: !darkMode ? (isTooBright(bgColor) ? 'black' : bgColor) : ''
            })}
            onMouseLeave={() => setButtonStyle({
                ...style,
                backgroundColor: bgColor || '',
                color: textColor || 'black',
            })}
        >
            <img src={svg} alt="Button" className='button__svg' />
            {label || ''}
        </div>
        :
        <button
            className={className || 'button__default'}
            onClick={handleClick}
            style={{
                backgroundColor: bgColor || '',
                border: `1px solid ${bgColor || ''}`,
                color: !textColor && darkMode ? 'lightgray' : textColor || 'black',
                opacity: disabled ? '.3' : '',
                cursor: disabled ? 'not-allowed' : '',
                ...buttonStyle
            }}
            disabled={disabled}
            onMouseEnter={() => setButtonStyle({
                ...style,
                backgroundColor: 'transparent',
                color: bgColor || ''
            })}
            onMouseLeave={() => setButtonStyle({
                ...style,
                backgroundColor: bgColor || '',
                color: textColor || 'black',
            })}
        >
            {label || ''}
        </button>
}