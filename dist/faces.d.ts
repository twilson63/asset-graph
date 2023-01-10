import { z } from 'zod';
export declare const AtomicAsset: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    type: z.ZodString;
    topics: z.ZodArray<z.ZodString, "many">;
    balances: z.ZodRecord<z.ZodString, z.ZodNumber>;
    contentType: z.ZodDefault<z.ZodString>;
    data: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>]>>;
    forks: z.ZodDefault<z.ZodString>;
    groupId: z.ZodOptional<z.ZodString>;
    meta: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: string;
    data?: string | Uint8Array;
    id?: string;
    meta?: string;
    title?: string;
    description?: string;
    topics?: string[];
    balances?: Record<string, number>;
    contentType?: string;
    forks?: string;
    groupId?: string;
}, {
    type?: string;
    data?: string | Uint8Array;
    id?: string;
    meta?: string;
    title?: string;
    description?: string;
    topics?: string[];
    balances?: Record<string, number>;
    contentType?: string;
    forks?: string;
    groupId?: string;
}>;
export type AtomicAssetType = z.infer<typeof AtomicAsset>;
