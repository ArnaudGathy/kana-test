import React from "react";
import {vocabularyList} from "./data/vocabularyList";

export const VocabularyCheckBoxList = ({vocabularyFormState, handleChange, selectAll}) => {
  return (<div className='checkBoxList'>
    <p>Vocabulaire</p>
    {Object.keys(vocabularyList).map(key => (
      <div key={key} style={{marginBottom: '5px'}}>
        <label>
          <input type="checkbox" checked={vocabularyFormState[key]} onChange={() => handleChange(key)} />
          {key}
        </label>
      </div>
    ))}
    <label>
      <input type="checkbox" checked={vocabularyFormState.all} onChange={selectAll} />
      <em>Tout le vocabulaire</em>
    </label>
  </div>)
}