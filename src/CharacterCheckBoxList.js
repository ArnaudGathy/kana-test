import React from 'react'

export const CharacterCheckBoxList = ({name, list, handleChange, formValues, selectAll}) => (
  <div>
    <p style={{textTransform: 'capitalize'}}>{name}</p>
    {Object.entries(list).map(([key, values]) => (
      <div key={key} style={{marginBottom: '5px'}}>
        <label>
          <input type="checkbox" checked={formValues[key]} onChange={() => handleChange(name, key)} />
          {values.map((kana) => `${kana.romaji} `)}
        </label>
      </div>
    ))}
    <label>
      <input type="checkbox" checked={formValues.all} onChange={(e) => selectAll(name, e.target.checked)} />
      All {name}
    </label>
  </div>
)
