import ContactId from '../pages/ContactId';
import Contacts from '../pages/Contacts';

export const routPages = [
  { path: '', element: Contacts, exact: true },
  { path: '/contact/:id', element: ContactId, exact: true },
];
