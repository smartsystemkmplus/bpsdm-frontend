/**
 * @param {Array} roles - Roles that the user must have to access (ex: ["SA", "SBCN"])
 * @returns {Boolean} - True if the user has at least one of the roles, false otherwise
 */

import getUserCookie from './cookie';

const hasRole = (roles: string[] = []): boolean => {
  const user = getUserCookie();
  if (!user) return false;

  const userRoles = user.role_code as string[];
  return userRoles.some((role) => {
    return roles.includes(role);
  });
};

export default hasRole;
