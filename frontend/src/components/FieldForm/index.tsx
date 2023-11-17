import {
  Heading,
  Checkbox,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { memo, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { SelectComponent } from "../Select";
import { InputComponent } from "../Input";
import { Button } from "../Button";
import Form from "../../interfaces/Form";

interface FieldFormsProps {
  field: FieldArrayWithId<Form, "content.fields", "id">;
  index: number;
  register: UseFormRegister<Form>;
  control: Control<Form>;
  getValues: UseFormGetValues<Form>;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<Form>;
}

const FieldForms = ({
  field,
  index,
  register,
  control,
  getValues,
  remove,
  setValue,
}: Readonly<FieldFormsProps>) => {
  const [inputType, setInputType] = useState<string>(
    getValues(`content.fields.${index}.type`)
  );

  return (
    <Box
      key={field.id}
      mb="2rem"
      p="1rem"
      border="1px solid gray"
      borderRadius="lg"
    >
      <InputComponent
        label="Digite o identificador do campo"
        placeholder="ID"
        {...register(`content.fields.${index}.id`, {
          required: true,
        })}
        id={`fields-${index}-id`}
      />
      <InputComponent
        label="Digite o label do campo"
        placeholder="Label"
        {...register(`content.fields.${index}.label`, {
          required: true,
        })}
        id={`fields-${index}-label`}
      />

      <SelectComponent
        label="Digite o tipo do campo"
        placeholder="Tipo"
        options={[
          { label: "Text", value: "text" },
          { label: "Number", value: "number" },
          { label: "Date", value: "date" },
          { label: "Email", value: "email" },
          { label: "Password", value: "password" },
          { label: "Textarea", value: "textarea" },
          { label: "Select", value: "select" },
          { label: "Multi Select", value: "multiselect" },
          { label: "Radio", value: "radio" },
          { label: "Checkbox", value: "checkbox" },
          { label: "File", value: "file" },
        ]}
        {...register(`content.fields.${index}.type`, {
          required: true,
        })}
        onChange={(e) => {
          setInputType(e.target.value);
          setValue(`content.fields.${index}.type`, e.target.value);
        }}
        value={getValues(`content.fields.${index}.type`)}
        id={`fields-${index}-type`}
      />

      {["select", "multiselect", "radio", "checkbox"].includes(inputType) && (
        <FieldOptionsMenu index={index} {...{ register, control }} />
      )}

      <InputComponent
        label="Digite o placeholder do campo"
        placeholder="Placeholder"
        {...register(`content.fields.${index}.placeholder`)}
        id={`fields-${index}-placeholder`}
      />

      <FormControl>
        <Checkbox
          type="checkbox"
          {...register(`content.fields.${index}.required`)}
          id={`fields-${index}-required`}
        >
          <FormLabel htmlFor={`fields-${index}-required`}>
            Campo obrigatório
          </FormLabel>
        </Checkbox>
      </FormControl>

      <FormControl>
        <Checkbox
          type="checkbox"
          {...register(`content.fields.${index}.visible`)}
          id={`fields-${index}-visible`}
        >
          <FormLabel htmlFor={`fields-${index}-visible`}>
            Visivel para o usuário
          </FormLabel>
        </Checkbox>
      </FormControl>

      <Button type="button" onClick={() => remove(index)} color="#fff">
        <FaTrash />
      </Button>
    </Box>
  );
};

export default FieldForms;

interface OptionFieldProps {
  index: number;
  register: UseFormRegister<Form>;
  control: Control<Form>;
}

const FieldOptionsMenu = memo(
  ({ index, control, register }: Readonly<OptionFieldProps>) => {
    const {
      fields: optionFields,
      append: appendOption,
      remove: removeOption,
    } = useFieldArray({
      control,
      name: `content.fields.${index}.options`,
    });

    return (
      <Box my="1rem">
        <Heading as="h6" fontSize="md" my="1rem">
          Opções
        </Heading>
        <SelectComponent
          label="Tipo especial?"
          options={[{ label: "Professores", value: "teacher" }]}
          {...register(`content.fields.${index}.especial_type`)}
        />
        {optionFields.map((optionField, optionIndex) => (
          <Box
            key={optionField.id}
            p="1rem"
            border="1px solid gray"
            my="1rem"
            borderRadius={8}
          >
            <InputComponent
              label="Digite o valor da opção"
              type="text"
              {...register(
                `content.fields.${index}.options.${optionIndex}.label`
              )}
              id={`fields-${index}-options-${optionIndex}-label`}
            />
            <InputComponent
              label="Digite o valor da opção"
              type="text"
              {...register(
                `content.fields.${index}.options.${optionIndex}.value`
              )}
              id={`fields-${index}-options-${optionIndex}-value`}
            />

            <Button
              type="button"
              my="1rem"
              onClick={() => removeOption(optionIndex)}
              color="#fff"
              id={`fields-${index}-options-${optionIndex}-btn-remove`}
            >
              <FaTrash />
            </Button>
          </Box>
        ))}
        <Button
          type="button"
          id={`fields-${index}-options-btn-add`}
          onClick={() => appendOption({ value: "", label: "" })}
        >
          <MdOutlineAdd color="white" />
        </Button>
      </Box>
    );
  }
);
