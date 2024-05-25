import Medusa from "@medusajs/medusa-js"

export const medusaClient = new Medusa({ baseUrl: `${process.env.NEXT_PUBLIC_MEDUSA_API}`, maxRetries: 3 })