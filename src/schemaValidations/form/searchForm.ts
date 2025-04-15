import { z } from "zod";

export const SearchFormValidate = z.object({
  type: z.enum(["PRODUCT", "SHOP"]),
  q: z.string(),
});

export type SearchFormValidateType = z.infer<typeof SearchFormValidate>;
