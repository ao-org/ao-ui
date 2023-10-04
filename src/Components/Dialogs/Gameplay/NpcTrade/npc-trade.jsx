import { useTranslation } from 'react-i18next';
import AoButton from '../../../Common/ao-button/ao-button'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import './npc-trade.scss'
import { TradeInventory } from './TradeInventory/trade-inventory';
import AoInput from '../../../Common/ao-input/ao-input';
import { useState } from 'react';
import GameBarButton from '../../../Common/ao-button/GameBarButton/game-bar-button';
import { useDispatch, useSelector } from 'react-redux';
import { selectExtraSlotState, selectInventorySlots } from '../../../../redux/GameplaySlices/InventorySlice';
import { selectMerchantSlots, setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import { selectGold } from '../../../../redux/GameplaySlices/PlayerStatsSlice';

const InventoryType = {
  Unselected: 0,
  Npc: 1,
  User:2
}

const onDropItem = (item, container) => {
  window.parent.BabelUI.MoveInvItem(item.index, container.id)
}

const onDropMerchantItem = (item, container) => {
  window.parent.BabelUI.MoveMerchantItem(item.index, container.id)
}
export const NpcTrade = ({settings}) => {
  const { t } = useTranslation();
  const [ state, setState] = useState({amount:1, 
                                       selectedInventory:0, 
                                       selectedIndex: InventoryType.Unselected,
                                       price: 0,
                                       selectedItemValue: 0})
  const invLevel = useSelector(selectExtraSlotState)
  const userList = useSelector(selectInventorySlots)
  const npsList =  useSelector(selectMerchantSlots)
  const userGold = useSelector(selectGold)
  let extraSlots = 0
  invLevel.forEach( element => {
    if (element) {
      extraSlots += 6
    }
  });
  const handleChange = event => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value});
  }
  const onSelectedInvenroty = (inventory, item) => {
    setState({ ...state, 
              selectedInventory: inventory,
              selectedIndex: item.index,
              selectedItemValue: item.value});

  }
  const increaseAmount = e => {
    setState({ ...state, 
      amount: Math.min(state.amount + 1, 10000)
    });
  }
  const decreaseAmount = e => {
    setState({ ...state, 
      amount: Math.max(state.amount - 1, 0)
    });
  }
  const selectMin = e => {
    setState({ ...state, 
      amount: 1
    });
  }
  const selectMax = () => {
    if (state.selectedInventory === InventoryType.Npc) {
      setState({ ...state, 
        amount: Math.min(npsList[state.selectedIndex].count, Math.trunc(userGold / state.selectedItemValue))
      });
    }
    else if (state.selectedInventory === InventoryType.User) {
      setState({ ...state, 
        amount: userList[state.selectedIndex].count
      });
    }
  }
  const dispatch = useDispatch()
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
    window.parent.BabelUI.CloseMerchant()
  }
  const onSell = e => {
    if (state.selectedInventory !== InventoryType.User || state.amount < 1) {
      return
    }
    window.parent.BabelUI.SellItem(state.selectedIndex, state.amount)
  }
  const onBuy = e => {
    if (state.selectedInventory !== InventoryType.Npc || state.amount < 1) {
      return
    }
    window.parent.BabelUI.BuyItem(state.selectedIndex, state.amount)
  }
  const itemCount = state.selectedInventory === InventoryType.Npc ? state.amount : Math.min(state.amount, userList[state.selectedIndex].count)
  const price = Math.trunc(state.selectedItemValue *  itemCount)
  return (
    <AoDialog styles='npc-trade' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../assets/Icons/gameplay/Merchant.png')}/>
        <h1 className='game-dialog-header'>{t('merchant').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <div className='inventory-line'>
        <TradeInventory tittle={t('offer')} 
          slotDetail={npsList} unlockedSlots={42}
          selectedIndex={state.selectedInventory === InventoryType.Npc ? state.selectedIndex : -1 }
          onSelect={(item)=> {onSelectedInvenroty(InventoryType.Npc, item)}}
          onDropItem={onDropMerchantItem}
        />
        <span className='horizontal-gap10'></span>
        <TradeInventory tittle={t('inventory')} 
          slotDetail={userList} unlockedSlots={24 + extraSlots}
          selectedIndex={state.selectedInventory === InventoryType.User ? state.selectedIndex : -1 }
          onSelect={(item)=> {onSelectedInvenroty(InventoryType.User, item)}}
          onDropItem={onDropItem}
        />
      </div>
      <div className='price-line'>
        <img className='gold-icon' 
          src={require('../../../../assets/Icons/gameplay/ico_stats_coins.png')} 
        />
        <p className='gold-text'>{price}</p>
      </div>
      <div className='button-line'>
        <AoButton styles='trade-buttons' disabled={state.selectedInventory !== InventoryType.Npc}
          onClick={onBuy}
          >{t('buy').toUpperCase()}</AoButton>
        <div className='amount-section'>
          <GameBarButton styles='minmax-buttons' onClick={selectMin}>{t('Min')}</GameBarButton>
          <GameBarButton styles='increment-decrement-buttons' onClick={decreaseAmount}>-</GameBarButton>
          <AoInput name="amount" type="number"  
            min="1" max="10000"
            IsValid={true}
            value={state.amount}
            inputStyles='amount-style'
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            handleChange={handleChange}/>
          <GameBarButton styles='increment-decrement-buttons' onClick={increaseAmount} >+</GameBarButton>
          <GameBarButton styles='minmax-buttons' onClick={selectMax}>{t('Max')}</GameBarButton>
        </div>
        <AoButton disabled={state.selectedInventory !== InventoryType.User} styles='trade-buttons'
          onClick={onSell}
        >{t('sell').toUpperCase()}</AoButton>
      </div>
    </AoDialog>
  )
}