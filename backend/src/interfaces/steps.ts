import { Prisma } from "@prisma/client";

export interface SwapWorkflowInterface extends Prisma.JsonObject {
  status_id: string;
}

export interface SendEmailInterface extends Prisma.JsonObject {
  to?: string[];
  title: string;
  body: string;
}

export interface RequestAnswerInterface extends Prisma.JsonObject {
  form_id: string;
  answers: string[];
}

export interface ConditionalInterface extends Prisma.JsonObject {
  condition: string;
  true_step_id: string;
  false_step_id: string;
}

export type StepContent =
  | SendEmailInterface
  | SwapWorkflowInterface
  | RequestAnswerInterface
  | ConditionalInterface;
