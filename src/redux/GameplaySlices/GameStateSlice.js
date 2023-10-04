import { createAction, createSlice } from '@reduxjs/toolkit'

export const resetGameplay = createAction('gamemplay/reset')
export const exitGameplay = createAction('gameplay/exit')

export const GameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    fps: 0,
    online: 0,
    gameTime: {hour:0, minutes:0},
    isGameMaster: false,
    activeDialog:  {
      popUp: 'world-map'
    },
    spellListScroll: 0,
    firstDisplaySpell: -1,
    trackUserActive: 0,
    trackUserMousePos: {x:0, y:0},
    trackUserLastClick: 0,
    trackRemoteInvTab: -1,
    merchantSlots: null
  },
  reducers: {
    setFps: (state, action) => {
      state.fps = action.payload
    },
    setGameActiveDialog: (state, action) => {
      state.activeDialog = action.payload
      window.parent.BabelUI.UpdateOpenDialog(action.payload != null)
    },
    updateOnlines: (state, action) => {
      state.online = action.payload
    },
    updateGameTime: (state, action) => {
      if (action.payload.hour !== state.gameTime.hour ||
          action.payload.minutes !== state.gameTime.minutes){
        state.gameTime = action.payload
      }
    },
    updateIsGameMaster: (state, action) => {
      state.isGameMaster = action.payload
    },
    updateSpellListScroll: (state, action) => {
      state.spellListScroll = action.payload
    },
    updateFirstSpellToDisplay: (state, action) => {
      state.firstDisplaySpell = action.payload
    },
    updateTrackState: (state, action) => {
      state.trackUserActive = action.payload
    },
    updateTrackMousePos: (state, action) => {
      state.trackUserMousePos = action.payload
    },
    updateTrackLastMouseClick: (state) => {
      state.trackUserLastClick += 1 
    },
    updateRemoteTab: (state, action) => {
      state.trackRemoteInvTab = action.payload
    },
    openNpcTradeDialog: (state) => {
      state.activeDialog = {
        popUp: 'npc-trade'
      }
      if (!state.merchantSlots) {
        state.merchantSlots = Array(42).fill({name:'', count:1, cantUse: 0, equipped: false, grh:0,
        maxDef:0, minDef:0, minHit:0, maxHit:0, objIndex: 0, type: 0,
        value: 0, cooldown:0, cdType:0, cdMask:0})
        .map((element, index) => ({...element, count: 0, index:index}))
      }
      window.parent.BabelUI.UpdateOpenDialog(true)
    },
    handleMerchantItemChange: (state, action) => {
      if (!state.merchantSlots) {
        state.merchantSlots = Array(42).fill({name:'', count:1, cantUse: 0, equipped: false, grh:0,
        maxDef:0, minDef:0, minHit:0, maxHit:0, objIndex: 0, type: 0,
        value: 0, cooldown:0, cdType:0, cdMask:0})
        .map((element, index) => ({...element, count: 0, index:index}))
      }
      state.merchantSlots[action.payload.index] = action.payload
    },
    openAoShop: (state, action) => {
      state.activeDialog = {
        popUp: 'ao-shop',
        itemList: action.payload.itemList,
        availableCredits: action.payload.availableCredits
      }
      window.parent.BabelUI.UpdateOpenDialog(true)
    },
    extraReducers: (builder) => {
      builder
        .addCase(resetGameplay, (state) => {
          state.activeDialog = null
        })
        .addCase(exitGameplay, (state) => {
          state.activeDialog = null
          window.parent.BabelUI.UpdateOpenDialog(false)
        })
    }
  },
})

export const { setFps, setGameActiveDialog, updateOnlines, updateGameTime, openAoShop,
               updateIsGameMaster, updateSpellListScroll, openNpcTradeDialog,
               updateFirstSpellToDisplay, updateTrackState, updateTrackMousePos,
               updateTrackLastMouseClick, updateRemoteTab, handleMerchantItemChange } = GameStateSlice.actions

export const selectFps = (state) =>  state.gameState.fps
export const selectOnlines = (state) => state.gameState.online
export const selectActiveDialog = (state) => state.gameState.activeDialog
export const selectGameTime = (state) => state.gameState.gameTime
export const selectIsGameMaster = (state) => state.gameState.isGameMaster
export const selectSpellListScroll = (state) => state.gameState.spellListScroll
export const selectFirstSpellToDisplay = (state) => state.gameState.firstDisplaySpell
export const selectTrackUserActive = (state) => state.gameState.trackUserActive
export const selectRemoteMousePos = (state) => state.gameState.trackUserMousePos
export const selectTrackUserLastClick = (state) => state.gameState.trackUserLastClick
export const selectTrackUserActiveInvTab = (state) => state.gameState.trackRemoteInvTab
export const selectMerchantSlots = (state) => state.gameState.merchantSlots

export default GameStateSlice.reducer