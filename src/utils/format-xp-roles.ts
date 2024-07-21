import memoizee from "memoizee";
import { env } from "../env";

type Role = {
  id: string;
  level: number;
  requiredXp: number;
};

export const formatXpRoles = memoizee(() =>
  env.EXPERIENCE_ROLES.reduce((roles: Role[], roleId, idx) => {
    const role = {
      id: roleId,
      level: idx + 1,
      requiredXp: 200 * Math.pow(3, idx)
    } as const;

    roles.push(role);

    return roles;
  }, [])
);
