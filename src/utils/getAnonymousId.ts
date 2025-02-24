import { v4 as uuidv4 } from 'uuid';

export default function getAnonymousId() {
  let anonymousId = localStorage.getItem('anonymous_id');
  if (!anonymousId) {
    anonymousId = uuidv4(); // Generate new unique ID
    localStorage.setItem('anonymous_id', anonymousId);
  }
  return anonymousId;
}
