import React from "react";
import { vocabularyList } from "./data/vocabularyList";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { getAreSomethingsChecked, getIsEverythingChecked } from "./utils";

export const VocabularyCheckBoxList = ({
  vocabularyFormState,
  handleChange,
  selectAll,
}) => {
  const isEverythingChecked = getIsEverythingChecked(vocabularyFormState);
  const areSomethingsChecked = getAreSomethingsChecked(vocabularyFormState);
  return (
    <div className="checkBoxList">
      <h1 className="title">Vocabulaire</h1>
      <FormControlLabel
        control={
          <Checkbox
            checked={isEverythingChecked}
            indeterminate={!isEverythingChecked && areSomethingsChecked}
            onChange={selectAll}
          />
        }
        label="Tout le vocabulaire"
      />
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {Object.keys(vocabularyList).map((key) => (
          <div key={key} style={{ marginBottom: "5px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={vocabularyFormState[key]}
                  onChange={() => handleChange(key)}
                />
              }
              label={key}
            />
          </div>
        ))}
      </Box>
    </div>
  );
};
