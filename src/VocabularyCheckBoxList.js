import React from "react";
import {vocabularyList} from "./charLists";

export const VocabularyCheckBoxList = ({vocabularyFormState, handleChange, selectAll}) => {
  return (<div className='checkBoxList'>
    <p>Vocabulary</p>
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
      All vocabulary
    </label>
  </div>)
}