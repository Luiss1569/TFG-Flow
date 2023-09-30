export interface SwapWorkflowInterface {
  status_id: string;
}

export interface SendEmailInterface {
  to?: string;
  subject: string;
  title: string;
  body: string;
}

export interface RequestAnswerInterface {
  form_id: string;
  answers: string[];
}

export interface ConditionalInterface {
  condition: string;
  trueStepId: string;
  falseStepId: string;
}

export type StepContent =
  | SendEmailInterface
  | SwapWorkflowInterface
  | RequestAnswerInterface
  | ConditionalInterface;