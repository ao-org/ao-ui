import { useTranslation } from 'react-i18next';
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import './settings-dialog.scss'
import { useState } from 'react';
import AoButton from '../../../Common/ao-button/ao-button';
import { GameplayTab } from './gameplay-option-tab';
import { AudioSettingsTab } from './audio-settings-tab';
import { VideoSettingsTab } from './video-settings';
import { useDispatch } from 'react-redux';
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import { Actions } from '../../../../constants';

export const SettingsDialog = ({settings}) => {
  const { t } = useTranslation();
  const [activePannel, setActivePannel] = useState('gameplay');
  const onChange = panel => {
    setActivePannel(panel)
  }
  const dispatch = useDispatch()
  const onClose = () => {
    dispatch(setGameActiveDialog(null))
    window.parent.BabelUI.RequestAction(Actions.SaveSettings)
  }
  return (
  <AoDialog styles='settings-dialog' contentStyles='content'>
    <div className='header-line'>
      <h1 className='game-dialog-header'>{t('settings').toUpperCase()}</h1>
    </div>
    <span className='header-underline'></span>
    <AoButton styles='close-button' onClick={onClose}>
      <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
    </AoButton>
    <div className='sub-menu-selection'>
      <AoButton styles={'stats-opt-button ' + (activePannel === 'gameplay' ? 'selected' : 'unselected')} onClick={() => onChange('gameplay')}>{t("gameplay").toUpperCase()}</AoButton>
      <AoButton styles={'stats-opt-button ' + (activePannel === 'video' ? 'selected' : 'unselected')} onClick={() => onChange('video')}>{t("video").toUpperCase()}</AoButton>
      <AoButton styles={'stats-opt-button ' + (activePannel === 'audio' ? 'selected' : 'unselected')} onClick={() => onChange('audio')}>{t("audio").toUpperCase()}</AoButton>
    </div>
    {
      {
        'gameplay':<GameplayTab styles='centered'/>,
        'video':<VideoSettingsTab styles='centered'/>,
        'audio':<AudioSettingsTab styles='centered'/>
      }
      [activePannel]
    }
  </AoDialog> 
)}