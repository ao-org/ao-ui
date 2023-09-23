import './clan-list.scss'
import AoDialog from "../../../Common/ao-dialog/ao-dialog";
import AoButton from '../../../Common/ao-button/ao-button';
import { useState, useRef } from 'react';

const mockClanList = [
  'Two Easy',
  'mRades',
  'clan loco',
  'el leon',
  'patito bullrich',
  'el indio panquequen',
  'dolar',
  'dolar qatar',
  'dolar ccl',
  'dolar mep',
  'dolar bolsa',
  'dolar qatar',
  'DANGER',
  'Skywalker',
  'SayHEllo',
  'PUESTO AHI',
  'Daleeee'
]

/*
<input ref={inputRef} type='text' placeholder='Busca tu clan' onChange={(e) => setSearch(e.target.value)} value={search}/>

{search ?
                  <img 
                    alt='search' 
                    src={require(`../../../../assets/Icons/Dialogs/cancel.png`)}
                  />
                  :
                  <img alt='search' src={require(`../../../../assets/Icons/Dialogs/glass.png`)} sizes='2px 2px'/>
                }
*/

export default function ClanListDialog({styles}) {
  const [search, setSearch] = useState('')
  const inputRef = useRef(null);

  return (
    <AoDialog styles={styles}>
      <div className="clan-list-dialog">
        <h2>CLANES</h2>
        <div className='list-box'>  
          <div className='filters'>
            <div className='search'>
              <input ref={inputRef} type='text' placeholder='Busca tu clan' onChange={(e) => setSearch(e.target.value)} value={search}/>
              {search ?
                  <img 
                    alt='search' 
                    src={require(`../../../../assets/Icons/Dialogs/cancel.png`)}
                    onClick={(e) => {
                      console.log(1)
                      e.stopPropagation()
                      e.preventDefault()
                      setSearch('')
                      inputRef.current?.focus()
                    }}
                  />
                  :
                  <img alt='search' src={require(`../../../../assets/Icons/Dialogs/glass.png`)} sizes='2px 2px'/>
                }
            </div>
            
          </div>
          <div className='list'>
            {mockClanList.map((clan) => <span>{clan}</span>)}
          </div>
        </div>
        <AoButton caption='guardar' styles='guardar'>FUNDAR CLAN</AoButton>
      </div>
    </AoDialog>
  )
}