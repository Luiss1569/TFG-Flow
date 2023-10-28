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
    }[];
  };
}

interface Answer {
  id: string;
  content: AnswerContent;
  form: AnswerForm;
}

const ignoredFields = ["masterminds", "activity_name"];

export function getAnsweredFields(
  answers: Answer[] | unknown
): AnsweredField[] {
  if (!Array.isArray(answers)) {
    throw new Error(
      "Invalid argument: answers must be an array of Answer objects"
    );
  }

  const answeredFields: AnsweredField[] = [];

  answers.forEach((answer) => {
    const formFields = answer.form.content.fields;
    const answerContent = answer.content;

    Object.entries(answerContent).forEach(([key, value]) => {
      const field = formFields.find((formField) => formField.id === key);

      if (ignoredFields.includes(key)) {
        return;
      }

      if (field) {
        const answeredField: AnsweredField = {
          id: field.id,
          label: field.label,
          value,
        };
        answeredFields.push(answeredField);
      }
    });
  });

  return answeredFields;
}
