import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const status = [
  {
    id: "a8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Inscrição TFG",
  },
  {
    id: "b8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Envio Parcial",
  },
  {
    id: "c8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Solicitação de banca",
  },
  {
    id: "d8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Envio Final",
  },
  {
    id: "e8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Envio Final com correções",
  },
  {
    id: "f8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Aprovado",
  },
  {
    id: "g8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Reprovado",
  },
];

const forms = [
  {
    id: "a9108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Inscrição TFG",
    formType: "public",
    description: "Formulário para inscrição do TFG",
    slug: "inscricao-tfg",
    status_id: "g8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    content: {
      fields: [
        {
          id: "activity_name",
          zod: {
            type: "string",
            validation: {},
          },
          type: "text",
          label: "Título do projeto",
          value: null,
          required: true,
          placeholder: "Insira o título do projeto",
        },
        {
          id: "masterminds",
          especial_type: "teacher",
          zod: {
            type: "multiselect",
          },
          type: "multiselect",
          label: "Orientador e coorientador",
          value: "",
          options: [],
          placeholder: "Insira seu orientador e coorientador caso haja",
        },
        {
          id: "abstract",
          zod: {
            type: "string",
            validation: {},
          },
          type: "textarea",
          label: "Resumo",
          value: null,
          required: true,
          placeholder: "Insira o resumo do projeto",
        },
      ],
    },
  },
  {
    id: "b9108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Processamento de Matrícula TFG",
    formType: "private",
    description: "Formulário para processamento de matrícula do TFG",
    slug: "processamento-tfg",
    content: {
      fields: [
        {
          id: "approved",
          zod: {
            type: "string",
            validation: {},
          },
          type: "radio",
          required: true,
          label: "Situação da Matrícula",
          value: null,
          options: [
            {
              label: "Aprovado",
              value: "true",
            },
            {
              label: "Reprovado",
              value: "false",
            },
          ],
        },
        {
          id: "observations",
          zod: {
            type: "string",
            validation: {},
          },
          type: "textarea",
          label: "Observações",
          value: null,
        },
      ],
    },
  },
  {
    id: "41b90755-0428-4c6e-96ab-7bf763bfc2ff",
    name: "Avaliação Parcial",
    formType: "private",
    description: "Formulário de avaliação parcial",
    slug: "avaliacao-parcial",
    content: {
      fields: [
        {
          id: "p1",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "O documento contextualiza o assunto, descreve objetivos e justificativa para realização do trabalho?",
          value: null,
        },
        {
          id: "p2",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "A qualidade da Revisão Bibliográfica ou do Trabalho Prático desenvolvido (ex. protótipo) está satisfatória?",
          value: null,
        },
        {
          id: "p3",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "O trabalho apresenta coerência entre objetivos, método científico e desenvolvimento?",
          value: null,
        },
        {
          id: "p4",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label: "No geral, o conteúdo entregue está satisfatório?",
          value: null,
        },
        {
          id: "p5",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "O discente apresentou interesse e comprometimento na execução do trabalho?",
          value: null,
        },
        {
          id: "p6",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Todas as atividades definidas no cronograma e acordadas com o orientador foram entregues?",
          value: null,
        },
        {
          id: "p7",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "O discente retorna com inovações ou apenas replica as orientações passadas a ele?",
          value: null,
        },
        {
          id: "approved",
          zod: {
            type: "string",
            validation: {},
          },
          type: "radio",
          required: true,
          label:
            "Caso tenha ocorrido atraso na entrega (penalidade de 10% da Nota do TCC1)",
          value: null,
          options: [
            {
              label: "Não houve atraso",
              value: "true",
            },
            {
              label: "Houve atraso",
              value: "false",
            },
          ],
        },
        {
          id: "observations",
          zod: {
            type: "string",
            validation: {},
          },
          type: "textarea",
          label: "Observações",
          value: null,
        },
      ],
    },
  },
  {
    id: "2132053b-2f16-4214-ba7b-d1150c5dbd33",
    name: "Entrega Parcial",
    formType: "private",
    description: "Formulário de entrega parcial",
    slug: "entrega-parcial",
    content: {
      fields: [
        {
          id: "p1",
          zod: {
            type: "file",
            validation: {},
          },
          type: "file",
          required: true,
          label: "Primeira versão do TFG",
          value: null,
        },
      ],
    },
  },
];

