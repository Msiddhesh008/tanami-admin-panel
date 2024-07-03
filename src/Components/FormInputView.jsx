import { Box, Button, Divider, FormLabel, Heading } from "@chakra-ui/react";
import React from "react";

const FormInputView = ({ groupedFields, name, errors, onSubmit, children }) => {
 
  console.log(groupedFields);

  return (
    <form>
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
              {fields.map(({ value, label, id }, key) => (
                <Box w={'49%'}>
                  <FormLabel key={id} color={"gray.500"} fontSize={"xs"}>
                    {label}
                  </FormLabel>
                  <FormLabel>{value}</FormLabel>
                </Box>
              ))}
            </Box>
          </Box>
          {index < Object.entries(groupedFields).length - 1 && <Divider />}
        </Box>
      ))}
      {children}
    </form>
  );
};

export default FormInputView;
