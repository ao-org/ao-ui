import { useTranslation } from "react-i18next";
import './audio-settings-tab.scss'
import { Section } from "./Section";
import AoCheckbox from "../../../Common/ao-checkbox/ao-checkbox";
import { Slider } from "../../../Common/Slider/slider";
import { useDispatch, useSelector } from "react-redux";
import { selectAudioSettings, updateAudioSettings } from "../../../../redux/GameplaySlices/GameSettings";
import { SettingType } from "../../../../constants";

export const AudioSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const audioSettings = useSelector(selectAudioSettings)
  const {
    enableMusic,
    enableFx,
    enableAmbient,
    sailFx,
    invertChannels,
    musicVolume,
    fxVolume,
    ambientVolume
  } = audioSettings

  const handleChange = evt => {
    const { name } = evt.target;
    dispatch(updateAudioSettings({...audioSettings, [name]: !audioSettings[name]}))
    window.parent.BabelUI.UpdateIntSetting(SettingType[name], audioSettings[name] ? 0 : 1)
  }
  const setAudioMusicVol = evt => {
    dispatch(updateAudioSettings({...audioSettings, musicVolume: evt}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.musicVolume, evt)
  }
  const setAudioFxVol = evt => {
    dispatch(updateAudioSettings({...audioSettings, fxVolume: evt}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.fxVolume, evt)
  }
  const setAudioAmbientVol = evt => {
    dispatch(updateAudioSettings({...audioSettings, ambientVolume: evt}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.ambientVolume, evt)
  }
  return (
    <div className="audio-settings-tab">
      <div className="option-column">
        <Section name={t('sound').toUpperCase()}>
          <AoCheckbox label={t('music')} name="enableMusic" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={enableMusic} />
          <AoCheckbox label={t('fx')} name="enableFx" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={enableFx} />
          <AoCheckbox label={t('ambient')} name="enableAmbient" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={enableAmbient} />
          <AoCheckbox label={t('navigationFx')} name="sailFx" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={sailFx} />
          <AoCheckbox label={t('invertLR')} name="invertChannels" styles='chat-options' labelStyle='check-box-label' handleChange={handleChange} state={invertChannels} />
        </Section>
      </div>
      <div className="option-column">
        <Section name={t('musicvolume').toUpperCase()}>
          <Slider min={-4000} max={0} currentValue={musicVolume} onChange={setAudioMusicVol}/>
        </Section>
        <Section name={t('fx-volume').toUpperCase()}>
          <Slider min={-4000} max={0} currentValue={fxVolume} onChange={setAudioFxVol}/>
        </Section>
        <Section name={t('ambient-volume').toUpperCase()}>
          <Slider min={-4000} max={0} currentValue={ambientVolume} onChange={setAudioAmbientVol}/>
        </Section>
      </div>
    </div>
)}