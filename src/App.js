import React, {useState} from 'react'
import {shuffle} from 'lodash'
import {hiraganaList, vocabularyList, katakanaList} from './charLists'
import './style.css'
import {CharacterCheckBoxList} from './CharacterCheckBoxList'
import {VocabularyCheckBoxList} from './VocabularyCheckBoxList'
import {Card} from './Card'

const computeFormState = (list, state) => {
  return Object.keys(list).reduce((acc, key) => {
    acc = {...acc, [key]: state}
    return acc
  }, {all: state})
}
const emptyFormState = computeFormState(hiraganaList, false)
const fullFormState = computeFormState(hiraganaList, true)
const defaultFormState = {
  hiragana: emptyFormState,
  katakana: emptyFormState,
}
const vocabularyFormEmptyState = computeFormState(vocabularyList, false)
const vocabularyFormFullState = computeFormState(vocabularyList, true)

export const App = () => {
  const [list, setList] = useState(null)

  const [formState, setFormState] = useState(defaultFormState)
  const [vocabularyFormState, setVocabularyFormState] = useState(vocabularyFormEmptyState)

  const [correction, setCorrection] = useState(false)

  const generateKanaList = () => {
    const {hiragana, katakana} = formState

    const hiraganaDisplayList = Object.entries(hiragana).reduce((acc, [key, value]) => {
      if (value && key !== 'all') {
        acc.push(hiraganaList[key])
      }
      return acc
    }, [])
    const katakanaDisplayList = Object.entries(katakana).reduce((acc, [key, value]) => {
      if (value && key !== 'all') {
        acc.push(katakanaList[key])
      }
      return acc
    }, [])
    return [...hiraganaDisplayList.flat(), ...katakanaDisplayList.flat()]
  }
  const generateVocabularyList = () => {
    const list = Object.entries(vocabularyFormState).reduce((acc, [key, value]) => {
      if (value && key !== 'all') {
        acc.push(vocabularyList[key])
      }
      return acc
    }, [])
    return list.flat()
  }
  const generateLists = () => {
    setList(shuffle([...generateKanaList(), ...generateVocabularyList()]))
  }

  const toggleCorrection = () => {
    setCorrection(!correction)
  }
  const handleChangeKanaFormChange = (listName, value) => {
    const newState = {
      ...formState,
      [listName]: {...formState[listName], [value]: !formState[listName][value]},
    }
    setFormState(newState)
  }
  const handleKanjiFormChange = (value) => {
    setVocabularyFormState({...vocabularyFormState, [value]: !vocabularyFormState[value]})
  }
  const selectAll = (listName) => {
    const isSelected = formState[listName].all
    setFormState({...formState, [listName]: isSelected ? emptyFormState : fullFormState})
  }
  const selectAllVocabulary = (value) => {
    setVocabularyFormState(
      vocabularyFormState.all ? {...vocabularyFormEmptyState} : {...vocabularyFormFullState}
    )
  }
  const resetForm = () => {
    setFormState(defaultFormState)
    setVocabularyFormState(vocabularyFormEmptyState)
  }

  return (
    <div>
      <div className="block" style={{display: 'flex'}}>
        <CharacterCheckBoxList
          name="hiragana"
          list={hiraganaList}
          handleChange={handleChangeKanaFormChange}
          formValues={formState.hiragana}
          selectAll={selectAll}
        />
        <CharacterCheckBoxList
          name="katakana"
          list={katakanaList}
          handleChange={handleChangeKanaFormChange}
          formValues={formState.katakana}
          selectAll={selectAll}
        />
        <VocabularyCheckBoxList
          handleChange={handleKanjiFormChange}
          selectAll={selectAllVocabulary}
          vocabularyFormState={vocabularyFormState}
        />
      </div>

      <div className="block">
        <button type="submit" onClick={generateLists}>
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
            <button className="block" onClick={toggleCorrection}>{correction ? 'Cacher' : 'Voir'} correction</button>
            <div className="block wordBlock">
              {list.map(({romaji, translated, isBig}) => (
                <Card key={romaji} romaji={romaji} translated={translated} isBig={isBig} isCorrection={correction} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
