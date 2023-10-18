export interface FormField {
  id: string;
  type: string;
  especial_type?: "teacher" | "student" | "user";
  value: string | null;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
  zod: {
    type: string;
    validation?: {
      required?: boolean;
      min?: number;
      max?: number;
      options?: string[];
    };
  };
}

export interface FormContent {
  name: string;
  fields: FormField[];
}

export interface Form {
  id: string;
  form_type: string;
  slug: string;
  status_id: string;
  content: FormContent;
  created_at: string;
  updated_at: string;
}

export interface FormResponse {
  status: number;
  message: string;
  body: Form | Form[];
}

export default Form;
