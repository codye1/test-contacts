import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn`);
      return headers;
    },
  }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: `/contacts`,
        params: {
          sort: 'created:desc',
        },
      }),
      providesTags: (result) =>
        result?.resources
          ? [
              ...result.resources.map(({ id }) => ({ type: 'Contact', id })),
              { type: 'Contact', id: 'LIST' },
            ]
          : [{ type: 'Contact', id: 'LIST' }],
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: '/contact',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
    }),
    getContactById: builder.query({
      query: (id) => ({
        url: `/contact/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),
    addTag: builder.mutation({
      query: ({ id, tags }) => ({
        url: `/contacts/${id}/tags`,
        method: 'PUT',
        body: {
          tags: tags,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Contact', id }],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactByIdQuery,
  useAddTagMutation,
} = contactsApi;
