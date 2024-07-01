import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import React from "react";
import FormField from "./FormField";
import { OPACITY_ON_LOAD } from "../Layout/animations";

const FormInputMain = ({
  groupedFields,
  control,
  errors,
  onSubmit,
  children,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {Object.entries(groupedFields).map(([section, fields], index) => (
        <Box key={section}>
          <Heading as="h6" size="xs" mt={index === 0 ? 3 : 4}>
            {section}
          </Heading>
          <Box display={"flex"} gap={0}>
            <Box
              width={"100%"}
              p={5}
              display={"flex"}
              flexWrap={"wrap"}
              gap={4}
            >
              {fields.map(
                (
                  {
                    label,
                    name,
                    id,
                    arabic,
                    type,
                    isRequired,
                    selectedImageData,
                    setSelectedImageData,
                    imageData,
                    handleImageChange,
                    removeImage,
                    placeHolder,
                    options,
                    helperText,
                    multiple,
                  },
                  key
                ) => (
                  <FormField
                    id={id}
                    key={key}
                    label={label}
                    type={type}
                    name={name}
                    helperText={helperText ? helperText : undefined}
                    options={options ? options : undefined}
                    placeHolder={placeHolder ? placeHolder : undefined}
                    control={control}
                    errors={errors}
                    multiple={multiple}
                    isRequired={isRequired}
                    arabic={arabic}
                    selectedImageData={selectedImageData}
                    setSelectedImageData={setSelectedImageData}
                    imageData={imageData}
                    handleImageChange={handleImageChange}
                    removeImage={removeImage}
                  />
                )
              )}
            </Box>
          </Box>
          {index < Object.entries(groupedFields).length - 1 && <Divider />}
        </Box>
      ))}

      {children}

      <Box display={"flex"} justifyContent={"flex-end"} p={4}>
        <Button
          size={"sm"}
          width={"49.5%"}
          rounded={"sm"}
          type="submit"
          colorScheme="green"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default FormInputMain;
