import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  Box,
  Heading,
  FormHelperText,
  Kbd,
  Image,
  Text,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { TiWarning } from "react-icons/ti";
import { motion } from "framer-motion";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const FormField = ({
  label,
  control,
  name,
  id,
  type = "text",
  options = [],
  errors,
  isRequired,
  rules,
  arabic,
  placeHolder,
  helperText,
  multiple,
  handleImageChange,
  selectedImageData,
  setSelectedImageData,
  removeImage,
  imageData ,
  ...props
}) => (
  <FormControl
    w={"49%"}
    isInvalid={errors[name]}
    isRequired={isRequired}
    className="mb-3"
  >
    <FormLabel textAlign={arabic ? "right" : "left"} fontSize={"sm"}>
      {label}
    </FormLabel>
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={rules}
      render={({ field }) => {
        if (type === "select") {
          return (
            <Select
              focusBorderColor="forestGreen.300"
              size={"sm"}
              {...field}
              {...props}
              cursor={"pointer"}
              placeholder={placeHolder ? placeHolder : label}
              textAlign={arabic ? "right" : "left"}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          );
        } else if (type === "textarea") {
          return (
            <Textarea
              focusBorderColor="forestGreen.400"
              size={"sm"}
              {...field}
              {...props}
              placeholder={placeHolder ? placeHolder : label}
              textAlign={arabic ? "right" : "left"}
            />
          );
        } else if (type === "checkbox") {
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
        } else if (type === "radio") {
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
        } else if (type === "file") {
          return (
            <>
              <Box
                borderColor="gray.300"
                borderStyle="dashed"
                borderWidth="2px"
                rounded="md"
                shadow="sm"
                role="group"
                transition="all 150ms ease-in-out"
                _hover={{
                  shadow: "md",
                }}
                as={motion.div}
                initial="rest"
                animate="rest"
                whileHover="hover"
                height={"105px"}
                className="pointer"
              >
                <Box position="relative" height="100%" width="100%">
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    height="100%"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                  >
                    <Stack
                      height="100%"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justify="center"
                    >
                      <span
                        className="d-flex flex-column align-items-center pointer"
                        spacing="1"
                      >
                        <Heading
                          fontSize="lg"
                          color="gray.700"
                          fontWeight="bold"
                          cursor={"pointer"}
                        >
                          Drop images here
                        </Heading>
                        <span
                          fontWeight="light"
                          className="web-text-large text-secondary text-center pointer"
                        >
                          or click to upload
                        </span>
                      </span>
                    </Stack>
                  </Box>
                  <Input
                    {...field}
                    {...props}
                    type="file"
                    height="100%"
                    width="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    aria-hidden="true"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e);
                      handleImageChange(e);
                    }}
                    onDrop={(e) => {
                      field.onChange(e);
                      handleImageChange(e);
                    }}
                  />
                </Box>
              </Box>
            </>
          );
        } else if (type === "fileNormal") {
          return (
            <>
              <Input
              id={id}
                {...field}
                {...props}
                multiple={multiple} // Support for multiple file uploads
                accept="image/*"
                type="file"
                className="web-text-medium form-control rounded-1"
                size="sm"
                onChange={(e) => {
                  field.onChange(e);
                  handleImageChange(e);
                }}
              />
              {multiple && (
                <FormHelperText className="web-text-small">
                  You can select multiple images using{" "}
                  <span className="text-dark">
                    <Kbd size={"sm"} className="text-dark">
                      ctrl
                    </Kbd>{" "}
                    + <Kbd className="text-dark">select</Kbd>
                  </span>
                  .
                </FormHelperText>
              )}
              {selectedImageData &&  (
                multiple ? 
                selectedImageData?.length > 0 && (
                  <Box mt={4} width={"100%"} display="flex" flexWrap="wrap" gap={4}>
                    {selectedImageData?.map((imageDataLink, index) => (
                      <Box key={index} width={"100px"}>
                        <Image
                          rounded={"md"}
                          objectFit={"cover"}
                          src={imageDataLink}
                          alt={`profile-${index}`}
                          width={100}
                          height={100}
                        />
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          position={"relative"}
                        >
                          <CloseIcon
                            onClick={() => removeImage(index)}
                            bg={"#fff"}
                            className="link pointer"
                            p={1}
                            fontSize={"lg"}
                            color={"red"}
                            fontWeight={"500"}
                            rounded={"md"}
                            position={"absolute"}
                            bottom={0}
                            right={0}
                          />
                          <Text
                            as={"span"}
                            fontSize={"xs"}
                            fontWeight={"500"}
                            mt={1}
                            isTruncated={true}
                          >
                            {imageData[index]?.name}
                          </Text>
                          <Text as={"span"} fontSize={"xs"} fontStyle={"italic"}>
                            {(imageData[index]?.size / (1024 * 1024)).toFixed(2)}{" "}
                            mb
                          </Text>
                        </Box>
                      </Box>
                    ))}
                    <AddIcon
                      onClick={() =>
                        document.getElementById(id).click()
                      }
                      rounded={"md"}
                      width={50}
                      height={50}
                      mt={26}
                      p={4}
                      cursor={"pointer"}
                      className="link"
                    />
                  </Box>)
                :<Box mt={5} width={"49%"}>
                  <Image
                    rounded={"md"}
                    objectFit={"cover"}
                    src={selectedImageData}
                    alt="profile"
                    width={100}
                    height={100}
                  />
                  <Box
                    w={"30%"}
                    display={"flex"}
                    flexDirection={"column"}
                    position={"relative"}
                  >
                    <CloseIcon
                      onClick={() => setSelectedImageData(null)}
                      className="link pointer"
                      p={1}
                      fontSize={"lg"}
                      color={"red"}
                      fontWeight={"500"}
                      rounded={"md"}
                      position={"absolute"}
                      top={1}
                      right={0}
                    />
                    <Text
                      as={"span"}
                      fontSize={"xs"}
                      w={"70%"}
                      fontWeight={"500"}
                      mt={1}
                      isTruncated={true}
                    >
                      {imageData?.name}
                    </Text>
                    <Text as={"span"} fontSize={"xs"} fontStyle={"italic"}>
                      {(imageData?.size / (1024 * 1024)).toFixed(2)} mb
                    </Text>
                  </Box>
                </Box>
              )}
            </>
          );
        } else {
          return (
            <Input
              focusBorderColor="forestGreen.300"
              size={"sm"}
              type={type}
              {...field}
              {...props}
              placeholder={placeHolder ? placeHolder : label}
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
    {helperText && (
      <FormHelperText className="web-text-small">{helperText}</FormHelperText>
    )}
    {type === "file" && (
      <FormHelperText className="web-text-small">
        Maximum limit of image is 10MB.
      </FormHelperText>
    )}
  </FormControl>
);

export default FormField;
