import {z} from "zod";

export const moveType = z.object({
    from: z.string(),
    to: z.string()
});