import { useState } from 'react'
import './clan-details-dialog.scss'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import AoButton from '../../../Common/ao-button/ao-button'
import { useTranslation } from 'react-i18next'

const mockClanDetail = {
  'nombre': 'Two Easy',
  'fundador': 'tenesule',
  'fecha_creacion': '03/08/2023',
  'lider': '1269',
  'miembros': 10,
  'alineacion': 'Neutral',
  'nivel_del_clan': 4
}

const Label = ({name, value}) => (
  <div key={name} className='label'>
    <span className='text'>{name}: </span>
    <span className='text'>{value}</span>
  </div>
)

export default function ClanDetailsDialog({styles}) {
  const [requestContent, setRequestContent] = useState('')
  const { t } = useTranslation();

  return (
    <AoDialog styles={styles}>
      <div className='clan-details-dialog'>
        <div className='details-box'>
          <p className='text-title'>{t('clan-information')}</p>
          <Label name={t('name')} value={mockClanDetail.nombre}/>
          <Label name={t('founder')} value={mockClanDetail.fundador}/>
          <Label name={t('creation-date')} value={mockClanDetail.fecha_creacion}/>
          <Label name={t('leader')} value={mockClanDetail.lider} />
          <Label name={t('members')} value={mockClanDetail.miembros} />
          <Label name={t('alignment')} value={mockClanDetail.alineacion} />
          <Label name={t('clan-level')} value={mockClanDetail.nivel_del_clan} />
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
