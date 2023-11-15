export interface FormField {
  id: string;
  type: string;
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
  fields: FormField[];
}

export interface Form {
  id: string;
  name: string;
  description: string;
  form_type: "public" | "private";
  slug: string;
  status_id: string;
  content: FormContent;
  created_at: string;
  updated_at: string;
  formOpenPeriod?: {
    start_date: string;
    end_date: string;
  }[];
}

export interface FormResponse {
  status: number;
  message: string;
  body: Form | Form[];
}

export default Form;
