import { z } from "zod";

export const ActivitySchema = z.object({
    activityId: z.string(),
    date: z.string(),
    description: z.string(),
});

export const SaleStatusSchema = z.enum(["Open", "Lost", "Sold", "Stalled"])
export const SaleSchema = z.object({
    saleId: z.string(),
    status: SaleStatusSchema,
    saleDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "Invalid date format" }),
    amount: z.number().min(0, { message: "Amount must be greater than 0" }),
    stage: z.string().nonempty({ message: "Stage is required" }),
    nextActivity: z.string().nonempty({ message: "Next activity is required" }),
    saleName: z.string().nonempty({ message: "Sale name is required" }),
});

export type SaleStatus = z.infer<typeof SaleStatusSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
export type Sale = z.infer<typeof SaleSchema>;



/*------------ api shemas ----------*/

// eror response
export const ErrorResponseSchema = z.object({
    "message": z.string(),
    "error": z.string(),
    "statusCode": z.number(),
})
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

//get 
export const GetSalesResponseSchema = z.object({
    "metadata": z.object({
        "page": z.number(),
        "total": z.number(),
        "perPage": z.number(),
    }),
    "data": z.array(SaleSchema)
})
export const GetSalesErrorResponseSchema = z.object({
    "message": z.string(),
    "error": z.string(),
    "statusCode": z.number(),
})
export type GetSalesResponse = z.infer<typeof GetSalesResponseSchema>
export type GetSalesErrorResponse = z.infer<typeof GetSalesErrorResponseSchema>

//create sale
export const CreateSaleRequestSchema = SaleSchema.omit({
    saleId: true,
    saleDate: true
})
export const CreateSaleResponseSchema = z.union([SaleSchema, ErrorResponseSchema])
export type CreateSaleResponse = z.infer<typeof CreateSaleResponseSchema>
export type CreateSaleRequest = z.infer<typeof CreateSaleRequestSchema>


//update sale
export const UpdateSaleRequestSchema = SaleSchema
export const UpdateSaleResponseSchema = z.union([SaleSchema, ErrorResponseSchema])
export type UpdateSaleResponse = z.infer<typeof UpdateSaleResponseSchema>
export type UpdateSaleRequest = z.infer<typeof UpdateSaleRequestSchema>


//delete sale
export const DeleteSaleResponseSchema = z.union([
    z.object({
        "message": z.string(),
        "saleId": z.string()
    }),
    ErrorResponseSchema
])
export type DeleteSaleResponse = z.infer<typeof DeleteSaleResponseSchema>