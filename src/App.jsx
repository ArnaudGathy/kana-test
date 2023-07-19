import React, { useState, useEffect, useCallback } from "react";
import { shuffle } from "lodash";
import { hiraganaList, katakanaList } from "./data/kanaList";
import { CharacterCheckBoxList } from "./CharacterCheckBoxList";
import { VocabularyCheckBoxList } from "./VocabularyCheckBoxList";
import { Card } from "./Card";
import { vocabularyList } from "./data/vocabularyList";
import Button from "@mui/material/Button";
import { getIsEverythingChecked } from "./utils";
import { FormControlLabel, Switch } from "@mui/material";

const computeFormState = (list, state) => {
  return Object.keys(list).reduce((acc, key) => {
    acc = { ...acc, [key]: state };
    return acc;
  }, {});
};
const emptyFormState = computeFormState(hiraganaList, false);
const fullFormState = computeFormState(hiraganaList, true);
const defaultFormState = {
  hiragana: emptyFormState,
  katakana: emptyFormState,
};
const vocabularyFormEmptyState = computeFormState(vocabularyList, false);
const vocabularyFormFullState = computeFormState(vocabularyList, true);

export const App = () => {
  const [list, setList] = useState(null);

  const [formState, setFormState] = useState(defaultFormState);
  const [vocabularyFormState, setVocabularyFormState] = useState(
    vocabularyFormEmptyState,
  );

  const [correction, setCorrection] = useState(false);

  const [kanjiMode, setKanjiMode] = useState(false);

  const generateKanaList = useCallback(() => {
    const { hiragana, katakana } = formState;

    const hiraganaDisplayList = Object.entries(hiragana).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc.push(hiraganaList[key]);
        }
        return acc;
      },
      [],
    );
    const katakanaDisplayList = Object.entries(katakana).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc.push(katakanaList[key]);
        }
        return acc;
      },
      [],
    );
    return [...hiraganaDisplayList.flat(), ...katakanaDisplayList.flat()];
  }, [formState]);

  const generateVocabularyList = useCallback(() => {
    const list = Object.entries(vocabularyFormState).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc.push(vocabularyList[key]);
        }
        return acc;
      },
      [],
    );
    return list.flat();
  }, [vocabularyFormState]);

  const generateLists = useCallback(() => {
    let list = [...generateKanaList(), ...generateVocabularyList()];

    if (kanjiMode) {
      list = list.filter(({ extra }) => extra);
    }

    setList(shuffle(list));
  }, [kanjiMode, generateKanaList, generateVocabularyList]);

  const toggleCorrection = () => {
    setCorrection(!correction);
  };
  const handleChangeKanaFormChange = (listName, value) => {
    const newState = {
      ...formState,
      [listName]: {
        ...formState[listName],
        [value]: !formState[listName][value],
      },
    };
    setFormState(newState);
  };
  const handleKanjiFormChange = (value) => {
    setVocabularyFormState({
      ...vocabularyFormState,
      [value]: !vocabularyFormState[value],
    });
  };
  const selectAll = (listName) => {
    const isAllEnabled = getIsEverythingChecked(formState[listName]);
    if (isAllEnabled) {
      setFormState({
        ...formState,
        [listName]: emptyFormState,
      });
    } else {
      setFormState({
        ...formState,
        [listName]: fullFormState,
      });
    }
  };
  const selectAllVocabulary = () => {
    const isAllEnabled = getIsEverythingChecked(vocabularyFormState);
    if (isAllEnabled) {
      setVocabularyFormState(vocabularyFormEmptyState);
    } else {
      setVocabularyFormState(vocabularyFormFullState);
    }
  };
  const resetForm = () => {
    setFormState(defaultFormState);
    setVocabularyFormState(vocabularyFormEmptyState);
  };

  useEffect(() => {
    generateLists();
  }, [vocabularyFormState, formState, kanjiMode, generateLists]);

  return (
    <div className="container">
      <div className="configList">
        <details open>
          <summary className="summary" />
          <div className="selectionBlock">
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
        </details>
        <div className="buttonBar">
          <div>
            <Button variant="outlined" onClick={resetForm}>
              Vider la liste
            </Button>

            <FormControlLabel
              className="kanjiModeSwitch"
              control={
                <Switch
                  checked={kanjiMode}
                  onChange={() => setKanjiMode(!kanjiMode)}
                />
              }
              label="Mode Kanji"
            />
          </div>

          {list && list.length > 0 && (
            <div className="showSolution">
              <Button variant="contained" onClick={toggleCorrection}>
                {correction ? "Cacher" : "Voir"} correction
              </Button>
            </div>
          )}
        </div>
      </div>

      <br />
      <div className="block">
        {list && list.length > 0 && (
          <div className="block wordBlock">
            {list.map(({ romaji, translated, extra, isBig }) => (
              <Card
                key={romaji}
                romaji={romaji}
                translated={translated}
                extra={extra}
                isBig={isBig}
                isCorrection={correction}
                kanjiMode={kanjiMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
