import './clan-list.scss'
import AoDialog from "../../../Common/ao-dialog/ao-dialog";
import AoButton from '../../../Common/ao-button/ao-button';
import ClanDetailsDialog from './clan-details-dialog';
import { useState, useRef } from 'react';
import AoInput from '../../../Common/ao-input/ao-input';

const Alineaciones = {
  'neutral': 'Neutral',
  'armada': 'Armada',
  'legion': 'Legion'
}

export default function ClanListDialog({styles, stylesDetail}) {
  const [search, setSearch] = useState('')
  const [alineacion, setAlineacion] = useState(Alineaciones.neutral)
  const inputRef = useRef(null);
  const [selectedClan, setSelectedClan] = useState(false)

  if(selectedClan){
    return (
      <ClanDetailsDialog 
        clan={selectedClan} 
        styles={stylesDetail} 
        onClose={() => setSelectedClan(null)}
      />
    )
  }

  //TO DO: replace this FN
  const mockGetDetailClanFn = async (clanName, alineacion) => {
    return {
      nombre: clanName,
      alineacion: alineacion,
      ...mockClanDetail
    }
  }

  let clanes = search ? mockClanList.filter((clan) => clan.nombre.toLocaleLowerCase().includes(search)) : mockClanList
  let styleAlineacion = ''
  console.log('Alineacion:', alineacion)
  if(alineacion === Alineaciones.legion) {
    clanes = clanes.filter((clan) => clan.alineacion === Alineaciones.legion)
    styleAlineacion = ' red'
  }
  if(alineacion === Alineaciones.armada) {
    clanes = clanes.filter((clan) => clan.alineacion === Alineaciones.armada)
    styleAlineacion = ' blue'
  }

  return (
    <AoDialog styles={styles}>
      <div className="clan-list-dialog">
        <div className='title'>
          <img className='frame-sep' src={require('../../../../assets/Icons/Dialogs/clan-flag.png')} />
          <h2>CLANES</h2>
        </div>
        <img className='frame-sep' src={require('../../../../assets/frame/top-center.jpg')} />
        <div className='list-box'>
          <div className='filters'>
            <AoInput 
              styles={'btn'} 
              placeholder='Busca tu clan' 
              name="search" 
              value={search} 
              handleChange={(e) => setSearch(e.target.value)} 
              inputStyles={'search-input'}
              imgStyles={'search-img'}
              showDelete={search}
              showSearch={true}
            />
            <div className='select'>
              <label for='Alineacion' >Alineación</label>
              <select 
                id='Alineacion' 
                className="btn alineacion" 
                name="alineacion"
                value={alineacion}
                onChange={(e) => setAlineacion(e.target.value)}
              >
              <option value="">Todas</option>
                <option value={Alineaciones.legion}>Legión Oscura</option>
                <option value={Alineaciones.armada}>Armada</option>
              </select>
            </div>
          </div>
          <div className={'list'+ styleAlineacion}>
            {clanes.map((clan) => 
              <span 
                onClick={() => {
                  mockGetDetailClanFn(clan.nombre, clan.alineacion).then((clanDetail) => setSelectedClan(clanDetail))
                }}
              >
                {clan.nombre}
              </span>)
            }
          </div>
        </div>
        <img className='frame-sep small' src={require('../../../../assets/frame/top-center.jpg')} />
        <div className='last'>
          <AoButton caption='guardar' styles='fundar'>FUNDAR CLAN</AoButton>
        </div>
      </div> 
    </AoDialog>  
  )
}


const mockClanList = [
  {
    nombre: 'Two Easy',
    alineacion: Alineaciones.neutral
  },
  {
    nombre: 'mRades',
    alineacion: Alineaciones.neutral
  },
  {
    nombre: 'clan loco',
    alineacion: Alineaciones.neutral
  },
  {
    nombre: 'el leon',
    alineacion: Alineaciones.armada
  },
  {
    nombre: 'patito bullrich',
    alineacion: Alineaciones.neutral
  },
  {
    nombre: 'el indio panquequen',
    alineacion: Alineaciones.legion
  },
  {
    nombre: 'dolar',
    alineacion: Alineaciones.armada
  },
  {
    nombre: 'dolar qatar',
    alineacion: Alineaciones.legion
  },
  {
    nombre: 'dolar ccl',
    alineacion: Alineaciones.armada
  },
  {
    nombre: 'dolar mep',
    alineacion: Alineaciones.neutral
  },
  {
    nombre: 'dolar bolsa',
    alineacion: Alineaciones.legion
  },
  {
    nombre: 'dolar qatar',
    alineacion: Alineaciones.legion
  },
  {
    nombre: 'DANGER',
    alineacion: Alineaciones.legion
  },
  {
    nombre: 'Skywalker',
    alineacion: Alineaciones.armada
  },
  {
    nombre: 'SayHEllo',
    alineacion: Alineaciones.neutral
  },
  {
    nombre: 'PUESTO AHI',
    alineacion: Alineaciones.legion
  },
  {
    nombre: 'Daleeee',
    alineacion: Alineaciones.neutral
  }
]

const mockClanDetail = {
  'fundador': 'tenesule',
  'fecha_creacion': '03/08/2023',
  'lider': '1269',
  'miembros': 10,
  'nivel_del_clan': 4
}