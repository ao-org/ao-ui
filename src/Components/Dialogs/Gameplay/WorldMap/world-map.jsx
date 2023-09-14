import { useTranslation } from 'react-i18next';
import AoButton from '../../../Common/ao-button/ao-button'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import { useDispatch } from 'react-redux';
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import './world-map.scss';
import Frame from '../../../Common/Frame/frame';
import { useState } from 'react';
import { GetRootDirectory } from '../../../../Tools/Utils';

const Worlds = [
  { name: 'Argentum', index: 1},
  { name: 'Dungeons', index: 2},
  { name: 'Jogormut', index: 3}
]
const GetWorldImage = image => {
  return `${GetRootDirectory()}/interface/${image}.bmp`
}

const GetMapList = () => {
  return [{
    name: 'Desierto',
    npcList: [{name: 'Gallo', count: 100}]
  }]
}
export const WorldMap = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [ dialogState, setDialogState] = useState({activeWorld: Worlds[0].index, selectedMap: 0})
  const { activeWorld, selectedMap } = dialogState
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  const selectedMapDetails = GetMapList()[selectedMap]
  const onChangeWorld = world => {
    setDialogState({...dialogState, activeWorld: world.index})
  }
  return (
    <AoDialog styles='world-map' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../assets/Icons/Dialogs/AOShopIcon.png')}/>
        <h1 className='game-dialog-header'>{t('worldmap').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <div className='map-content-area'>
        <div className='map-area'>
          <div className='world-selector'>
            {
              Worlds.map( world => (
                <AoButton key={world.index} styles={'stats-opt-button ' + (activeWorld === world.index ? 'selected' : 'unselected')} onClick={() => onChangeWorld(world)}>{t(world.name).toUpperCase()}</AoButton>
              ))
            }
          </div>
          <Frame styles='map-grid-frame' contentStyles='map-grid'>
            <img src={GetWorldImage(`es_mapa${activeWorld}`)}></img>
          </Frame>
        </div>
        <div className='side-bar-area'>
          <p className='map-name'>{selectedMapDetails.name}</p>
          <Frame contentStyles='npc-info'>
            {
              selectedMapDetails.npcList.length > 0 ?
              <>
                <div className='npc-list-title'>
                  <span className='npc-list-name'>{t('Npcs')}</span>
                  <span className='npc-list-count'>{t('count')}</span>
                </div>
                {
                selectedMapDetails.npcList.map( npcEntry => (
                  <div className='npc-list-title'>
                    <span className='npc-list-name'>{npcEntry.name}</span>
                    <span className='npc-list-count'>{npcEntry.count}</span>
                  </div>
                  ))
                }
              </>
              :
              <p className='no-npc-found'>{t('no-npc-found')}</p>
            }
          </Frame>
        </div>
      </div>
    </AoDialog>
  )
}