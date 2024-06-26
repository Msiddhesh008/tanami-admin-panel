import { FormControl, FormLabel, Input, Textarea, Select, Checkbox, RadioGroup, Radio, Stack } from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TiWarning } from 'react-icons/ti';

const FormField = ({
    label,
    control,
    name,
    type = "text",
    options = [],
    errors,
    isRequired,
    arabic,
    ...props
  }) => (
    <FormControl isInvalid={errors[name]}>
      <FormLabel textAlign={arabic ? "right" : "left"} fontSize={"sm"}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => {
          switch (type) {
            case 'textarea':
              return (
                <Textarea
                  focusBorderColor="forestGreen.400"
                  size={"sm"}
                  {...field}
                  {...props}
                  placeholder={label}
                  textAlign={arabic ? "right" : "left"}
                />
              );
            case 'select':
              return (
                <Select
                  focusBorderColor="forestGreen.300"
                  size={"sm"}
                  {...field}
                  {...props}
                  placeholder={label}
                  textAlign={arabic ? "right" : "left"}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              );
            case 'checkbox':
              return (
                <Checkbox
                  size={"sm"}
                  {...field}
                  {...props}
                  textAlign={arabic ? "right" : "left"}
                >
                  {label}
                </Checkbox>
              );
            case 'radio':
              return (
                <RadioGroup {...field} {...props}>
                  <Stack direction="row">
                    {options.map((option, index) => (
                      <Radio key={index} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              );
            default:
              return (
                <Input
                  focusBorderColor="forestGreen.300"
                  size={"sm"}
                  type={type}
                  {...field}
                  {...props}
                  placeholder={label}
                  textAlign={arabic ? "right" : "left"}
                />
              );
          }
        }}
      />
      {errors[name] && (
        <span className="text-danger web-text-small fw-bold ps-2 d-flex align-items-center gap-1 mt-1">
          <TiWarning className="fw-bold fs-5 " /> {errors[name].message}
        </span>
      )}
    </FormControl>
  );

export default FormField;
