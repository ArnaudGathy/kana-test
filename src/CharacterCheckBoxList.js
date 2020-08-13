import React from 'react'

export const CharacterCheckBoxList = ({name, list, handleChange}) => (
  <div>
    <p style={{textTransform: 'capitalize'}}>{name}</p>
    {Object.entries(list).map(([key, values]) => (
      <div key={key} style={{marginBottom: '5px'}}>
        <label>
          <input type="checkbox" onChange={() => handleChange(name, key)} />
          {values.map((kana) => `${kana.romaji} `)}
        </label>
      </div>
    ))}
  </div>
)
