import './App.scss';
import Loading from './Components/Dialogs/Loading/loading';
import LogInFlow from './Components/Login-flow/login-flow';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayErrorMessage, displayLoadingText, selectActivePopup, selectIsFadeOut, selectPopupData } from './redux/UIFlowSlice'
import ErrorMessage from './Components/Dialogs/error-message/error-message';
import {RegisterApiCallback} from './Api/Api'
import { useTranslation } from 'react-i18next';
import { setCharacter } from './redux/CharSelectionSlice';
import OptionDialog from './Components/Dialogs/OptionDialog/option-dialog';
import ValidateCode from './Components/Dialogs/validate-code/validate-code';
import TransferCharacter from './Components/Dialogs/TransferCharacter/transfer-character';
import { setStats, updateDrink, updateFood, updateGold, updateHp, updateLockState, updateMagicAttack, updateMagicResitance, updateMana, updateStamina, updateStrandAgi } from './redux/GameplaySlices/PlayerStatsSlice';
import { setCharacterInfo, setUserName, updateExp } from './redux/GameplaySlices/CharacterInfoSlice';
import { postChatMessage, setWhisperTarget, updateGlobalAndCombatModes } from './redux/GameplaySlices/ChatSlice';
import { handleMerchantItemChange, openAoShop, openNpcTradeDialog, resetGameplay, setFps, setGameActiveDialog, updateFirstSpellToDisplay, updateGameTime, updateIsGameMaster, updateOnlines, updateRemoteTab, updateTrackLastMouseClick, updateTrackMousePos, updateTrackState } from './redux/GameplaySlices/GameStateSlice';
import { activateRemoteHotkey, selectSpellSlot, setHotkeySlot, setInvLevel, updateInvSlot, updateKeySlot, updateSpellSlot } from './redux/GameplaySlices/InventorySlice';
import { setCoordinates, setInterestPoints, setMapInfo, updateGroupMarker } from './redux/GameplaySlices/MapInfoSlice';
import { fireInterval, startSpellcd, startStun, updateIntervals } from './redux/GameplaySlices/Cooldowns';
import { ActiveToolTip } from './Components/Common/Tooltip/Tooltip-manager';
import { ErrorBoundary } from './Components/ErrorBoundary/error-boundary';
import { addFeatureToggle, clearFeatureToggles, setHideHotkeys, updateSettings } from './redux/GameplaySlices/GameSettings';
import { loadNews, selectSteamNews } from './redux/Api';
import axios from 'axios';

