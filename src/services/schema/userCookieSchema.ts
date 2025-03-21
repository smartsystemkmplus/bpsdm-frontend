import { z } from 'zod';

export const userCookieSchema = z.object({
  user_id: z.number().optional(),
  uid: z.string().optional(),
  email: z.string().optional(),
  role_code: z.array(z.union([z.string(), z.null()])),
  employee: z
    .object({
      employee_id: z.number().optional(),
      employee_number: z.string().optional().nullable(),
      name: z.string().optional(),
      group: z
        .object({
          group_id: z.number().optional(),
          name: z.string().optional(),
        })
        .optional(),
      profile_picture: z.string().optional(),
      position_name: z.string().optional(),
    })
    .optional(),
  expire_token: z.number().optional(),
});

export type UserCookieType = z.infer<typeof userCookieSchema>;
