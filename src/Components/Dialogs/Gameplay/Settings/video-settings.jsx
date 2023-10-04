import { useTranslation } from "react-i18next";
import './audio-settings-tab.scss'
import { Section } from "./Section";
import AoCheckbox from "../../../Common/ao-checkbox/ao-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectVideoSettings, updateVideoSettings } from "../../../../redux/GameplaySlices/GameSettings";
import { Actions, SettingType } from "../../../../constants";
import { setGameActiveDialog } from "../../../../redux/GameplaySlices/GameStateSlice";
import Select from 'react-select';

export const VideoSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const videoSettings = useSelector(selectVideoSettings)
  const {
    showFps,
    moveGameWindow,
    characterBreathing,
    fullScreen,
    displayFloorItemInfo,
    displayFullNumbersInventory,
    enableBabelUI,
    lightSettings
  } = videoSettings

  const handleChange = evt => {
    const { name } = evt.target;
    dispatch(updateVideoSettings({...videoSettings, [name]: !videoSettings[name]}))
    window.parent.BabelUI.UpdateIntSetting(SettingType[name], videoSettings[name] ? 0 : 1)
    if (name === "enableBabelUI") {
      const questionACtion = {
        popUp:'option-dialog',
        text: t('must-restart-for-changes'),
        actions: [{
          caption: t('accept').toUpperCase(),
          action:  evt => {
            dispatch(setGameActiveDialog(null))
          }}
        ]
      }
      dispatch(setGameActiveDialog(questionACtion))
      window.parent.BabelUI.RequestAction(Actions.SaveSettings)
    }
  }
  const LightOptions = [
    { value: 'time-light', label: t('time-light'), index: 0},
    { value: 'Day', label: t('day'), index: 1},
    { value: 'Night', label: t('night'), index: 2},
  ]
  const lightOption = LightOptions.find( e=> e.index === lightSettings)
  const updateLightSettings = evt => {
    dispatch(updateVideoSettings({...videoSettings, lightSettings: evt.index}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.lightSettings, evt.index)
  }
  return (
    <div className="audio-settings-tab">
      <div className="option-column">
        <Section name={t('visualization').toUpperCase()}>
          <AoCheckbox label={t('showFps')} name="showFps" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={showFps} />
          <AoCheckbox label={t('moveGameWindow')} name="moveGameWindow" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={moveGameWindow} />
          <AoCheckbox label={t('characterBreading')} name="characterBreathing" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={characterBreathing} />
          <AoCheckbox label={t('fullScreen')} name="fullScreen" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={fullScreen} />
          <AoCheckbox label={t('floorItemInfo')} name="displayFloorItemInfo" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={displayFloorItemInfo} />
          <AoCheckbox label={t('fullInventoryNumber')} name="displayFullNumbersInventory" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={displayFullNumbersInventory} />
          <AoCheckbox label={t('enableExperimentalUI')} name="enableBabelUI" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={enableBabelUI} />
        </Section>
      </div>
      <div className="option-column">
        <Section name={t('light-state').toUpperCase()}>
          <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={LightOptions} value={lightOption} onChange={updateLightSettings}  />
         </Section>
      </div>
    </div>
)}