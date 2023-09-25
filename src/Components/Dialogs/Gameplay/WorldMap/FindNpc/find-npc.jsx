import { useState } from 'react'
import AoDialog from '../../../../Common/ao-dialog/ao-dialog'
import AoInput from '../../../../Common/ao-input/ao-input'
import './find-npc.scss'
import { useTranslation } from 'react-i18next'
import Frame from '../../../../Common/Frame/frame'
import AoButton from '../../../../Common/ao-button/ao-button'

export const FindNpc = ({onClose, onSelectMap}) => {
  const { t } = useTranslation();
  const [ dialogState, setDialogState] = useState({search:'', selectedIndex: -1})
  const { search, selectedIndex } = dialogState;

  const npcList = Array(1000).fill({name:''}).map( (el, index) => ({name:' Npc ' + index, id: index}))

  const filteredList = npcList.filter( el => (
    el.name.includes(search)
  ))
  const handleChange = event => {
    const { value, name } = event.target;
    setDialogState({ ...dialogState, [name]: value});
  }
  return (
    <AoDialog styles='find-npc' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../../assets/Icons/Dialogs/AOShopIcon.png')}/>
        <h1 className='game-dialog-header'>{t('npc-search').toUpperCase()}</h1>
      </div>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <span className='header-underline'></span>
      <div className='search-area'>
        <p className='search-text'>{t('search')}</p>
        <AoInput styles='search-input' name="search" value={search} IsValid={true} required handleChange={handleChange} />
      </div>

      <div className='result-area'>
        <Frame contentStyles='npc-list'>
        {
          filteredList.map( (el, index) => (
            <p className='npc-name'>{el.name}</p>
          ))
        }
        </Frame>
        <Frame contentStyles='map-list'>
      
        </Frame>
      </div>
    </AoDialog>
  )
}