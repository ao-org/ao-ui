import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { displayLoadingText, selectExitScreenActive, setActiveDialog, setFadeOut } from '../../../redux/UIFlowSlice'
import { LoadJsonFile } from '../../../Tools/Utils'
import Header from '../CharacterSelection/Header/header'
import LoginButton from '../CharacterSelection/LogInButton/login-button'

import DrawCharacter from '../../Common/DrawCharacter/draw-character'
import Frame from '../../Common/Frame/frame'
import RibbonTittle from '../../Common/RibbonTittle/ribbon-tittle'
import './create-character.scss'
import GenderSelector from './GenderSelector/gender-selector'
import HeadSelector from './HeadSelector/head-selector'
import NameInputArea from './NameInputArea/name-input-area'
import SelectionFrame from './SelectionFrame/selection-frame'
import { raceList, attributeList, classList } from '../../../constants'

const getOptionsForRace = (bodyList, race) => {
  switch(race) {
    case 0:
      return bodyList.Human
    case 1:
      return bodyList.Elf
    case 2:
      return bodyList.Drow
    case 3:
      return bodyList.Gnome
    case 4:
      return bodyList.Dwarf
    case 5:
      return bodyList.Orc
  }
  return null
}

const selectStats = (bodyList, race) => {
  if (bodyList == null) return [18, 18, 18, 18, 18]
  return getOptionsForRace(bodyList, race).stats
}
const selectHeads= (bodyList, gender, race) => {
  if (bodyList == null) return null
  if (gender == 0) {
    return getOptionsForRace(bodyList, race).male
  }
  else {
    return getOptionsForRace(bodyList, race).female
  }
}
const getBody = (bodyList, gender, race) => {
  if (bodyList == null) return null
  if (gender == 0) {
    return getOptionsForRace(bodyList, race).male.body
  }
  else {
    return getOptionsForRace(bodyList, race).female.body
  }
}
const getCityList = () => {
  return [
    'Ullathorpe', 'Nix', 'Banderbill', 'Lindos', 'Arghal', 'Forgat'
  ]
}

