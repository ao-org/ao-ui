import { Actions } from "../constants"

const RegisterApiCallback = (name,callback) => {
  if (window.parent.APicallbacks == null) {
    window.parent.APicallbacks = {}    
  }
  window.parent.APicallbacks[name] = callback
}
let CallCount = 1
if (process.env.NODE_ENV === 'development') {
  window.parent.BabelUI = {
    Login: (email, password, storeCredentials) => {
      setTimeout(() => {
        window.parent.APicallbacks.SetActiveDialog('character-selection')
        window.parent.APicallbacks.SetCharacter({name:'gordo en zunga', head: 0, body: 0, helm: 0, shield: 0, weapon:0, level: 20, status: 1, index: 0, class:1})
        window.parent.APicallbacks.SetCharacter({name:'Macho en zunga', head: 0, body: 1, helm: 0, shield: 0, weapon:0, level: 20, status: 0, index: 1, class:2})
        window.parent.APicallbacks.SetCharacter({name:'no c', head: 0, body: 0, helm: 0, shield: 0, weapon:0, level: 20, status: 0, index: 2, class:3})
        window.parent.APicallbacks.SetCharacter({name:'gordo en zunga', head: 0, body: 1, helm: 0, shield: 0, weapon:0, level: 20, status: 3, index: 3, class:4})
        window.parent.APicallbacks.SetCharacter({name:'gordo en zunga', head: 0, body: 0, helm: 0, shield: 0, weapon:0, level: 20, status: 4, index: 4, class:5})
        window.parent.APicallbacks.SetCharacter({name:'tute', head: 0, body: 1268, helm: 2, shield: 2, weapon:2, level: 47, status: 7, index: 5, class:6})
        window.parent.APicallbacks.SetCharacter({name:'gordo en zunga', head: 0, body: 0, helm: 0, shield: 0, weapon:0, level: 20, status: 0, index: 6, class:7})
        window.parent.APicallbacks.SetCharacter({name:'gordo en zunga', head: 0, body: 0, helm: 0, shield: 0, weapon:0, level: 20, status: 0, index: 7, class:8})
        window.parent.APicallbacks.SetCharacter({name:'gordo en zunga', head: 0, body: 0, helm: 0, shield: 0, weapon:0, level: 20, status: 0, index: 8, class:9})
      }, 100)
    },
    CloseClient: () => {
    },
    GetCredentials: () => ({
      user: "test@a.com",
      password: "pwdd",
    }),
    CreateAccount: (email, password, name, surname) => {
      setTimeout(() => {
        window.parent.APicallbacks.ErrorMessage('error test', 1 ,0)
      }, 100)
    },
    ResendValidationCode: email => {
    },
    ValidateCode: (email, code) => {
    },
    SetHost: (environment) => {
    },
    RequestPasswordReset: email => {
    },
    NewPasswordRequest: (email, code, password) => {
    },
    ExitCharacterSelection: () => {
      setTimeout(() => {
        window.parent.APicallbacks.SetActiveDialog('login')
      }, 100)
    },
    GetCharacterDrawInfo: (body, head, helm, shield, weapon) => {
      switch (body)
      {
        case 1:
          return  ({
            body: {
              body: {
                height: 47,
                imageNumber: 1822,
                startX: 0,
                startY: 0,
                width: 27
              },
              HeadOffsetX: 0,
              HeadOffsetY: -35
            },
            head: {
                height: 32,
                imageNumber: 420,
                startX: 81,
                startY: 160,
                width: 27
              },
            helm: {
                height: 32,
                imageNumber: -1,
                startX: 0,
                startY: 0,
                width: 27
              },
            shield: {
              height: 47,
              imageNumber: 2315,
              startX: 0,
              startY: 0,
              width: 27
            },
            weapon: {
                height: 47,
                imageNumber: 719,
                startX: 0,
                startY: 0,
                width: 27
              }
            })
        case 1268:
          return  ({
          body: {
            body: {
              height: 128,
              imageNumber: 386,
              startX: 0,
              startY: 512,
              width: 128
            },
            HeadOffsetX: 0,
            HeadOffsetY: -35
          },
          head: {
              height: 0,
              imageNumber: 0,
              startX: 0,
              startY: 0,
              width: 0
            },
          helm: {
              height: 0,
              imageNumber: 0,
              startX: 0,
              startY: 0,
              width: 0
            },
          shield: {
            height: 0,
            imageNumber: 0,
            startX: 0,
            startY: 0,
            width: 0
          },
          weapon: {
              height: 0,
              imageNumber: 0,
              startX: 0,
              startY: 0,
              width: 0
            }
          })
        default:
          return ({
            body: {
              body: {
                height: 47,
                imageNumber: 1101,
                startX: 0,
                startY: 0,
                width: 27
              },
              HeadOffsetX: 0,
              HeadOffsetY: -26
            },
            head: {
                height: 32,
                imageNumber: 420,
                startX: 135,
                startY: 0,
                width: 27
              },
            helm: {
                height: 32,
                imageNumber: 440,
                startX: 0,
                startY: 0,
                width: 27
              },
            shield: {
                height: 47,
                imageNumber: 2315,
                startX: 0,
                startY: 0,
                width: 27
              },
            weapon: {
                height: 47,
                imageNumber: 719,
                startX: 0,
                startY: 0,
                width: 27
              }
            })
      }
    },
    SelectCharacter: character => {
    },
    LoginCharacter: character => { 
      setTimeout(() => {
        window.parent.APicallbacks.SetActiveDialog('gameplay')
      }, 100)
    },
    GetHeadDrawInfo: headIndex => {
      return {
        height: 32,
        imageNumber: 420,
        startX: 135,
        startY: 0,
        width: 27
      }
    },
    CreateCharacter: (name, gender, race, head, classId, homeCity) => {
      return true
    },
    GetStoredLocale: () => {
      return "es"
    },
    EnableDebug: ()=> {
      return true
    },
    TransferCharacter: (index, email) => {

    },
    RequestDeleteCharacter: index => {
      setTimeout(() => {
        window.parent.APicallbacks.RequestDeleteCode()
      }, 1000)
    },
    ConfirmDeleteCharacter : (index, code) => {
      setTimeout(() => {
        window.parent.APicallbacks.DeleteCharacterFromList(index)
      }, 1000)
    },
    ValidatePrevCode: (code) => {
    },
    RequestCharacterTransfer: (index, destEmail) => {
    },
    GetGrhDrawInfo: (grhIndex) => {
      return {
        height: 32,
        imageNumber: 108,
        startX: 256,
        startY: 32,
        width: 32
      }
    },
    SendChat: msg => {
      if (CallCount < 100) {
        setTimeout(() => {
          window.parent.APicallbacks.PostChatMsg({sender:'Tester', text:(msg + CallCount), senderColor: {R:255, G:0, B: 0}, textColor: {R:255, G:255, B: 255}, italic:true, bold: true })
          window.parent.BabelUI.SendChat(msg)
          CallCount += 1
        }, 25)
      }
      else {
        CallCount = 0
      }
    },
    UpdateSelectedInvSlot: slotIndex => {
    },
    UseInvSlotIndex: slotIndex => {      
    },
    UpdateSelectedSpellSlot: slotIndex => {
    },
    UseSpellSlot: slotIndex => {
      console.log("use spell " + slotIndex)
    },
    OpenVBDialog: dialogName => {
      if (dialogName === 'frmCerrar'){
        window.parent.APicallbacks.SetActiveDialog('login')
      }
    },
    UpdateInputFocus: newState => {
    },
    OpenLink: link => {      
    },
    GoldClick: () => {
    },
    MoveInvItem: (source, dest) => {
      console.log("move item from " + source + " to " + dest)
    },
    RequestAction: action => {
    },
    ClickMiniMapPos: (posX, posY) => {
      console.log(`click minimap at ${posX}, ${posY}` )
    },
    UpdateSelectedKeySlot: (slot) => {
    },
    UseKeySlotIndex: (slot) => {      
    },
    FakeHitEvent: () => {
      setTimeout(() => {
        window.parent.APicallbacks.StartInterval(2, 0)
      }, 25)
    },
    SetInventory: () => {
      setTimeout(() => {
        window.parent.APicallbacks.UpdateInvSlot({name:'hacha vikinga', count:999, cantUse: 0, 
                                                  equipped: true, grh:36467, description:'texto de prueba a ver como se ve',
                                                  maxDef:0, minDef:0, minHit:5000, maxHit:5000, 
                                                  objIndex: 1812, type: 2, value: 5, 
                                                  cooldown:4000, cdType:5, cdMask:19, index:1})
        window.parent.APicallbacks.UpdateInvSlot({name:'algun arco', count:1, cantUse: 0, 
                                                  equipped: true, grh:36467,
                                                  maxDef:0, minDef:0, minHit:5000, maxHit:5000, 
                                                  objIndex: 1812, type: 2, value: 0.5, 
                                                  cooldown:0, cdType:0, cdMask:2, index:2, isBindable:true})
        window.parent.APicallbacks.UpdateInvSlot({name:'alguna espada', count:1500, cantUse: 0, 
                                                  equipped: true, grh:36467,
                                                  maxDef:0, minDef:0, minHit:5000, maxHit:5000, 
                                                  objIndex: 1812, type: 2, value: 1.666, 
                                                  cooldown:0, cdType:0, cdMask:1, index:3})
        window.parent.APicallbacks.UpdateInvSlot({name:'algun usable', count:1150, cantUse: 2, 
                                                  equipped: true, grh:36467,
                                                  maxDef:0, minDef:0, minHit:5000, maxHit:5000, 
                                                  objIndex: 1812, type: 53, value: 10, 
                                                  cooldown:30000, cdType:10, cdMask:16, index:4})
        window.parent.APicallbacks.UpdateInvSlot({name:'pocion', count:1150, cantUse: 2, 
                                                  equipped: true, grh:36467,
                                                  maxDef:0, minDef:0, minHit:0, maxHit:0, 
                                                  objIndex: 1812, type: 11, value: 10, 
                                                  cooldown:0, cdType:0, cdMask:8, index:10})

        window.parent.APicallbacks.UpdateSpellSlot({name:'test', index:1, spellIndex: 5, 
                                                  grh:36467, isBindable:true})                                          
      }, 5)
    },
    MoveSpellSlot: (from, to) => {
      console.log(`move from ${from} to ${to}`)
    },
    DeleteItem: itemIndex => {
    },
    UpdateOpenDialog: state => {
      console.log('UpdateOpenDialog ' + state)
    },
    GetSpellInfo : spellIndex => {
      return { name: "test spell", description: "some spell data", cooldown:40000, requiredMana:1500, requiredSkill:100, requiredStamina: 950}
    },
    GetItemInfo : objIndex => {
      return { objType: 24, spellIndex: 1, grhIndex: 10, text: "some item details with a long explanations"}
    },
    LogError: error => {
      console.log(error)
    },
    InformSpellListScroll: scrollPos => {
    },
    UpdateCombatAndGlobatChatState: (combat, global) => {
      
    },
    Copytext: text => {
      console.log("copy:" + text)
    },
    UpdateHoykeySlotInfo: (slotIndex, value, LastKnownSlot, Type) => {
      console.log("update hotkey slot " + slotIndex)
    },
    UpdateHideHotkeyState: newState => {
    },
    GetNpcName: npcNumber => {
      return "Gulfas morgolock"
    },
    SellItem: (slot, amount) => {

    },
    BuyItem: (slot, amount) => {

    },
    CloseMerchant: () => {

    },
    MoveMerchantItem: (from, to) => {
    },
    GetWorldGrid: () => {
      return [{height:22, width: 19}, {height:22, width: 19}, {height:22, width: 19}, {height:22, width: 19}]
    },
    BuyPatronItem: (objIndex) => {
    },
    UpdateBoolSetting: (settingType, newValue) => {
    },
    UpdateIntSetting: (settingType, newValue) => {
    }
  } 
}
export {RegisterApiCallback}