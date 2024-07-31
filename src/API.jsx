import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn`);
      return headers;
    },

  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url:`/contacts`,
        sort: 'created:desc'

      }),
    }),
  }),
})

export const { useGetContactsQuery } = contactsApi