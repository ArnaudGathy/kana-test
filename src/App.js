import React, {useState} from 'react'
import {shuffle} from 'lodash'
import {hiraganaList, katakanaList} from './charLists'
import './style.css'
import {CharacterCheckBoxList} from './CharacterCheckBoxList'

export const App = () => {
  const [list, setList] = useState(null)
  const [correction, setCorrection] = useState(false)
  const [formState, setFormState] = useState({})

  const generateList = () => {
    const {hiragana, katakana} = formState
    const hiraganaToDisplay = hiragana ? Object.keys(hiragana) : []
    const katakanaToDisplay = katakana ? Object.keys(katakana) : []

    const hiraganaDisplayList = hiraganaToDisplay.reduce((acc, value) => {
      acc.push(hiraganaList[value])
      return acc
    }, [])
    const katakanaDisplayList = katakanaToDisplay.reduce((acc, value) => {
      acc.push(katakanaList[value])
      return acc
    }, [])

    setList(shuffle([...hiraganaDisplayList.flat(), ...katakanaDisplayList.flat()]))
  }
  const toggleCorrection = () => {
    setCorrection(!correction)
  }
  const handleChange = (listName, value) => {
    if (formState[listName] && formState[listName][value]) {
      delete formState[listName][value]
    } else {
      const newFormState = {...formState, [listName]: {...formState[listName], [value]: true}}
      setFormState(newFormState)
    }
  }

  return (
    <div>
      <div className="block" style={{display: 'flex'}}>
        <CharacterCheckBoxList name="hiragana" list={hiraganaList} handleChange={handleChange} />
        <CharacterCheckBoxList name="katakana" list={katakanaList} handleChange={handleChange} />
      </div>

      <div className="block">
        <button type="submit" onClick={generateList}>
          Go
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
