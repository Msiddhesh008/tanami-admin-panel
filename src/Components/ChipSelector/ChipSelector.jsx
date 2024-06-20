import React, { useState } from "react";
import { Box, FormHelperText, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { TiWarning } from "react-icons/ti";

const ChipSelector = ({chips, setChips, type}) => {
  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState("");

  function removeChip(chipToRemove) {
    const updatedChips = chips.filter((chip, index) => index !== chipToRemove);
    setChips(updatedChips);
  }


  function handlePressEnter(e) {
    if (e.key === "Enter") e.preventDefault();
    if (e.key !== "Enter" || !text) return;
    if (chips.includes(text)) {
      return setValidationError("Cannot add the same input more than once");
    }
    setChips((prevState) => [...prevState, text]);
    setText("");
    setValidationError("");
  }

  return (
    <div>
      <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
       className="">
        <Input
          type={type? type : "text"}

          id="tags"
          size="sm"
          className="web-text-medium "
          placeholder="Press Enter to add tag"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handlePressEnter}
        />
        {validationError && <span className="error-message web-text-small text-danger d-flex align-items-center gap-1"><TiWarning className="fw-bold fs-5 " />{validationError}</span>}
        
        <FormHelperText className="web-text-small mt-0">
              {type ? "Please select and press enter to add date." :  "Please type and press enter to add tags."}

              </FormHelperText>
        <Box 
        display={'flex'}
        justifyContent={'start'}
        flexWrap={'wrap'}
        gap={2}
        >
          {chips?.map((chip, i) => (
            <Tag key={i} size="sm" ps={3} pe={3} pt={0.5} pb={0.5} rounded="full" variant='solid' backgroundColor={'#565263'}>
              <TagLabel className="text-uppercase">{chip}</TagLabel>
              <TagCloseButton onClick={() => removeChip(i)} />
            </Tag>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ChipSelector;
