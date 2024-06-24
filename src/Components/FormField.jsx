import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React from 'react'
import { Controller } from 'react-hook-form';
import { TiWarning } from 'react-icons/ti';

const FormField = ({
    label,
    control,
    name,
    type = "text",
    errors,
    isRequired,
    ...props
  }) => (
    // <FormControl isInvalid={errors[name]}>
    // <FormControl isRequired={isRequired}>
    <FormControl >
      <FormLabel fontSize={"sm"}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => {
          return type === "textarea" ? (
            <Textarea
              focusBorderColor="forestGreen.400"
              size={"sm"}
              {...field}
              {...props}
            />
          ) : (
            <Input
              focusBorderColor="forestGreen.300"
              size={"sm"}
              type={type}
              {...field}
              {...props}
            />
          );
        }}
      />
      {errors[name] && (
        <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
          <TiWarning className="fw-bold fs-5 " /> {errors[name].message}
        </span>
      )}
    </FormControl>
  );

export default FormField