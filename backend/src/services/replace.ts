import * as prisma from "../services/prisma";
import { activities, users } from "@prisma/client";

type ReplaceUser = (
  conn: ReturnType<typeof prisma.connect>,
  activity: activities,
  mapUser: string[]
) => Promise<Array<users>>;

export const replaceUsers: ReplaceUser = async (conn, activity, mapUser) => {
  const users: Array<users> = [];

  mapUser.forEach((user) => {
    (async () => {
      switch (user) {
        case "${coordinator}":
          users.push(
            await conn.users.findFirst({
              where: {
                role: "coordinator",
              },
            })
          );
          break;
        case "${student}":
          users.push(
            await conn.users.findFirst({
              where: {
                id: activity.user_id,
              },
            })
          );
          break;
        case "${masterminds}":
          users.push(
            ...(await conn.users.findMany({
              where: {
                teachers: {
                  some: {
                    activitiesTeachers: {
                      some: {
                        activity: {
                          id: activity.id,
                        },
                      },
                    },
                  },
                },
              },
            }))
          );
          break;
        default:
          users.push(
            await conn.users.findFirst({
              where: {
                id: user,
              },
            })
          );
          break;
      }
    })();
  });

  return users;
};
