import { useTranslation } from "react-i18next";
import './audio-settings-tab.scss'
import { Section } from "./Section";
import AoCheckbox from "../../../Common/ao-checkbox/ao-checkbox";
import { useState } from "react";

export const VideoSettingsTab = () => {
  const { t } = useTranslation();
  const [ videoSettings, setVideoSettings ] = useState ({showFps:false, moveGameWindow:true, characterBreading:true, fullScreen: false, floorItemInfo:true, fullInventoryNumber: false, })
  const { showFps, moveGameWindow, characterBreading, fullScreen, floorItemInfo, fullInventoryNumber} = videoSettings

  const handleChange = evt => {
    const { value, name } = evt.target;
  }
  
  return (
    <div className="audio-settings-tab">
      <div className="option-column">
        <Section name={t('visualization').toUpperCase()}>
          <AoCheckbox label={t('showFps')} name="showFps" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={showFps} />
          <AoCheckbox label={t('moveGameWindow')} name="moveGameWindow" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={moveGameWindow} />
          <AoCheckbox label={t('characterBreading')} name="characterBreading" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={characterBreading} />
          <AoCheckbox label={t('fullScreen')} name="fullScreen" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={fullScreen} />
          <AoCheckbox label={t('floorItemInfo')} name="floorItemInfo" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={floorItemInfo} />
          <AoCheckbox label={t('fullInventoryNumber')} name="fullInventoryNumber" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={fullInventoryNumber} />
        </Section>
      </div>
      <div className="option-column">
      </div>
    </div>
)}