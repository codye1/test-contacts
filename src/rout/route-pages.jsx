import ContactId from "../pages/ContactId";
import Contacts from "../pages/Contacts";

export const routPages = [
  { path: '/contacts', element: Contacts, exact: true },
  { path: '/contacts/:id', element: ContactId, exact: true },
];
