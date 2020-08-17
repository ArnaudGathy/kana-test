import React, {useState} from 'react'
import {shuffle} from 'lodash'
import {hiraganaList, katakanaList} from './charLists'
import './style.css'
import {CharacterCheckBoxList} from './CharacterCheckBoxList'

const emptyFormState = {
  a: false,
  ka: false,
  sa: false,
  ta: false,
  na: false,
  ha: false,
  ma: false,
  ya: false,
  ra: false,
  wa: false,
  all: false,
}

const fullFormState = {
  a: true,
  ka: true,
  sa: true,
  ta: true,
  na: true,
  ha: true,
  ma: true,
  ya: true,
  ra: true,
  wa: true,
  all: true,
}

const defaultFormState = {
  hiragana: emptyFormState,
  katakana: emptyFormState,
}

export const App = () => {
  const [list, setList] = useState(null)
  const [correction, setCorrection] = useState(false)
  const [formState, setFormState] = useState(defaultFormState)

  const generateList = () => {
    const {hiragana, katakana} = formState

    const hiraganaDisplayList = Object.entries(hiragana).reduce((acc, [key, value]) => {
      if(value && key !== 'all') {
        acc.push(hiraganaList[key])
      }
      return acc
    }, [])
    const katakanaDisplayList = Object.entries(katakana).reduce((acc, [key, value]) => {
      if(value && key !== 'all') {
        acc.push(katakanaList[key])
      }
      return acc
    }, [])

    setList(shuffle([...hiraganaDisplayList.flat(), ...katakanaDisplayList.flat()]))
  }
  const toggleCorrection = () => {
    setCorrection(!correction)
  }
  const handleChange = (listName, value) => {
    const newState = {...formState, [listName]: {...formState[listName], [value]: !formState[listName][value]}}
    setFormState(newState)
  }
  const selectAll = (listName, isChecked) => {
    const isSelected = formState[listName].all
    setFormState({...formState, [listName]: isSelected ? emptyFormState : fullFormState})
  }
  const resetForm = () => {
    setFormState(defaultFormState)
  }

  return (
    <div>
      <div className="block" style={{display: 'flex'}}>
        <CharacterCheckBoxList
          name="hiragana"
          list={hiraganaList}
          handleChange={handleChange}
          formValues={formState.hiragana}
          selectAll={selectAll}
        />
        <CharacterCheckBoxList
          name="katakana"
          list={katakanaList}
          handleChange={handleChange}
          formValues={formState.katakana}
          selectAll={selectAll}
        />
      </div>

      <div className="block">
        <button type="submit" onClick={generateList}>
          Générer la liste
        </button>
        <button type="submit" onClick={resetForm}>
          Reset
        </button>
      </div>

      <br />
      <div className="block">
        {list && (
          <>
            <div
              className="block"
              style={{
                fontSize: '35px',
                width: '400px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {list.map(({romaji, kana}) => (
                <div style={{minWidth: '80px', minHeight: '75px'}} key={romaji}>
                  {correction ? kana : romaji}
                </div>
              ))}
            </div>
            <button onClick={toggleCorrection}>{correction ? 'Cacher' : 'Voir'} correction</button>
          </>
        )}
      </div>
    </div>
  )
}
