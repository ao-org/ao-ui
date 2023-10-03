import { useTranslation } from "react-i18next";
import { Section } from "./Section"
import AoCheckbox from "../../../Common/ao-checkbox/ao-checkbox";
import { useState } from "react";
import './gameplay-options.scss'
import Select from 'react-select';
import { Slider } from "../../../Common/Slider/slider";
import AoButton from "../../../Common/ao-button/ao-button";
import { useDispatch, useSelector } from "react-redux";
import { selectGameplaySettings, updateGameplaySettings } from "../../../../redux/GameplaySlices/GameSettings";
import { Actions, SettingType } from "../../../../constants";


const ThrowSpellsOptions = [
  { value: 'noLock', label: 'no-Lock', index: 0},
  { value: 'lockThrow', label: 'lock-throw', index: 1},
  { value: 'lockCast', label: 'lock-cast', index: 2},
]

const LanguageSettings = [
  { value: 'en', label: 'English', index: 2},
  { value: 'es', label: 'Español', index: 1}
]
export const GameplayTab = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const gameplaySettings = useSelector(selectGameplaySettings)
  const {
    copyDialogsEnabled,
    writeAndMove,
    blockSpellListScroll,
    throwSpellLockBehavior,
    mouseSens,
    language,
    userGraphicCursor,
    renderNpcText,
    tutorialEnabled
  } = gameplaySettings
  const currentLanguage = LanguageSettings.find( e => (e.index === language))
  const throwSpellOpt = ThrowSpellsOptions.map( el => {
    return ({...el, label: t(el.label)})
  })
  const throwOption = throwSpellOpt[throwSpellLockBehavior]
  const NpcsText = [
    { value: 'Text', label: t('text'), index: 0},
    { value: 'rendered', label: t('rendered'), index: 1},
  ]
  const npcText = NpcsText[ renderNpcText ? 1 : 0]
  const tutorialOptions = [
    { value: 'disabled', label: t('Disabled'), index: 0},
    { value: 'enabled', label: t('Enabled'), index: 1},
  ]
  const tutorialOpt = tutorialOptions[tutorialEnabled ? 1 : 0]
  const handleChangeBox = evt => {
    const { name } = evt.target;
    dispatch(updateGameplaySettings({...gameplaySettings, [name]: !gameplaySettings[name]}))
    window.parent.BabelUI.UpdateIntSetting(SettingType[name], gameplaySettings[name] ? 0 : 1)
  }
  const updateThrowOption = evt => {
    dispatch(updateGameplaySettings({...gameplaySettings, throwSpellLockBehavior: evt}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.throwSpellLockBehavior, evt)
  }
  const updateNpcText = evt => {
    dispatch(updateGameplaySettings({...gameplaySettings, renderNpcText: evt.index > 0}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.renderNpcText, evt.index)
  }
  const updateTutorialOpt = evt => {
    dispatch(updateGameplaySettings({...gameplaySettings, tutorialEnabled: evt.index > 0}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.tutorialEnabled, evt.index)
  }
  const updateLanguage = evt => {
    dispatch(updateGameplaySettings({...gameplaySettings, language: evt.index}))
    i18n.changeLanguage(evt.value)
    window.parent.BabelUI.UpdateIntSetting(SettingType.language, evt.index)
  }
  const mouseSenseCahnge = newVal => {
    dispatch(updateGameplaySettings({...gameplaySettings, mouseSens: newVal}))
    window.parent.BabelUI.UpdateIntSetting(SettingType.mouseSens, newVal)
  }

  const openKeySettings = evt => {
    window.parent.BabelUI.RequestAction(Actions.OpenKeySettings)
  }
  return (
    <div className="gameplay-settings">
      <Section name={t('chat').toUpperCase()}>
        <AoCheckbox label={t('copy-terminal')} name="copyDialogsEnabled" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={copyDialogsEnabled} />
        <AoCheckbox label={t('write-and-move')} name="writeAndMove" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={writeAndMove} />
      </Section>
      <Section name={t('fight').toUpperCase()}>
        <p className="throw-spells-title">{t('throw-spells')}</p>
        <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={throwSpellOpt} value={throwOption} onChange={updateThrowOption}  />
        <AoCheckbox label={t('block-spell-list-scroll')} name="blockSpellListScroll" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={blockSpellListScroll} />
      </Section>
      <Section name={t('mouse-sens').toUpperCase()}>
        <Slider min={1} max={20} currentValue={mouseSens} onChange={mouseSenseCahnge}/>
        <div className="mouse-checkbox">
        <AoCheckbox label={t('graphic-cursor')} name="userGraphicCursor" styles='chat-options' labelStyle='check-box-label' handleChange={handleChangeBox} state={userGraphicCursor} />
        </div>
      </Section>
      <Section name={t('language').toUpperCase()}>
        <p className="throw-spells-title">{t('interface-language')}</p>
        <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={LanguageSettings} value={currentLanguage} onChange={updateLanguage}  />
      </Section>
      <Section name={t('other').toUpperCase()} style='other-settings'>
        <div className="flex-row">
          <div className="split-row">
            <p className="throw-spells-title">{t('Npc-text')}</p>
            <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={NpcsText} value={npcText} onChange={updateNpcText}  />
          </div>
          <div className="split-row">
            <p className="throw-spells-title">{t('Tutorial')}</p>
            <Select unstyled className="server-selector" classNamePrefix='throw-selector-prop' options={tutorialOptions} value={tutorialOpt} onChange={updateTutorialOpt}  />
          </div>
        </div>        
      </Section>
      <AoButton onClick={openKeySettings}>{t('change-keysettings').toLocaleUpperCase()}</AoButton>
    </div>
  )}