import { useDispatch, useSelector } from 'react-redux'
import GameBarButton from '../../../Common/ao-button/GameBarButton/game-bar-button'
import './top-bar.scss'
import { selectFps, selectIsGameMaster, setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice'
import { selectCurrentCoordinates, selectIsSafeMap, selectMapName, selectMapNumber } from '../../../../redux/GameplaySlices/MapInfoSlice'
import { Actions } from '../../../../constants'
import { FpsCounter } from './FpsCounter/fps-counter'
import { MapCoords } from './MapCoords/MapCoords'
import { OnlineCount } from './OnlineCounter'
import { ErrorBoundary } from '../../../ErrorBoundary/error-boundary'

export default function TopBar({styles}) {
  const dispatch = useDispatch()
  const onClose = evt => {
    window.parent.BabelUI.OpenVBDialog('frmCerrar')
  }
  const minimize = evt => {
    window.parent.BabelUI.RequestAction(Actions.Minimize)
  }
  const openSettings = evt => {
    // dispatch(setGameActiveDialog({
    //   popUp:'settings'
    // })) 
    window.parent.BabelUI.RequestAction(Actions.OpenSettings)
  }
  
  const showHelp = evt => {
    const popupSettings = {
      url:'https://www.ao20.com.ar/wiki?hideHeaderAndFooter=true',
      popUp:'iframe',
      onClose: evt => {
        dispatch(setGameActiveDialog(null))
      }
    }
    dispatch(setGameActiveDialog(popupSettings))
  }

  const gmCommand = action => {
    window.parent.BabelUI.RequestAction(action)
  }
  const mapName = useSelector(selectMapName)
  const isSafe = useSelector(selectIsSafeMap)
  const mapNumber = useSelector(selectMapNumber)
  const isGm = useSelector(selectIsGameMaster)
  //console.log('top bar render')
  return (
    <div className={'top-bar ' + styles}>
      <ErrorBoundary compName="topbar">
      <img className='ao-logo' src={require('../../../../assets/Misc/ao20_horizontal.png')} />
      <div className='gm-command-area'>
        {
          isGm ?
          <>
            <span className='gm-option' onClick={() => {gmCommand(Actions.OpenGmPannel)}}>Panel GM</span>
            <span className='gm-option' onClick={() => {gmCommand(Actions.OpenCreateObjMenu)}}>Crear Obj</span>
            <span className='gm-option' onClick={() => {gmCommand(Actions.OpenSpawnMenu)}}>Spawn Npc</span>
            <span className='gm-option' onClick={() => {gmCommand(Actions.SetGmInvisible)}}>Invisible</span>
          </>
          :
          null
        }        
      </div>
      { isGm ?
        <div className='fps-area'>
          <FpsCounter/>
        </div> : null
      }
      <div className='location-coords'>
        <p className='map-name'>{mapName}</p>
        <MapCoords isSafe={isSafe} mapNumber={mapNumber} />
      </div>
      <div className='button-online-area'>
        <GameBarButton styles='bar-button' onClick={openSettings}>
          <img src={require('../../../../assets/Icons/gameplay/ico_gear.png')}></img>
        </GameBarButton>
        <GameBarButton styles='bar-button' onClick={showHelp}>
          <img src={require('../../../../assets/Icons/gameplay/ico_info.png')}></img>
        </GameBarButton>
        <OnlineCount/>
        <GameBarButton styles='bar-button' onClick={minimize}>
          <img src={require('../../../../assets/Icons/gameplay/ico_minimize.png')}></img>
        </GameBarButton>
        <GameBarButton styles='bar-button' onClick={onClose}>
          <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
        </GameBarButton>
      </div>
      </ErrorBoundary>
    </div>
  )
}