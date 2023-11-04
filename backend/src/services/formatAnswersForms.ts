import { FileUploaded, updateSas } from "./storageFiles";

interface AnsweredField {
  id: string;
  label: string;
  value: any;
}

interface AnswerContent {
  abstract: string;
  masterminds: string[];
  activity_name: string;
}

interface AnswerForm {
  id: string;
  form_type: "public" | "private";
  content: {
    name: string;
    fields: {
      id: string;
      zod: {
        type: string;
        validation: any;
      };
      type: string;
      label: string;
      value: any;
      required: boolean;
      placeholder: string;
      options?: { label: string; value: string }[];
      especial_type?: string;
      visible?: boolean;
    }[];
  };
}

interface Answer {
  id: string;
  content: AnswerContent;
  form: AnswerForm;
}

const ignoredFields = ["masterminds", "activity_name"];

export async function getAnsweredFields(
  answers: Answer[] | unknown
): Promise<AnsweredField[]> {
  if (!Array.isArray(answers)) {
    throw new Error(
      "Invalid argument: answers must be an array of Answer objects"
    );
  }

  const answeredFields: AnsweredField[] = [];

  for (const answer of answers) {
    const formFields = answer.form.content.fields;
    const answerContent = answer.content;
    const isPrivate = answer.form.form_type === "private";

    for (let [key, value] of Object.entries(answerContent)) {
      const field = formFields.find((formField) => formField.id === key);

      if (ignoredFields.includes(key) || (!field?.visible && isPrivate)) {
        continue;
      }

      if (typeof value === "object" && "mimeType" in value) {
        value = await updateSas(value as FileUploaded);
      }

      if (field) {
        const answeredField: AnsweredField = {
          id: field.id,
          label: field.label,
          value,
        };
        answeredFields.push(answeredField);
      }
    }
  }

  return answeredFields;
}
