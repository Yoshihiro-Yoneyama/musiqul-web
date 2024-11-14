import {z} from "zod";

export const RequiredGenerationOption = z.object({
  label: z.string(),
  value: z.string()
})

export const recruitmentSchema = z.object({
  owner: z.string(),
  // ownerInstruments: string[],
  songTitle: z.string().optional(),
  artist: z.string().optional(),
  name: z.string().min(1),
  genre: z.string().array(),
  deadline: z.string(),
  requiredGenerations: RequiredGenerationOption.array(),
  requiredGender: z.string(),
  // map形式
  // recruitedInstruments: string[],
})

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>