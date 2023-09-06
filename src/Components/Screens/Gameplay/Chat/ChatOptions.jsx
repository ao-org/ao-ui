import { useTranslation } from 'react-i18next'
import { ChatStates } from '../../../../constants'
import { useSelector } from 'react-redux'
import { selectIsGameMaster } from '../../../../redux/GameplaySlices/GameStateSlice'

export const ChatOptions = ({selectOptions, currentOption}) => {
  const { t } = useTranslation()
  const isGm = useSelector(selectIsGameMaster)
  return (
    <div className='chat-options'>
      <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.Normal)}}>
        { currentOption === ChatStates.Normal ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
        {t('Normal')}
      </span>
      <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.Global)}}>
        { currentOption === ChatStates.Glolbal ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
        {t('Global')}</span>
      <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.Private)}}>
        { currentOption === ChatStates.Private ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
        {t('Private')}
      </span>
      <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.Shout)}}>
        { currentOption === ChatStates.Shout ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
        {t('Shout')}
      </span>
      <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.Clan)}}>
        { currentOption === ChatStates.Clan ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
        {t('Clan')}
      </span>
      <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.Group)}}>
      { currentOption === ChatStates.Group ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
        {t('Group')}
      </span>
      {
        isGm ?
        <>
          <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.Gmsg)}}>
          { currentOption === ChatStates.Gmsg ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
            {t('Gmsg')}
          </span>
          <span className='chat-opt' onClick={()=>{ selectOptions(ChatStates.GmGlobal)}}>
          { currentOption === ChatStates.GmGlobal ? <img className='selection-icon' src={require('../../../../assets/Icons/gameplay/ico_active_chat.png')}/>: null }
            {t('GMGlobal')}
          </span>
        </>
        : null
      }
    </div>
  )
}