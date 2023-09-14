import { useDispatch, useSelector } from 'react-redux'
import { DragDropProvider } from '../../Common/DragDropProvider'
import { DragLayer } from '../../Common/DragLayer/drag-layer'
import OptionDialog from '../../Dialogs/OptionDialog/option-dialog'
import Chat from './Chat/chat'
import './gameplay-screen.scss'
import MiniMap from './MiniMap/mini-map'
import SideMenu from './SideMenu/side-menu'
import TopBar from './TopBar/top-bar'
import { exitGameplay, selectActiveDialog, selectTrackUserActive } from '../../../redux/GameplaySlices/GameStateSlice'
import { selectExitScreenActive, setFadeOut } from '../../../redux/UIFlowSlice'
import { useEffect } from 'react'
import SingleInputDialog from '../../Dialogs/SingleInputDialog/single-input-dialog'
import { IFrameDialog } from '../../Common/IFrameDialog/iframe-dialog'
import { ErrorBoundary } from '../../ErrorBoundary/error-boundary'
import { RemoteCursor } from '../../Common/RemoteCursor/remote-cursor'
import { NpcTrade } from '../../Dialogs/Gameplay/NpcTrade/npc-trade'
import { HotKeyBar } from './HotkeyBar/hotkey-bar'
import { isToggleEnabled, selectHideHotkeys, setHideHotkeys } from '../../../redux/GameplaySlices/GameSettings'
import { SettingsDialog } from '../../Dialogs/Gameplay/Settings/settings-dialog'
import GameBarButton from '../../Common/ao-button/GameBarButton/game-bar-button'
import { AoStore } from '../../Dialogs/Gameplay/AoStore/ao-store'
import { WorldMap } from '../../Dialogs/Gameplay/WorldMap/world-map'

const showHKIcon = status => {
  if (status) {
    return require('../../../assets/Icons/gameplay/ico_arrow_up.png')
  } else {
    return require('../../../assets/Icons/gameplay/ico_arrow_down.png')
  }
}
export default function GameplayScreen() {
  //console.log('gameplay render')
  const dispatch = useDispatch()
  const popupsState = useSelector(selectActiveDialog)
  const remoteTrackActive = useSelector(selectTrackUserActive)
  useEffect(()=> {
    setTimeout(() => {
      dispatch(setFadeOut(false))  
    }, 200);
  }, [])
  useEffect( () => {
    return () => 
    {
      dispatch(exitGameplay())
    }
  }, [] );
  const displayHotkeys = useSelector(state => isToggleEnabled(state, 'hotokey-enabled'))
  const transitionActive = useSelector(selectExitScreenActive)
  const hideHotkeys = useSelector(selectHideHotkeys)
  const hideShowHotKeys = evt => {
    dispatch(setHideHotkeys(!hideHotkeys))
    window.parent.BabelUI.UpdateHideHotkeyState(!hideHotkeys);
  }
  return (
    <div className='gameplay-screen'>
      <DragDropProvider>
      <TopBar styles={'top-bar ' + (transitionActive ? 'gp-top-exit-animation' : 'gp-top-intro-animation')}/>
      <div className='gameplay-area'>
      <span className={'menu-separator ' + (transitionActive ? 'gp-left-exit-animation' : 'gp-left-intro-animation')}><span className='frame-corner bot-left'></span></span>
        <div className='gameplay-and-chat'>
          <div className={'chat-section ' + (transitionActive ? 'gp-top-exit-animation' : 'gp-top-intro-animation')}>
            <ErrorBoundary compName="chat and minimap area">
            <Chat/>
            <MiniMap/>
            </ErrorBoundary>
          </div>
          <div className='gameplay-window'>
            {
              displayHotkeys ?
              <ErrorBoundary compName='hoykeys'>
                {
                  hideHotkeys ? null : <HotKeyBar/>
                }
                <GameBarButton styles='hide-show-hotkeys' onClick={hideShowHotKeys}>
                  <img src={showHKIcon(hideHotkeys)}></img>
                </GameBarButton>
              </ErrorBoundary>
              : null
            }
            
          </div>
          <span className={'gameplay-bottom-frame ' + (transitionActive ? 'gp-bottom-exit-animation' : 'gp-bottom-intro-animation')}></span>
        </div>
        <span className={'menu-separator ' + (transitionActive ? 'gp-right-exit-animation' : 'gp-right-intro-animation')}><span className='frame-corner bot-right'></span></span>
        <SideMenu styles={'right-panel ' + (transitionActive ? 'gp-right-exit-animation' : 'gp-right-intro-animation')}/>        
      </div>
      <ErrorBoundary compName="gameplay popups">
        {
          popupsState ?
          <div className='popups'>
            {{
                'option-dialog':<OptionDialog styles='centered' settings={popupsState}/>,
                'single-input-dialog':<SingleInputDialog styles='centered' settings={popupsState}/>,
                'iframe':<IFrameDialog options={popupsState}/>,
                'npc-trade':<NpcTrade settings={popupsState}/>,
                'settings':<SettingsDialog settings={popupsState}/>,
                'ao-shop':<AoStore settings={popupsState}/>,
                'world-map': <WorldMap settings={popupsState}/>
              }
              [popupsState.popUp]
            }
          </div> :
          null
        }
        {
          remoteTrackActive ? <RemoteCursor /> : null
        }
        </ErrorBoundary>
      <DragLayer/>
      </DragDropProvider>
    </div>
  )
}
