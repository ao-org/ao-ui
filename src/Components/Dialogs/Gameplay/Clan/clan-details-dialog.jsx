import { useState } from 'react'
import './clan-details-dialog.scss'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import AoButton from '../../../Common/ao-button/ao-button'
import { useTranslation } from 'react-i18next'

const Label = ({name, value}) => (
  <div key={name} className='label'>
    <span className='text'>{name}: </span>
    <span className='text'>{value}</span>
  </div>
)

export default function ClanDetailsDialog({ clan, styles, onClose }) {
  const [requestContent, setRequestContent] = useState('')
  const { t } = useTranslation();

  return (
    <AoDialog styles={styles} ignoreAnimation={true}>
      <div className='clan-details-dialog'>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
        <div className='details-box'>
          <p className='text-title'>{t('clan-information')}</p>
          <Label name={t('name')} value={clan.nombre}/>
          <Label name={t('founder')} value={clan.fundador}/>
          <Label name={t('creation-date')} value={clan.fecha_creacion}/>
          <Label name={t('leader')} value={clan.lider} />
          <Label name={t('members')} value={clan.miembros} />
          <Label name={t('alignment')} value={clan.alineacion} />
          <Label name={t('clan-level')} value={clan.nivel_del_clan} />
          <div className='flag'/>
        </div>
        <label className='description-box text-title'>
          {t('admission-application')}
          <textarea 
            className='text-input'
            value={requestContent}
            onChange={e => setRequestContent(e.target.value)}
          />
        </label>
        <AoButton caption='guardar' styles='guardar'>{t('request-admission')}</AoButton>
      </div>
    </AoDialog>
  )
}
