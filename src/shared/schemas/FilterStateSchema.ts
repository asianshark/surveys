import { z } from 'zod';
const SelectPropsSchema = z.any();
export const PaginationSchema = z.object({
    current: z.number().optional(),
    pageSize: z.number().optional(),
    total: z.number().optional(),
    showSizeChanger: z.union([z.boolean(), SelectPropsSchema]).optional(),
    pageSizeOptions: z.array(z.union([z.string(), z.number()])).optional(),
});


export const FiltersSchema = z.record(z.any().nullable());

export const SorterSchema = z.object({
    field: z.any().optional(),
    order: z.enum(['ascend', 'descend']).nullable().optional(),
    columnKey: z.any().optional(),
});

export const FilterStateSchema = z.object({
    pagination: PaginationSchema,
    filters: FiltersSchema,
    sorter: z.union([SorterSchema, z.array(SorterSchema)]),
});

export type FilterState = z.infer<typeof FilterStateSchema>;

