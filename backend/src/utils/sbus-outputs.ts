import { InvocationContext, output } from "@azure/functions";

export const extraOutputsSwapWorkflow = output.serviceBusQueue({
  queueName: "swap_workflow",
  connection: "AzureServiceBusConnectionString",
});

const extraOutputsConditional = output.serviceBusQueue({
  queueName: "conditional",
  connection: "AzureServiceBusConnectionString",
});

const extraOutputsSendEmail = output.serviceBusQueue({
  queueName: "send_email",
  connection: "AzureServiceBusConnectionString",
});

const extraOutputsRequestAnswer = output.serviceBusQueue({
  queueName: "request_answer",
  connection: "AzureServiceBusConnectionString",
});

const extraOutputsOrchestrator = output.serviceBusQueue({
  queueName: "orchestrator",
  connection: "AzureServiceBusConnectionString",
});

export const extraOutputs = {
  swap_workflow: extraOutputsSwapWorkflow,
  conditional: extraOutputsConditional,
  send_email: extraOutputsSendEmail,
  request_answer: extraOutputsRequestAnswer,
  orchestrator: extraOutputsOrchestrator,
};

const sbusOutputs = Object.values(extraOutputs);

export default sbusOutputs;

type SendToQueue = (
  context: InvocationContext,
  queueName: keyof typeof extraOutputs,
  message: any
) => void;

export const sendToQueue: SendToQueue = (context, queueName, message) => {
  context.extraOutputs.set(extraOutputs[queueName], message);
};
