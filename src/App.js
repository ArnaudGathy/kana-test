import React, {useState} from 'react'
import {shuffle, take} from 'lodash'

const defaultList = [
  {romaji: 'a', hiragana: '\u3042'},
  {romaji: 'i', hiragana: '\u3044'},
  {romaji: 'u', hiragana: '\u3046'},
  {romaji: 'e', hiragana: '\u3048'},
  {romaji: 'o', hiragana: '\u304A'},
]

export const App = () => {
  const [number, setNumber] = useState('46')
  const [list, setList] = useState(null)
  const [correction, setCorrection] = useState(false)
  const [invert, setInvert] = useState(false)

  const generateList = () => {
    setList(take(shuffle(defaultList), number))
  }
  const toggleCorrection = () => {
    setCorrection(!correction)
  }
  const invertMode = () => {
    setInvert(!invert)
  }

  const test = ''

  return (
    <div className="App">
      {test}
      Combien de syllabes
      <input
        type="number"
        max="46"
        min="1"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      /><br />
      Mode inversé <input type="checkbox" onChange={invertMode} checked={invert} />
      <br />
      <br />
      <button onClick={generateList}>Go</button><br /><br />
      {list && (
        <>
          <button onClick={toggleCorrection}>{correction ? 'Cacher' : 'Voir'} correction</button>
          <div style={{fontSize: '40px', wordSpacing: '25px', maxWidth: '400px'}}>
            {correction
              ? list.map(({romaji, hiragana}) => `${romaji}:${hiragana}`).join(' ')
              : invert ? list.map(({hiragana}) => hiragana).join(' ') : list.map(({romaji}) => romaji).join(' ')}
          </div>
        </>
      )}
    </div>
  )
}
