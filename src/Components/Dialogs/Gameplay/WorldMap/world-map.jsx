import { useTranslation } from 'react-i18next';
import AoButton from '../../../Common/ao-button/ao-button'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import { useDispatch } from 'react-redux';
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import './world-map.scss';
import FrameMap from './FrameMap/framemap'
import FrameNpc from './FrameNpc/framenpc'
import Frame from '../../../Common/Frame/frame';
import { useState } from 'react';
import { GetRootDirectory } from '../../../../Tools/Utils';
import AoCheckbox from '../../../Common/ao-checkbox/ao-checkbox';
import AoInput from '../../../Common/ao-input/ao-input';
import GameBarButton from '../../../Common/ao-button/GameBarButton/game-bar-button';
import { ErrorBoundary } from '../../../ErrorBoundary/error-boundary';
import { FindNpc } from './FindNpc/find-npc';

const Worlds = [
  { name: 'Argentum', index: 1},
  { name: 'Jogormut', index: 3},
  { name: 'Dungeons', index: 2}
]
const GetWorldImage = image => {
  return `${GetRootDirectory()}/interface/${image}.bmp`
}

let WorldGrid = []
const GetWorldGrid = worldIndex => {
  if (WorldGrid.length === 0) {
    WorldGrid = window.parent.BabelUI.GetWorldGrid()
  }
  return WorldGrid[worldIndex]
}

const GetMapList = (world) => {
  return [{
    name: 'Desierto',
    npcList: [{name: 'Pirata salvaje', count: 999, index: 1},
     {name: 'Pirata salvaje', count: 999, index: 2},
     {name: 'Pirata con nombre muy largo salvaje', count: 999, index: 3},
     {name: 'Pirata salvaje', count: 999, index: 4},
     {name: 'Pirata con nombre muy largo salvaje', count: 999, index: 5}, 
     {name: 'Pirata con nombre muy largo salvaje', count: 999, index: 6}]
  }]
}

const getBackgroundStyle = (showSafe, mapInfo, isSelected) => {
  if (!showSafe) return isSelected ? 'selected-grid-element' : ''
  if (mapInfo.isSafe) {
    return 'safe-area ' +  (isSelected ? 'selected-grid-element' : '')
  }
  return 'unsafe-area ' +  (isSelected ? 'selected-grid-element' : '')
}

