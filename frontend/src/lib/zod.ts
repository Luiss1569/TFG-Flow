import { z, ZodAny } from "zod";
import { FormField } from "../interfaces/Form";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

async function getBase64(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const mapZodType = (
  type: string
): ReturnType<
  | typeof z.string
  | typeof z.number
  | typeof z.date
  | typeof z.array
  | typeof z.any
> => {
  switch (type) {
    case "string":
      return z.string();
    case "number":
      return z.coerce.number();
    case "date":
      return z.coerce.date();
    case "select":
      return z.string();
    case "multiselect":
      return z
        .array(z.object({ value: z.string(), label: z.string() }))
        .transform((values) =>
          values.map((value) => value.value)
        ) as unknown as ZodAny;
    case "file":
      return z
        .any()
        .refine(
          (files) => !files.length || files?.[0]?.size <= MAX_FILE_SIZE,
          `Max file size is 5MB.`
        )
        .refine(
          (files) =>
            !files.length || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          ".jpg, .jpeg, .png and .webp .pdf files are accepted."
        )
        .transform(async (files: FileList) => {
          if (!files.length) {
            return null;
          }

          const base64 = await getBase64(files[0]);
          return {
            name: files[0].name,
            size: files[0].size,
            type: files[0].type,
            file: base64,
          };
        }) as unknown as ZodAny;
    default:
      return z.string();
  }
};

export const createSchema = (fields: FormField[]) => {
  const schema = z
    .object(
      fields.reduce((acc, field: FormField) => {
        if (!field.zod) {
          return acc;
        }

        const { id, zod } = field;
        const { type } = zod;

        const fieldSchema = mapZodType(type);

        return { ...acc, [id]: fieldSchema };
      }, {})
    )
    .partial();

  return schema;
};