const mapRaces = ( gender, raceList) => {
  return raceList.map( race => (
    {
      name: race,
      description: null,
      icon: process.env.NODE_ENV === 'development' ? `../../../assets/icons/race/${race}${gender}.png`: require(`../../../assets/icons/race/${race}${gender}.png`)
    }
  ))
}
const mapClass = ( classList) => {
  return classList.map( className => (
    {
      name: className,
      description: `${className}-desc`,
      icon: process.env.NODE_ENV === 'development' ? `../../../assets/icons/class/${className}.png`: require(`../../../assets/icons/class/${className}.png`)
    }
  ))
}
const mapHomeCity = ( cityNames) => {
  return cityNames.map( cityName => (
    {
      name: cityName,
      description: null,
      icon: process.env.NODE_ENV === 'development' ? `../../../assets/icons/cities/${cityName}.png`: require(`../../../assets/icons/cities/${cityName}.png`)
    }
  ))
}
export default function CreateCharacterScreen() {
  const [characterDefinition, setCharacterDefinition] = useState({gender:0,
                                                                 raceIndex:0,
                                                                 classId:0,
                                                                 face:0,
                                                                 name:'',
                                                                 homeCity:0
                                                                });
  const {name, gender, raceIndex, classId, face, bodyListInfo, homeCity } = characterDefinition;
  const attrValues = selectStats(bodyListInfo, raceIndex)
  const heads = selectHeads(bodyListInfo, gender, raceIndex)
  const body = getBody(bodyListInfo, gender, raceIndex)
  const availableCity = getCityList()
  const transitionActive = useSelector(selectExitScreenActive)
  let animLeftStyles = ' animate-left'
  let animRightStyles = ' animate-right'
  let animBottomSytles = ' cc-animate-bottom-in'
  if (transitionActive) {
    animLeftStyles = ' exit-animation-left'
    animRightStyles = ' exit-animation-right'
    animBottomSytles = ' cc-animate-bottom-out'
  }
  const attrColor = attrValues.map( value => {
    if (value > 18) {
      return 'attr-green'
    }
    else if (value < 18) {
      return 'attr-red'
    }
    return ''
  })
  useEffect(()=> {
    setTimeout(() => {
      dispatch(setFadeOut(false))  
    }, 200);
  }, [])
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const createCharacter = event => {
    event.preventDefault()
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.CreateCharacter(name, gender, raceIndex, face, classId, homeCity)
  }
  useEffect(() => {
    LoadJsonFile('/init/HeadAndBodyData.json').then(data => {
      setCharacterDefinition({ ...characterDefinition, bodyListInfo: data,
                            face: selectHeads(data, gender, raceIndex).start});
    });
  }, []);
  const handleChange = event => {
    const { value, name } = event.target;
    setCharacterDefinition({ ...characterDefinition, [name]: value});
  }
  const setGender = genderId => {
    if (genderId !== gender) {
      const newFace = selectHeads(bodyListInfo, genderId, raceIndex).start
      setCharacterDefinition({ ...characterDefinition, gender: genderId,
                              face:newFace });
    }
  }
  const setRace = raceId => {
    if (raceId !== raceIndex) {
      setCharacterDefinition({ ...characterDefinition, raceIndex: raceId,
                               face: selectHeads(bodyListInfo, gender, raceId).start});
    }
  }
  const setHome = cityID => {
    if (cityID !== homeCity) {
      setCharacterDefinition({ ...characterDefinition, homeCity: cityID});
    }
  }
  const updateHead = newHeadID => {
    setCharacterDefinition({ ...characterDefinition, face: newHeadID});
  }
  const setClass = newClassId => {
    setCharacterDefinition({ ...characterDefinition, classId: newClassId});
  }
  const doBack = event => {
    event.preventDefault();
    dispatch(setActiveDialog('character-selection'))
  }
  return (
    <div className='create-charcter'>
      <Header goBack={doBack}/>
      <div className='config-area'>
        <div className={'left-panel'+ animLeftStyles}>
          <GenderSelector currentSelection={gender} onChange={setGender} />
          <SelectionFrame optionList={mapRaces(gender, raceList)} 
                          title={t('raza')} 
                          selectedOptionId={raceIndex} 
                          onChange={setRace}/>
          <Frame contentStyles='sub-panel '>
            <RibbonTittle text='atributos' />
            <div className='gradient-bg'></div>
            <div className='attribute-list'>
              {
                attributeList.map( (attr, index) => (
                  <div className='attrib-line' key={index}>
                    <p className='attr-name'>{t(attr)}</p>
                    <p className={'attr-value ' + attrColor[index] }>{attrValues[index]}</p>
                  </div>
                ))
              }
            </div>
          </Frame>
        </div>
        <div className='mid-panel'>
          <div className='character-preview'>
            {
              body != null ?
              <DrawCharacter body={body} head={face}/>
              : null
            }
            {
              heads != null ?
              <HeadSelector start={heads.start} 
                            end={heads.end} 
                            onUpdateSelection={updateHead} 
                            currentSelected={face}/> :
              null
            }
          </div>
          <NameInputArea styles={animBottomSytles} onChange={handleChange} currentName={name} />
        </div>
        <div className={'right-panel' + animRightStyles}>
          <SelectionFrame styles='extend-frame' 
                          optionList={mapClass(classList)} 
                          title={t('class-tittle')} 
                          showDetails={true}
                          selectedOptionId={classId} 
                          onChange={setClass}/>
          <SelectionFrame optionList={mapHomeCity(availableCity)} 
                          title={t('city')} 
                          selectedOptionId={homeCity} 
                          onChange={setHome}/>
        </div>
      </div>
      <div className={'bottom-leather' + animBottomSytles}>
        <div className='button-area'>
          <div className='bar-layer'>
            <div className='bar-img'></div>
          </div>
          <div className='button-layer'>
            <LoginButton onClick={createCharacter}>{t('create character').toUpperCase()}</LoginButton>
          </div>
        </div>
      </div>
    </div>
  )
}