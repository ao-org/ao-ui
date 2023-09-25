import { createSelector, createSlice } from '@reduxjs/toolkit'

const defaultSettings = {
  gameSettings: {
  gameplay : {
    copyDialogsEnabled: false,
    writeAndMove: false,
    blockSpellListScroll: false,
    throwSpellLockBehavior: 0,
    mouseSens: 0,
    invertMouse: false,
    userGraphicCursor: false,
    language: 1,
    renderNpcText: false,
    tutorialEnabled: false
    },
    video: {
      shopFps: false,
      moveGameWindow: false,
      characterBreathing: false,
      fullScreen: false,
      displayFloorItemInfo: false,
      displayFullNumbersInventory: false,
      enableBabelUI: false
    },
    audio: {
      enableMusic: false,
      enableFx: false,
      enableAmbient: false,
      sailFx: false,
      invertChannels: false,
      musicVolume: 0,
      fxVolume: 0,
      ambientVolume: 0
    }
  },
  spellListScrollLock: 0,
  combatChat: 0,
  spellMode: 0,
  scrollDrag: 0,
  featureToggles: ['hotokey-enabled'],
  hideHotkeys: false
}
export const GameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: defaultSettings,
  reducers: {
    updateSettings: (state, action) => {
      state.gameSettings = action.payload
    },
    clearFeatureToggles: (state) => {
      state.featureToggles = []
    },
    addFeatureToggle: (state, action) => {
      state.featureToggles.push(action.payload)
    },
    setHideHotkeys: (state, action) => {
      state.hideHotkeys = action.payload
    }
  },
})

export const { updateSettings, clearFeatureToggles, addFeatureToggle, setHideHotkeys } = GameSettingsSlice.actions

export const selectItemCountFormat = (state) => state.gameSettings.gameSettings.video.displayFullNumbersInventory
export const selectSpellListScrollLock = (state) => state.gameSettings.gameSettings.gameplay.blockSpellListScroll
export const selectHideHotkeys = (state) => state.gameSettings.hideHotkeys
export const selectGameplaySettings = (state) => state.gameSettings.gameSettings.gameplay
export const selectVideoSettings = (state) => state.gameSettings.gameSettings.video
export const selectAudioSettings = (state) => state.gameSettings.gameSettings.audio

export const isToggleEnabled = createSelector(
  [
    // Usual first input - extract value from `state`
    state => state.gameSettings.featureToggles,
    // Take the second arg, `category`, and forward to the output selector
    (state, toggleName) => toggleName
  ],
  // Output selector gets (`items, category)` as args
  (toggles, toggleName) => {
    return toggles.includes(toggleName)
  }
);

export default GameSettingsSlice.reducer