const CellSize = 25;
export const WorldMap = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [ dialogState, setDialogState] = useState({
     activeWorld: Worlds[0].index,
     selectedWorld: 0, 
     selectedNpc:null,
     showMapNumbers:false,
     displaySafeUnsafe:false,
     selectedMap: 0,
     findMap: null,
     popupsState: null
    })
  const { activeWorld, 
        selectedWorld, 
        selectedNpc, 
        showMapNumbers,
        displaySafeUnsafe,
        selectedMap,
        findMap,
        popupsState } = dialogState
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  const selectedMapDetails = GetMapList()[selectedWorld]
  const selectedGrid = GetWorldGrid(selectedWorld)
  const gridCount = (selectedGrid.height) * (selectedGrid.width)
  const grid = Array(gridCount).fill({ mapNumber: 0, name: 'Desierto'}).map( (el, index) => ({...el, mapNumber: index, isSafe: index % 2 === 0}));
  const gridStyle = {
    gridTemplateColumns: `repeat(${selectedGrid.width}, 1fr)`,
    width: `${selectedGrid.width * CellSize}px`,
    height: `${selectedGrid.height *CellSize}px`
  }
  const onChangeWorld = world => {
    setDialogState({...dialogState, activeWorld: world.index})
  }
  const selectNpc = npc => {
    setDialogState({...dialogState, selectedNpc: npc.index})
  }
  const mapImageStyle = {
    width: `${selectedGrid.width * CellSize}px`,
    height: `${selectedGrid.height *CellSize}px`
  }
  const cellSize = {
    width: `${CellSize}px`,
    height: `${CellSize}px`
  }
  const handleChange = (evt, value) => {
    const { name } = evt.target;
    setDialogState({ ...dialogState, [name]: value});
  }
  const onSelectMap = mapInfo => {
    setDialogState({ ...dialogState, selectedMap: mapInfo.mapNumber});
  }
  const openNpcSearch = evt => {
    setDialogState({ ...dialogState, popupsState:'find-npc'});
  }
  const onCloseNpcFind = evt => {
    setDialogState({ ...dialogState, popupsState:null});
  }
  return (
    <AoDialog styles='world-map' contentStyles='content'>
      <div className='header-line'>
        <div className='header-content'>
          <img src={require('../../../../assets/Icons/Dialogs/WorldmapIcon.png')}/>
          <h1 className='game-dialog-header'>{t('world map').toUpperCase()}</h1>
        </div>
        <span className='header-underline'></span>
        <div className='header-navbar'>
          <div className='continent'>
            <h2 className='continent-title'>Continent</h2>
            <div className='continent-selector'>
            {
              Worlds.map( world => (
                <AoButton key={world.index} styles={'testcheck stats-opt-button ' + (activeWorld === world.index ? 'selected' : 'unselected')} onClick={() => onChangeWorld(world)}><span className='world-name'>{t(world.name)}</span></AoButton>
              ))
            }
            </div>
          </div>
          <div className='search'>
            <h2 className='search-title'>{t('Search zone')}</h2>
            <div className='search-input--container'>
              <AoInput name="findMap" type="number"   styles='search-input search-selected'
                min="1" max="10000" value={findMap} IsValid={true} handleChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
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
            <img src={GetWorldImage(`es_mapa${activeWorld}`)} style={mapImageStyle}></img>
            <div className='grid-layer' style={gridStyle}>
              {
                grid.map( (el, index) => (
                  <span className={'grid-element ' + getBackgroundStyle(displaySafeUnsafe, el, el.mapNumber === selectedMap)} 
                    onClick={() => onSelectMap(el)}
                    key={el.mapNumber} style={cellSize}>
                    {
                      showMapNumbers && <p className='grid-number'>{el.mapNumber}</p>
                    }
                  </span>
                ))
              }
            </div>
          </Frame>
        </div>
        <div className='side-bar-area'>
          <h2 className='zone-title'>{t('Current zone')}</h2>
          <p className='zone-name'>{selectedMapDetails.name}</p>
          <FrameMap contentStyles='npc-info'>
            {
              selectedMapDetails.npcList.length > 0 ?
              <>
                <div className='npc-list-title'>
                  <span className='npc-list-name npc-header-line'>{t('Npcs')}</span>
                  <span className='npc-list-count npc-header-line'>{t('Amount')}</span>
                </div>
                {
                selectedMapDetails.npcList.map( npcEntry => (
                  <div className={'npc-list-title ' + ( selectedNpc === npcEntry.index ? 'selected-npc' : '')} 
                       onClick={ () => selectNpc(npcEntry)}>
                    <span key={npcEntry.index} className='npc-list-name'>{npcEntry.name}</span>
                    <span className='npc-list-count'>{npcEntry.count}</span>
                  </div>
                  ))
                }
              </>
              :
              <p className='no-npc-found'>{t('no-npc-found')}</p>
            }
          </FrameMap>
          <p className='npc-details-tittle'>{t('Details')}</p>
          <FrameMap contentStyles='npc-info npc-details-frame'></FrameMap>


          <div className='npc-preview-container'>
            <FrameNpc contentStyles='npc-preview'></FrameNpc>
          </div>

          <AoButton styles='search-npc-button' onClick={openNpcSearch}>{t('Search NPC')}</AoButton>
              <p className='npc-details-tittle markers-title'>{t('Markers')}</p>
          <FrameMap styles='markers-frame'>
            <div className='markers-container'>
              <div className='markers-content--container'>
                <AoCheckbox label={t('Map numbers')}
                  name="showMapNumbers"
                  styles='markers-ops'
                  labelStyle='marker-label'
                  handleChange={ (evt) => handleChange(evt, !showMapNumbers)}
                  state={showMapNumbers} />
                <AoCheckbox label={t('Safe-unsafe')}
                  name="displaySafeUnsafe"
                  styles='markers-ops'
                  labelStyle='marker-label'
                  handleChange={(evt) => handleChange(evt, !displaySafeUnsafe)}
                  state={displaySafeUnsafe} />
              </div>
            </div>
          </FrameMap>
        </div>
      </div>
      <ErrorBoundary compName="map popups">
        {
          popupsState ?
          <div className='popups'>
            {{
                'find-npc':<FindNpc styles='centered' onClose={onCloseNpcFind}/>
              }
              [popupsState]
            }
          </div> :
          null
        }
        </ErrorBoundary>
    </AoDialog>
  )
}