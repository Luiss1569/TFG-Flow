import React, { memo, useCallback, useEffect, useRef } from "react";
import { FiFile } from "react-icons/fi";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import MultiSelect from "react-select";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
  Controller,
  Control,
} from "react-hook-form";
import { FormField } from "../../interfaces/Form";

interface Props {
  fields: FormField[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control?: Control<FieldValues>;
}

const RenderInput: React.FC<Props> = ({
  fields,
  register,
  errors,
  control,
}) => {
  const renderInput = useCallback(
    (input: FormField) => {
      switch (input.type) {
        case "select":
          return (
            <FormControl
              id={input.id}
              isInvalid={!!errors?.[input.id]}
              isRequired={input?.required}
            >
              <FormLabel>{input.label}</FormLabel>
              <Select id={input.id}>
                {input.options?.map(
                  (item: { value: string; label: string }) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  )
                )}
              </Select>
              <ErrorMessage error={errors?.[input.id]} />
            </FormControl>
          );
        case "multiselect":
          return (
            <FormControl
              id={input.id}
              isInvalid={!!errors?.[input.id]}
              isRequired={input.required}
            >
              <FormLabel>{input.label}</FormLabel>
              <Controller
                name={input.id}
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    options={input?.options}
                    isMulti
                    placeholder={input.placeholder}
                  />
                )}
                rules={{ required: !!input.required }}
              />
              <ErrorMessage error={errors?.[input.id]} />
            </FormControl>
          );
        case "textarea":
          return (
            <FormControl
              id={input.id}
              isInvalid={!!errors?.[input.id]}
              isRequired={input.required}
            >
              <FormLabel>{input.label}</FormLabel>
              <Input
                as="textarea"
                placeholder={input.placeholder}
                {...register(input.id)}
              />
              <ErrorMessage error={errors?.[input.id]} />
            </FormControl>
          );
        case "file":
          return (
            <FormControl
              id={input.id}
              isInvalid={!!errors?.[input.id]}
              isRequired={input.required}
            >
              <FormLabel>{input.label}</FormLabel>
              <InputFile input={input} register={register} />
              <ErrorMessage error={errors?.[input.id]} />
            </FormControl>
          );
        case "radio":
          return (
            <FormControl
              id={input.id}
              isInvalid={!!errors?.[input.id]}
              isRequired={input.required}
            >
              <FormLabel>{input.label}</FormLabel>
              <Controller
                name={input.id}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup onChange={onChange} value={value}>
                    <Stack direction="row">
                      {input.options?.map(
                        (item: { value: string; label: string }) => (
                          <Radio key={item.value} value={item.value}>
                            {item.label}
                          </Radio>
                        )
                      )}
                    </Stack>
                  </RadioGroup>
                )}
                rules={{ required: !!input.required }}
              />
              <ErrorMessage error={errors?.[input.id]} />
            </FormControl>
          );
        default:
          return (
            <FormControl
              id={input.id}
              isInvalid={!!errors?.[input.id]}
              isRequired={input.required}
            >
              <FormLabel>{input.label}</FormLabel>
              <Input
                type={input.type}
                placeholder={input.placeholder}
                {...register(input.id)}
              />
              <ErrorMessage error={errors?.[input.id]} />
            </FormControl>
          );
      }
    },
    [register, errors, control]
  );

  return (
    <>
      {fields.map((input: FormField) => (
        <React.Fragment key={input.id}>{renderInput(input)}</React.Fragment>
      ))}
    </>
  );
};

const MemoizedRenderInput = memo(RenderInput);

export default MemoizedRenderInput;

const ErrorMessage = ({
  error,
}: {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}) => {
  return (
    <>
      {typeof error?.message === "string" && (
        <FormHelperText color={"red"}>{error.message}</FormHelperText>
      )}
    </>
  );
};

const InputFile = ({
  input,
  register,
}: {
  input: FormField;
  register: UseFormRegister<FieldValues>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(input.id) as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const [, setFile] = React.useState<File>();

  const haveFile = inputRef.current?.files?.[0];

  useEffect(() => {
    const file = inputRef.current;

    file?.addEventListener("change", () => {
      setFile(file?.files?.[0]);
    });

    return () => {
      file?.removeEventListener("change", () => {
        setFile(file?.files?.[0]);
      });
    };
  }, []);

  return (
    <InputGroup
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <InputLeftElement pointerEvents="none" children={<Icon as={FiFile} />} />
      <Input
        type="file"
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        hidden
      />
      <Input
        type="text"
        cursor="pointer"
        placeholder={
          haveFile ? inputRef.current?.files?.[0].name : input.placeholder
        }
        readOnly
      />
    </InputGroup>
  );
};
