import React from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { getAreSomethingsChecked, getIsEverythingChecked } from "./utils";

export const CharacterCheckBoxList = ({
  name,
  list,
  handleChange,
  formValues,
  selectAll,
}) => {
  const isEverythingChecked = getIsEverythingChecked(formValues);
  const areSomethingsChecked = getAreSomethingsChecked(formValues);

  return (
    <div className="checkBoxList">
      <h1 className="title" style={{ textTransform: "capitalize" }}>
        {name}
      </h1>
      <FormControlLabel
        control={
          <Checkbox
            checked={isEverythingChecked}
            indeterminate={!isEverythingChecked && areSomethingsChecked}
            onChange={() => selectAll(name)}
          />
        }
        label={`Tous les ${name}`}
      />
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {Object.entries(list).map(([key, values]) => (
          <div key={key} style={{ marginBottom: "5px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues[key]}
                  onChange={() => handleChange(name, key)}
                />
              }
              label={values.map((kana) => `${kana.romaji} `)}
            />
          </div>
        ))}
      </Box>
    </div>
  );
};
