import auth from '@configs/firebase';
import {
  confirmPasswordReset,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const setNewPassword = (actionCode: string, newPassword: string) => {
  return confirmPasswordReset(auth, actionCode, newPassword);
};

export { login, setNewPassword };