function App() {
  const dispatch = useDispatch()
  const { t, i18n  } = useTranslation();
  useEffect(() => {
    RegisterApiCallback('ErrorMessage', (msg, localize, action) => {
      if (localize) {
        dispatch(displayErrorMessage(t(msg)))
      }
      else {
        dispatch(displayErrorMessage(msg))
      }
    })
    RegisterApiCallback('SetLoadingMessage', (msg, localize) => {
      if (localize) {
        dispatch(displayLoadingText(t(msg)))
      }
      else {
        dispatch(displayLoadingText(msg))
      }
    })
    RegisterApiCallback('SetCharacter', (charInfo) => {
      dispatch(setCharacter(charInfo))
    })
    RegisterApiCallback('DeleteCharacterFromList', (charIndex) => {
      window.parent.APicallbacks.ConfirmDeleteChar(charIndex)
    })
    RegisterApiCallback('PostChatMsg', (msg) => {
      dispatch(postChatMessage(msg))
    })
    RegisterApiCallback('UpdateUserStats', (stats) => {
      dispatch(setStats({
        currentHp:stats.minHp,
        maxHp : stats.maxHp,
        currentMana: stats.minMan,
        maxMana: stats.maxMan,
        currentShield: stats.hpShield,
        gold: stats.gold,
        safeGoldForLevel: stats.safeGoldForLevel,
        currentEnergy: stats.minSta,
        maxEnergy: stats.maxSta,
        drink: stats.minAgu,
        food: stats.minHam,
        shield: {min:0, max:0},
        weapon: {min:0, max:0},
        helm: {min:0, max:0},
        armor: {min:0, max:0},
        magicDef:0,
        magicBonus:0,
        attackLock: true,
        clanLock: true,
        groupLock: true
      }))
      dispatch(setCharacterInfo({
        class: stats.class,
        exp: {min: stats.exp, max: stats.nextLevel},
        level : stats.level
      }))
    })
    RegisterApiCallback('SetUserName', (name) => {
      dispatch(setUserName(name))
    })
    RegisterApiCallback('UpdateFps', (fps) => {
      dispatch(setFps(fps))
    })
    RegisterApiCallback('SetInventoryLevel', (level) => {
      dispatch(setInvLevel(level))
    })
    RegisterApiCallback('UpdateInvSlot', (slotInfo) => {
      dispatch(updateInvSlot(slotInfo))
    })
    RegisterApiCallback('UpdateSpellSlot', (slotInfo) => {
      dispatch(updateSpellSlot(slotInfo))
    })
    RegisterApiCallback('UpdateHp', (slotInfo) => {
      dispatch(updateHp(slotInfo))
    })
    RegisterApiCallback('UpdateMana', (slotInfo) => {
      dispatch(updateMana(slotInfo))
    })
    RegisterApiCallback('UpdateStamina', (slotInfo) => {
      dispatch(updateStamina(slotInfo))
    })
    RegisterApiCallback('UpdateFood', (slotInfo) => {
      dispatch(updateFood(slotInfo))
    })
    RegisterApiCallback('UpdateDrink', (slotInfo) => {
      dispatch(updateDrink(slotInfo))
    })
    RegisterApiCallback('UpdateGold', (gold, safeGoldForLevel) => {
      dispatch(updateGold({gold, safeGoldForLevel}))
    })
    RegisterApiCallback('UpdateExp', (current, max) => {
      dispatch(updateExp({min: current, max: max}))
    })
    RegisterApiCallback('UpdateStrAndAgi', (str, agi, strState, agiState) => {
      dispatch(updateStrandAgi({str:str, agi:agi, strState:strState, agiState:agiState}))
    })
    RegisterApiCallback('UpdateMapNumber', (mapName, mapNumber, isSafe) => {
      dispatch(setMapInfo({mapName, mapNumber, isSafe}))
    })
    RegisterApiCallback('UpdateMapNpc', (data) => {
      dispatch(setInterestPoints(data))
    })
    RegisterApiCallback('UpdatePlayerCoord', (posX, PosY, MapPosX, MapPosY) => {
      dispatch(setCoordinates({x:posX, y:PosY, mapPos: {x:MapPosX, y: MapPosY}}))
    })
    RegisterApiCallback('UpdateGroupMarker', (posX, PosY, index) => {
      dispatch(updateGroupMarker({ mapPos: {x:posX, y: PosY}, index: index}))
    })
    RegisterApiCallback('PrepareGemplayScreen', () => {
      dispatch(resetGameplay)
    })
    RegisterApiCallback('UpdateKeySlot', (slotInfo) => {
      dispatch(updateKeySlot(slotInfo))
    })
    RegisterApiCallback('UpdateIntervals', (intervals) => {
      dispatch(updateIntervals(intervals))
    })
    RegisterApiCallback('StartInterval', (intervalType, tunnelDelay) => {
      dispatch(fireInterval({intervalType: intervalType, startTime: Date.now() - tunnelDelay}))
    })
    RegisterApiCallback('StartStunTime', (duration, tunnelDelay) => {
      dispatch(startStun({duration: duration, startTime: Date.now() - tunnelDelay}))
    })
    RegisterApiCallback('UpdateLockState', (type, state) => {
      dispatch(updateLockState({type:type, state:state}))
    })
    RegisterApiCallback('UpdateOnlines', (newValue) => {
      dispatch(updateOnlines(newValue))
    })
    RegisterApiCallback('UpdateGameTime', (hour, minutes) => {
      dispatch(updateGameTime({hour:hour, minutes:minutes}))
    })
    RegisterApiCallback('UpdateIsGameGaster', (state) => {
      dispatch(updateIsGameMaster(state))
    })
    RegisterApiCallback('UpdateMagicAttack', (value) => {
      dispatch(updateMagicAttack(value))
    })
    RegisterApiCallback('UpdateMagicResistance', (value) => {
      dispatch(updateMagicResitance(value))
    })
    RegisterApiCallback('SetWhisperTarget', (target) => {
      dispatch(setWhisperTarget({target:target, openChat: true}))
    })
    RegisterApiCallback('PasteText', (text) => {
      if (document.activeElement instanceof  HTMLInputElement) {
        document.activeElement.setRangeText(text, document.activeElement.selectionStart,document.activeElement.selectionEnd, "end")
      }
    })
    RegisterApiCallback('ReloadSettings', (options) => {
      dispatch(updateSettings(options))
      const language = window.parent.BabelUI.GetStoredLocale()
      i18n.changeLanguage(language)
    })
    RegisterApiCallback('SetRemoteInvstate', (activeTab, selectedSpell, firstDisplaySpell) => {
      dispatch(updateFirstSpellToDisplay(firstDisplaySpell))
      dispatch(selectSpellSlot(selectedSpell))
      dispatch(updateRemoteTab(activeTab))
    })
    RegisterApiCallback('SetRemoteTrackingState', (state) => {
      dispatch(updateTrackState(state > 0))
    })
    RegisterApiCallback('RemoteUserClick', () => {
      dispatch(updateTrackLastMouseClick())
    })
    RegisterApiCallback('UpdateRemoteMousePos', (posX, posY) => {
      dispatch(updateTrackMousePos({x:posX, y: posY}))
    })
    RegisterApiCallback('StartSpellCd', (spellId, cdTime) => {
      dispatch(startSpellcd({spellId, cdTime}))
    })
    RegisterApiCallback('UpdateCombatAndGlobalChatModes', (combatEnabled, globalEnabled) => {
      dispatch(updateGlobalAndCombatModes({combatEnabled, globalEnabled}))
    })
    RegisterApiCallback('UseRemoveHotkey', (index) => {
      dispatch(activateRemoteHotkey(index))
    })
    RegisterApiCallback('UpdateHotkeySlot', (index, targetIndex, lastKnownSlot, type ) => {
      dispatch(setHotkeySlot({
        type: type,
        index: index,
        content: {
          targetIndex: targetIndex,
          lastKnownSlot: lastKnownSlot,
          lastUse: 0
        }
      }))
    })
    RegisterApiCallback('ClearToggles', () => {
      dispatch(clearFeatureToggles())
    })
    RegisterApiCallback('ActivateFeatureToggle', (toggleName) => {
      dispatch(addFeatureToggle(toggleName))
    })
    RegisterApiCallback('SetHideHotkeyState', (newState) => {
      dispatch(setHideHotkeys(newState))
    })
    RegisterApiCallback('ShowQuestion', (questionText) => {
      const questionACtion = {
        popUp:'option-dialog',
        text: questionText,
        actions: [{
          caption: t('decline').toUpperCase(),
          action:  evt => {
            window.parent.BabelUI.SendQuestionResponse(false)
            dispatch(setGameActiveDialog(null))
          }}, {
          caption: t('accept').toUpperCase(),
          action:  evt => {
            window.parent.BabelUI.SendQuestionResponse(true)
            dispatch(setGameActiveDialog(null))
          },
          isRed: true}
        ]
      }
      dispatch(setGameActiveDialog(questionACtion))
    })
    RegisterApiCallback('OpenMerchant', () => {
      dispatch(openNpcTradeDialog())
    })
    RegisterApiCallback('UpdateMerchantSlot', (slotInfo) => {
      dispatch(handleMerchantItemChange(slotInfo))
    })
    RegisterApiCallback('OpenAoShop', (availableCredits, itemList) => {
      dispatch(openAoShop({availableCredits, itemList}))
    })

    
    const language = window.parent.BabelUI.GetStoredLocale()
    i18n.changeLanguage(language)
    axios.defaults.headers.common['Accept-Language'] = 'es-AR, es;q=0.9 en;q=0.8'
  },[]);  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const handleGlobalKeyPress = evt => {
        if (evt.key === '|' ) {
              setTimeout(() => {
                window.parent.APicallbacks.PasteText("test paste")
              }, 25)
        }
      }
      window.addEventListener("keyup", handleGlobalKeyPress);
    }
  },[]);
  const activePopup = useSelector(selectActivePopup)
  const popupData = useSelector(selectPopupData)
  const fadeOut = useSelector(selectIsFadeOut)
  return (
    <div className='app'>
      {
        fadeOut != null ? <span className={'backgrund ' + (fadeOut ? 'go-to-black' : 'go-to-transparent') }></span> : null
      }
      <LogInFlow/>
      {
          activePopup !== '' ?
          <div className='popups'>
          {
            {
                'loading':<Loading styles='centered'>{popupData}</Loading>,
                'error-message':<ErrorMessage styles='centered'>{popupData}</ErrorMessage>,
                'option-dialog':<OptionDialog styles='centered' settings={popupData}/>,
                'validate-code':<ValidateCode styles='centered'/>,
                'transfer-character':<TransferCharacter styles='centered' settings={popupData}/>
            }
            [activePopup]
          }
          </div>
          :
          null
      }
      <ErrorBoundary compName="tooltips ">
        <ActiveToolTip/>
      </ErrorBoundary>
    </div>
  );
}

export default App;