const workflows = [
  {
    id: "f219d103-4867-4257-80ac-678ed2e0089d",
    name: "Inscrição TFG",
    status_id: "a8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    first_step_id: "step1",
    steps: [
      {
        id: "step1",
        name: "Aviso ao Aluno",
        type: "send_email",
        content: {
          to: ["${student}"],
          body: "Inscrição realizada, aguardando processamento",
          title: "Inscrição realizada",
        },
        next_step_id: "step2",
      },
      {
        id: "step2",
        name: "Requisição de aprovação ao coordenador",
        type: "request_answer",
        content: {
          answers: ["${coordinator}"],
          form_id: "a1a8fa70-e59c-48c4-b52e-ad45ca1f60d4",
        },
        next_step_id: "step3",
      },
      {
        id: "step3",
        name: "Avaliação da aprovação do coordenador",
        type: "conditional",
        content: {
          condition:
            "const rq = operations.getReqAnswerByStepId('step2');if (rq.at(-1).answers.at(-1).content.approved === 'true'){console.log('Aprovado');return true;}return false;",
          true_step_id: "step4",
          false_step_id: "step5",
        },
        next_step_id: null,
      },
      {
        id: "step4",
        name: "Matrícula aprovada",
        type: "swap_workflow",
        content: {
          status_id: "b8108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: null,
      },
      {
        id: "step5",
        name: "Matrícula reprovada",
        type: "swap_workflow",
        content: {
          status_id: "g8108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: null,
      },
    ],
  },
  {
    name: "Entrega Parcial",
    status_id: "292fc3e8-9799-415d-bc67-54d1f77cb057",
    first_step_id: "p-step1",
    steps: [
      {
        id: "p-step1",
        name: "Aviso ao Aluno",
        type: "send_email",
        content: {
          to: ["${student}"],
          body: "Sua inscrição do TFG foi aprovado!",
          title: "Inscrição realizada com sucesso!",
        },
        next_step_id: "p-step2",
      },
      {
        id: "p-step2",
        name: "Requisição de Entrega Parcial",
        type: "request_answer",
        content: {
          answers: ["${student}"],
          form_id: "2132053b-2f16-4214-ba7b-d1150c5dbd33",
        },
        next_step_id: "p-step3",
      },
      {
        id: "p-step3",
        name: "Requisição de Avaliação Parcial",
        type: "request_answer",
        content: {
          answers: ["${masterminds}"],
          form_id: "41b90755-0428-4c6e-96ab-7bf763bfc2ff",
        },
        next_step_id: "p-step4",
      },
      {
        id: "p-step4",
        name: "Avaliação da aprovação do coordenador",
        type: "conditional",
        content: {
          condition:
            "const rq = operations.getReqAnswerByStepId('p-step3');if (rq.at(-1).answers.at(-1).content.approved === 'true'){console.log('Aprovado');return true;}return false;",
          true_step_id: "p-step5",
          false_step_id: "p-step6",
        },
        next_step_id: null,
      },
      {
        id: "p-step5",
        name: "Entrega Parcial Aprovada",
        type: "swap_workflow",
        content: {
          status_id: "c8108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: null,
      },
      {
        id: "p-step6",
        name: "Matrícula reprovada",
        type: "swap_workflow",
        content: {
          status_id: "916cc0a5-f0fb-4ad6-948b-0398a4a718ad",
        },
        next_step_id: null,
      },
    ],
  },
];

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.status.upsert({
      where: { id: status[i].id },
      update: {},
      create: {
        id: status[i].id,
        name: status[i].name,
      },
    });
  }

  await prisma.institutes.upsert({
    where: { acronym: "IMC" },
    update: {},
    create: {
      name: "Instituto de Matemática e Computação",
      acronym: "IMC",
    },
  });

  for (const form in forms) {
    await prisma.forms.upsert({
      where: { slug: forms[form].slug },
      update: {},
      create: {
        id: forms[form].id,
        name: forms[form].name,
        form_type: forms[form].formType as any,
        description: forms[form].description,
        slug: forms[form].slug,
        status_id: forms[form].status_id,
        content: forms[form].content,
      },
    });
  }

  for (const workflow in workflows) {
    await prisma.workflows.upsert({
      where: { status_id: workflows[workflow].status_id },
      update: {},
      create: {
        name: workflows[workflow].name,
        status_id: workflows[workflow].status_id,
        first_step_id: workflows[workflow].first_step_id,
        steps: {
          createMany: {
            data: workflows[workflow].steps.map((step) => ({
              identifier: step.id,
              name: step.name,
              type: step.type as any,
              content: step.content,
              next_step_id: step.next_step_id,
            })),
          },
        },
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
