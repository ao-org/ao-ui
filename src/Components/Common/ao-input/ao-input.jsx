import React, { useRef } from 'react';
import { SanitazeInput } from '../../../Tools/Utils';
import './ao-input.scss';
import { KeyCodeMapping } from '../../../constants';


const AoInput = ({handleChange, IsValid, styles, inputStyles, imgStyles, innerRef, showDelete, showSearch, ...otherProps}) => {
  let errStyle = ''
  if (!IsValid) {
    errStyle = 'error '
  }
  const inputElement = useRef(null);
  const HandleChange = input => {
    handleChange(SanitazeInput(input))
  }
  const onKeyDown = evt => {
    var ctrlDown = evt.ctrlKey||evt.metaKey
    if (ctrlDown && evt.keyCode === KeyCodeMapping.c) {
      if (inputElement.current &&  inputElement.current.selectionStart < inputElement.current.selectionEnd) {
        let content = inputElement.current.value
        window.parent.BabelUI.Copytext(content.substring(inputElement.current.selectionStart, inputElement.current.selectionEnd))
      }
    }
  }
  const onMouseMove = evt => {
    if (evt.buttons > 0 ) {
      const rect =  inputElement.current.getBoundingClientRect()
      const localX = evt.clientX - rect.left;
      const localY = evt.clientY - rect.top;
      const fontSize = window
      .getComputedStyle(inputElement.current, null)
      .getPropertyValue("font-size");
    }
  }
  const selectAllText = evt => {
    inputElement.current.selectionStart = 0
    inputElement.current.selectionEnd = inputElement.current.value.length
  }
  return (  
  <div className={'group ' + errStyle + styles }>
    <input className={'form-input ' + inputStyles} 
      onChange={HandleChange} 
      ref={(el)=> {inputElement.current = el; ; if (innerRef){ innerRef.current = el;}}}
      onKeyDown={onKeyDown}
      onMouseMove={onMouseMove}
      onDoubleClick={selectAllText}
      {...otherProps} 
    />
    {(showDelete ?? false) &&
      <img
        alt='delete input'
        className={'input-img ' + imgStyles}
        src={require('../../../assets/Icons/Dialogs/cancel.png')}
        onClick={(e) => {
          console.log('Delete')
          HandleChange({ target: { value: '', name: otherProps.name }})
          inputElement.current?.focus()
        }}
      />
    }
    {(showSearch ?? false) && !showDelete &&
      <img 
        alt='search'
        className={'input-img ' + imgStyles}
        src={require('../../../assets/Icons/Dialogs/glass.png')} 
        sizes='2px 2px'
      />
    }
    
  </div>
)}

export default AoInput;