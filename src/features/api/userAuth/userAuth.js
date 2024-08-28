import { api } from "../api";


const userAuth = api.injectEndpoints({

    endpoints: (builder) => ({
        Register: builder.mutation({
            query: (values) => ({
                url: '/v1/auth/register',
                method: 'POST',
                body: values,
            }),

        }),
        Login: builder.mutation({
            query: (values) => ({
                url: '/v1/auth/login',
                method: 'POST',
                body: values,
            }),

        }),

    }),
});

export const { useRegisterMutation, useLoginMutation } = userAuth;

