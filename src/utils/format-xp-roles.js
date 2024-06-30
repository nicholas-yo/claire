import memoizee from "memoizee";
import { env } from "../env.js";

/**
 * @description Represents a role with associated properties.
 * @typedef {object} Role
 * @property {string} id - The ID of the role.
 * @property {number} level - The level associated with the role.
 * @property {number} requiredXp - The required XP for achieving this role.
 */

export const formatXpRoles = memoizee(() =>
  env.EXPERIENCE_ROLES.reduce((/** @type {Role[]} */ roles, roleId, idx) => {
    const role = /** @type {const} */ ({
      id: roleId,
      level: idx + 1,
      requiredXp: 200 * Math.pow(3, idx)
    });

    roles.push(role);

    return roles;
  }, [])
);
