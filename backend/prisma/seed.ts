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
    status_id: "a8108535-0fb6-49b0-9426-a4a9a48dc0d9",
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
        {
          id: "plan",
          zod: {
            type: "file",
            validation: {},
          },
          type: "file",
          label: "Plano de TFG",
          value: null,
          required: false,
          placeholder: "Insira o plano do projeto",
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
              value: "Aprovado",
            },
            {
              label: "Reprovado",
              value: "Reprovado",
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
          visible: true,
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
          id: "fate",
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
              value: "Sem Atraso",
            },
            {
              label: "Houve atraso",
              value: "Atrasado",
            },
          ],
          visible: true,
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
          visible: true,
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
          id: "parcial",
          zod: {
            type: "file",
            validation: {},
          },
          type: "file",
          required: false,
          label: "Primeira versão do TFG",
          value: null,
          placeholder: "Insira a primeira versão do TFG",
          visible: true,
        },
        {
          id: "observations",
          label: "Observações",
          placeholder: "Insira as observações",
          zod: {
            type: "string",
            validation: {},
          },
          visible: true,
        },
      ],
    },
  },
  {
    id: "c9108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Solicitação de Banca",
    formType: "private",
    description: "Formulário de solicitação de banca",
    slug: "solicitacao-banca",
    content: {
      fields: [
        {
          id: "place",
          zod: {
            type: "string",
            validation: {},
          },
          type: "radio",
          required: true,
          label: "Banca remota?",
          value: null,
          options: [
            {
              label: "Remota",
              value: "Remota",
            },
            {
              label: "Presencial",
              value: "Presencial",
            },
          ],
        },
        {
          id: "members",
          zod: {
            type: "multiselect",
            validation: {},
          },
          type: "multiselect",
          required: true,
          label: "Membros da banca",
          value: null,
          options: [],
          especial_type: "teacher",
          placeholder: "Insira os membros da banca",
        },
        {
          id: "date",
          zod: {
            type: "string",
            validation: {},
          },
          type: "date",
          required: true,
          label: "Data da banca",
          value: null,
          placeholder: "Insira a data da banca",
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
          visible: true,
        },
      ],
    },
  },
  {
    id: "d9108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Envio Final",
    formType: "private",
    description: "Formulário de envio final",
    slug: "envio-final",
    content: {
      fields: [
        {
          id: "final",
          zod: {
            type: "file",
            validation: {},
          },
          type: "file",
          required: false,
          label: "Versão final do TFG",
          value: null,
          placeholder: "Insira a versão final do TFG",
          visible: true,
        },
        {
          id: "observations",
          label: "Observações",
          placeholder: "Insira as observações",
          zod: {
            type: "string",
            validation: {},
          },
          visible: true,
        },
      ],
    },
  },
  {
    id: "e9108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Envio Final com correções",
    formType: "private",
    description: "Formulário de envio final com correções",
    slug: "envio-final-correcoes",
    content: {
      fields: [
        {
          id: "final",
          zod: {
            type: "file",
            validation: {},
          },
          type: "file",
          required: false,
          label: "Versão final do TFG",
          value: null,
          placeholder: "Insira a versão final do TFG",
          visible: true,
        },
        {
          id: "observations",
          label: "Observações",
          placeholder: "Insira as observações",
          zod: {
            type: "string",
            validation: {},
          },
          visible: true,
        },
      ],
    },
  },
  {
    id: "f9108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Aprovação Final",
    formType: "private",
    description: "Formulário de aprovação final",
    slug: "aprovacao-final",
    content: {
      fields: [
        {
          id: "t1",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Sintetiza o contexto do problema, o objetivo do trabalho, o escopo da solução e o resultado geral?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t2",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Apresenta dentro de um contexto o problema abordado no trabalho?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t3",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Contém a justificativa e contribuições do trabalho, identificando a sua importância para a sociedade?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t4",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label: "Descreve claramente o objetivo do trabalho?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t5",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Apresenta possíveis soluções para o problema de pesquisa? (ex. hipóteses)",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t6",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label: "Descreve a estrutura e organização do conteúdo do trabalho?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t7",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Aborda os principais conceitos que auxiliam na compreensão do tema abordado?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t8",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label: "Os conceitos estão devidamente referenciados?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t9",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label: "Apresenta referências atuais e diversificadas?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t10",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "A qualidade da fonte das referências bibliográficas é adequada?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t11",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Contém a descrição dos métodos de estudo e técnicas de coleta de dados?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t12",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Explica detalhadamente a solução desenvolvida e os materiais utilizados?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t13",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Está devidamente descrito o procedimento de validação da solução, incluindo o ambiente e métricas?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t14",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Considerando o conteúdo apresentado seria possível a reprodução dos métodos e validação da solução?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t15",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Os resultados obtidos são devidamente apresentados e discutidos?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t16",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "Conclusões estão claras? Foram apontados os benefícios e deficiências da solução?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t17",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "São apresentadas as contribuições do trabalho e possibilidades de trabalhos futuros?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t18",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "A escrita tem formalismo acadêmico e segue a norma culta? (ex. sem erros gramaticais e semânticos)?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "t19",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "A estética do documento está satisfatória? (ex. formatação, presença de elementos visuais nítidos etc)",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "d1",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "A qualidade dos slides está satisfatória? (ex. conteúdo, formatação, densidade, nitidez das figuras)",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "d2",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "O conteúdo apresentado prioriza o que foi desenvolvido (método, resultados) e não o referencial?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "d3",
          zod: {
            type: "number",
            validation: {},
          },
          type: "number",
          required: true,
          label:
            "O discente demostrou ter domínio do assunto, foi seguro na apresentação e na arguição?",
          value: null,
          placeholder: "Insira a nota de 0 a 10",
        },
        {
          id: "time",
          label: "Ultrapassou o tempo de apresentação de 20 min?",
          type: "radio",
          required: true,
          value: null,
          options: [
            {
              label: "Dentro do tempo",
              value: "Dentro do tempo",
            },
            {
              label: "Ultrapassou o tempo",
              value: "Ultrapassou o tempo",
            },
          ],
          visible: true,
        },
        {
          id: "publish",
          label:
            "Marque caso concorde que o trabalho tem potencial de publicação",
          type: "checkbox",
          options: [
            {
              label: "Registro de Software",
              value: "Registro de Software",
            },
            {
              label: "Periódico ou Evento",
              value: "Periódico ou Evento",
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
          visible: true,
        },
      ],
    },
  },
  {
    id: "g9108535-0fb6-49b0-9426-a4a9a48dc0d9",
    name: "Definição do local da banca",
    formType: "private",
    description: "Formulário de definição do local da banca",
    slug: "definicao-local-banca",
    content: {
      fields: [
        {
          id: "local",
          zod: {
            type: "string",
            validation: {},
          },
          type: "string",
          required: true,
          label: "Local da banca",
          placeholder: "Insira o local da banca",
          value: null,
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
          visible: true,
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
          form_id: "b9108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: "step3",
      },
      {
        id: "step3",
        name: "Avaliação da aprovação do coordenador",
        type: "conditional",
        content: {
          condition: `
            const answers = operations.getReqAnswerByStepId('step2').at(-1).answers.at(-1).content;
            
            return {
              result: answers.approved === 'Aprovado',
              body: null
            }
          `,
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
    status_id: "b8108535-0fb6-49b0-9426-a4a9a48dc0d9",
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
        name: "Analise da Avaliação Parcial",
        type: "conditional",
        content: {
          condition: ` const keys = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
              const resps = operations.getReqAnswerByStepId('p-step3').at(-1).answers.at(-1).content;
              const notes = keys.map((key) => resps[key]);
              const isFate = resps.fate === "Atrasado";

              const sum = notes.reduce((a, b) => a + b, 0);
              const avg = sum / notes.length;
              const note = isFate ? avg * 0.9 : avg;

              return {
                result: avg >= 6,
                body: {
                  "Média": avg,
                  "Atraso": isFate ? "Sim - 10% na nota" : "Não",
                  "Nota Final": note,
                }
              }
            `,
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
          status_id: "g8108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: null,
      },
    ],
  },
  {
    name: "Solicitação de banca",
    status_id: "c8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    first_step_id: "s-step1",
    steps: [
      {
        id: "s-step1",
        name: "Aviso ao Aluno",
        type: "send_email",
        content: {
          to: ["${student}"],
          body: "Sua inscrição do TFG foi aprovado!",
          title: "Inscrição realizada com sucesso!",
        },
        next_step_id: "s-step2",
      },
      {
        id: "s-step2",
        name: "Requisição de Banca",
        type: "request_answer",
        content: {
          answers: ["${student}"],
          form_id: "c9108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: "s-step3",
      },
      {
        id: "s-step3",
        name: "Analise do local da banca",
        type: "conditional",
        content: {
          condition: `
            const answers = operations.getReqAnswerByStepId('s-step2').at(-1).answers.at(-1).content;
            
            return {
              result: answers.place === 'Presencial',
              body: null
            }
          `,
          true_step_id: "s-step4",
          false_step_id: "s-step5",
        },
      },
      {
        id: "s-step4",
        name: "Definição do local da banca",
        type: "request_answer",
        content: {
          answers: ["${coordinator}"],
          form_id: "g9108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: "s-step5",
      },
      {
        id: "s-step5",
        name: "Aviso ao Aluno",
        type: "send_email",
        content: {
          to: ["${student}"],
          body: "Sua banca foi marcada!",
          title: "Banca marcada!",
        },
        next_step_id: "s-step6",
      },
      {
        id: "s-step6",
        name: "Entrega Final",
        type: "swap_workflow",
        content: {
          status_id: "d8108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
      },
    ],
  },
  {
    name: "Entrega Final de TFG",
    status_id: "d8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    first_step_id: "e-step1",
    steps: [
      {
        id: "e-step1",
        name: "Requisição de Entrega Final",
        type: "request_answer",
        content: {
          answers: ["${student}"],
          form_id: "d9108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: "e-step2",
      },
      {
        id: "e-step2",
        name: "Requisição de Avaliação Final",
        type: "request_answer",
        content: {
          answers: ["${masterminds}"],
          fieldForm: [
            {
              form_id: "c9108535-0fb6-49b0-9426-a4a9a48dc0d9",
              field_id: "members",
            },
          ],
          form_id: "f9108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
        next_step_id: "e-step3",
      },
      {
        id: "e-step3",
        name: "Analise da Avaliação Final da Banca",
        type: "conditional",
        content: {
          condition: `
            const answers = operations.getReqAnswerByStepId('e-step2').at(-1).answers;


            const tkeys = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16", "t17","t18","t19"];

            const dkeys = ["d1", "d2", "d3"];

            const notes = [];

            answers.forEach((answer) => {
              const resps = answer.content;
              const tnotes = tkeys.map((key) => resps[key]);
              const dnotes = dkeys.map((key) => resps[key]);

              const tsum = tnotes.reduce((a, b) => a + b, 0);
              const tavg = tsum / tnotes.length;

              const dsum = dnotes.reduce((a, b) => a + b, 0);
              const davg = dsum / dnotes.length;
              const note =  (tavg * 0.6) + (davg * 0.4);

              notes.push(note);
            });

            const sum = notes.reduce((a, b) => a + b, 0);
            const avg = sum / notes.length;

            return {
              result: avg >= 6,
              body: {
                "Notas": notes.join(" + ") + " / " + notes.length,
                "Nota Final": avg,
              }
            }
          `,
          true_step_id: "e-step4",
          false_step_id: "e-step5",
        },
      },
      {
        id: "e-step4",
        name: "Entrega Final Aprovada",
        type: "swap_workflow",
        content: {
          status_id: "e8108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
      },
      {
        id: "e-step5",
        name: "Entrega Final Reprovada",
        type: "swap_workflow",
        content: {
          status_id: "g8108535-0fb6-49b0-9426-a4a9a48dc0d9",
        },
      },
    ],
  },
  {
    name: "Reprovado",
    status_id: "g8108535-0fb6-49b0-9426-a4a9a48dc0d9",
    first_step_id: "r-step1",
    steps: [
      {
        id: "r-step1",
        name: "Aviso ao Aluno",
        type: "send_email",
        content: {
          to: ["${student}"],
          body: "Seu do TFG foi reprovado!",
          title: "TFG reprovada!",
        },
        next_step_id: null,
      },
    ],
  },
];

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE "answers" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "activities" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "workflows" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "status" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "forms" CASCADE;`;

  for (const i in status) {
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
