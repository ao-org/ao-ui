import { useRef } from 'react'
import './slider.scss'
import { MouseButtons } from '../../../constants'

export const Slider = ({min, max, currentValue, onChange}) => {
  const range = max - min
  const posPercent = ((currentValue - min) / (range)) * 100
  const sliderStype = {
    left: `${posPercent}%`,
  }
  const selector = useRef(null)
  const sliderLine = useRef(null)
  const updatePos = (posX) => {
    const clientRect = sliderLine.current.getBoundingClientRect()
    const localX = posX - clientRect.x;
    onChange( Math.min(Math.max(localX / clientRect.width * range + min, min), max))
  }
  const onMouseDown = evt => {
    if (evt.button === MouseButtons.left) {
      updatePos(evt.clientX)
    }    
  }
  const onMouseMove = evt => {
    if (evt.buttons > 0 ) {
      updatePos(evt.clientX)
    }
  }
  return (
    <div className='ao-slider' onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
    <span className="slider-line" ref={sliderLine} ></span>
    <span className="selector" ref={selector} style={sliderStype}></span>
    </div>
  )
}