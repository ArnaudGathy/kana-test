import React, {useState} from 'react'
import {shuffle, take} from 'lodash'

const defaultList = [
  {romaji: 'a', hiragana: '\u3042'},
  {romaji: 'i', hiragana: '\u3044'},
  {romaji: 'u', hiragana: '\u3046'},
  {romaji: 'e', hiragana: '\u3048'},
  {romaji: 'o', hiragana: '\u304A'},
  {romaji: 'ka', hiragana: '\u304B'},
  {romaji: 'ki', hiragana: '\u304D'},
  {romaji: 'ku', hiragana: '\u304F'},
  {romaji: 'ke', hiragana: '\u3051'},
  {romaji: 'ko', hiragana: '\u3053'},
  {romaji: 'sa', hiragana: '\u3055'},
  {romaji: 'shi', hiragana: '\u3057'},
  {romaji: 'su', hiragana: '\u3059'},
  {romaji: 'se', hiragana: '\u305B'},
  {romaji: 'so', hiragana: '\u305D'},
  {romaji: 'ta', hiragana: '\u305F'},
  {romaji: 'chi', hiragana: '\u3061'},
  {romaji: 'tsu', hiragana: '\u3064'},
  {romaji: 'te', hiragana: '\u3066'},
  {romaji: 'to', hiragana: '\u3068'},
  {romaji: 'na', hiragana: '\u306A'},
  {romaji: 'ni', hiragana: '\u306B'},
  {romaji: 'nu', hiragana: '\u306C'},
  {romaji: 'ne', hiragana: '\u306D'},
  {romaji: 'no', hiragana: '\u306E'},
  {romaji: 'ha', hiragana: '\u306F'},
  {romaji: 'hi', hiragana: '\u3072'},
  {romaji: 'fu', hiragana: '\u3075'},
  {romaji: 'he', hiragana: '\u3078'},
  {romaji: 'ho', hiragana: '\u307B'},
  {romaji: 'ma', hiragana: '\u307E'},
  {romaji: 'mi', hiragana: '\u307F'},
  {romaji: 'mu', hiragana: '\u3080'},
  {romaji: 'me', hiragana: '\u3081'},
  {romaji: 'mo', hiragana: '\u3082'},
  {romaji: 'ya', hiragana: '\u3084'},
  {romaji: 'yu', hiragana: '\u3086'},
  {romaji: 'yo', hiragana: '\u3088'},
  {romaji: 'ra', hiragana: '\u3089'},
  {romaji: 'ri', hiragana: '\u308A'},
  {romaji: 'ru', hiragana: '\u308B'},
  {romaji: 're', hiragana: '\u308C'},
  {romaji: 'ro', hiragana: '\u308D'},
  {romaji: 'wa', hiragana: '\u308F'},
  {romaji: 'wo', hiragana: '\u3092'},
  {romaji: 'n', hiragana: '\u3093'},
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
      />
      <br />
      Mode inversé <input type="checkbox" onChange={invertMode} checked={invert} />
      <br />
      <br />
      <button onClick={generateList}>Go</button>
      <br />
      <br />
      {list && (
        <>
          <button onClick={toggleCorrection}>{correction ? 'Cacher' : 'Voir'} correction</button>
          <div
            style={{
              fontSize: '35px',
              width: '400px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {list.map(({romaji, hiragana}) => (
              <div style={{minWidth: '80px', minHeight: '75px'}}>
                {invert ? (correction ? romaji : hiragana) : correction ? hiragana : romaji}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
