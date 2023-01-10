import { z } from 'zod'

export const AtomicAsset = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(180),
  description: z.string().max(300),
  type: z.string(),
  topics: z.array(z.string()),
  balances: z.record(z.string(), z.number()),
  contentType: z.string().default('text/html'),
  data: z.string().or(z.instanceof(Uint8Array)).optional(),
  forks: z.string().default(''),
  groupId: z.string().optional(),
  meta: z.string().optional()
})

export type AtomicAssetType = z.infer<typeof AtomicAsset>