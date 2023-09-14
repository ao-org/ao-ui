import './ao-store.scss'
import AoDialog from "../../../Common/ao-dialog/ao-dialog"
import AoButton from '../../../Common/ao-button/ao-button'
import AoInput from '../../../Common/ao-input/ao-input';
import { useDispatch } from 'react-redux'
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice'
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import Frame from '../../../Common/Frame/frame';
import RibbonTittle from '../../../Common/RibbonTittle/ribbon-tittle';
import Sprite from '../../../Common/Sprite/sprite';

export const AoStore = ({settings}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [ dialogState, setDialogState] = useState({search:'', selectedIndex: -1})
  const { search, selectedIndex } = dialogState;
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  const handleChange = event => {
    const { value, name } = event.target;
    setDialogState({ ...dialogState, [name]: value});
  }
  const filteredList = settings.itemList.filter( e => 
    e.name.includes(search)
  )
  const onItemSelect = el => {
    setDialogState({ ...dialogState, selectedIndex: el.objIndex});
  }
  const selectedItemDetails = selectedIndex > 0 ? window.parent.BabelUI.GetItemInfo(selectedIndex) : null
  const grhInfo = selectedItemDetails ? window.parent.BabelUI.GetGrhDrawInfo(selectedItemDetails.grhIndex) : null
  return (
    <AoDialog styles='ao-shop' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../assets/Icons/Dialogs/AOShopIcon.png')}/>
        <h1 className='game-dialog-header'>{t('ao-shop').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <div className='search-area'>
        <div className='search-bar'>
          <p className='search-text'>{t('search')}</p>
          <AoInput styles='search-input' name="search" value={search} IsValid={true} required handleChange={handleChange} />
        </div>
        <div className='credit-area'>
          <p className='cretis-text'>{t('credits')}</p>
          <p className='cretis-text'>{settings.availableCredits}</p>
        </div>
      </div>
      <div className='item-selection-area'>
        <Frame contentStyles='item-list-frame'>
          <div className='element-line'>
            <p className='price header-style'>{t('price').toLocaleUpperCase()}</p>
            <p className='item-info header-style'>{t('name').toLocaleUpperCase()}</p>
          </div>
          <div className='item-list'>
           {
              filteredList.map( el => (
                <div className={'element-line ' + (el.objIndex === selectedIndex ? 'selected-shop-item' : '')} onClick={ evt => onItemSelect(el)}>
                  <p className='price el-price'>{el.price}</p>
                  <p className='item-info'>{el.name}</p>
                </div>
              ))
           }
          </div>
        </Frame>
        <Frame contentStyles='item-preview-frame'>
          <RibbonTittle text={t('description').toLocaleUpperCase()} styles='ribbon'/>
          <div className='item-image'>
            {
              selectedItemDetails ? 
              <Sprite
                styles="selected-item-icon"
                imageName={grhInfo.imageNumber}
                x={grhInfo.startX}
                y={grhInfo.startY}
                width={grhInfo.width}
                height={grhInfo.height}
              />
              : null
            }
          </div>
          <div className='item-description-area'>
            {
              selectedItemDetails ? 
              <p className='item-details'>{selectedItemDetails.text}</p>
              : null
            }
            
          </div>
          <div className='warning-area'>{t('reload-character-warning')}</div>
        </Frame>
      </div>
      <div className='button-line'>
        <AoButton styles='shop-button' onClick={onClose}>{t('cancel').toLocaleUpperCase()}</AoButton>
        <AoButton styles='shop-button'>{t('buy').toLocaleUpperCase()}</AoButton>
      </div>
    </AoDialog>
)}