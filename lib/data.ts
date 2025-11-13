"use server";

import sql from "./db";
import { Server } from "@/lib/definitions";

const ITEMS_PER_PAGE = 6;

export async function getServerCount(query: string) {
  try {
    const servers = await sql`SELECT COUNT(*)
                                  FROM SERVER_INFO S
                                  WHERE S.IP ILIKE ${`%${query}%`}
                                     OR S.HOSTNAME ILIKE ${`%${query}%`} `;
    return Math.ceil(Number(servers[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the server.");
  }
}

export async function getServers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    return await sql<Server[]>`
            SELECT s.id,
                   s.ip,
                   s.hostname,
                   s.access_port,
                   s.cpu_percent,
                   s.cpu_count,
                   s.memory_percent,
                   s.memory_total,
                   s.disk_usage,
                   s.updated_on
            FROM server_info s

            WHERE s.ip ILIKE ${`%${query}%`}
               OR
                s.hostname ILIKE ${`%${query}%`}
            ORDER BY s.hostname ASC
                LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}

        `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch servers.");
  }
}

export async function getServer(id: string) {
  try {
    const servers = await sql<Server[]>`
            SELECT s.id,
                   s.ip,
                   s.hostname,
                   s.access_port,
                   s.cpu_percent,
                   s.cpu_count,
                   s.memory_percent,
                   s.memory_total,
                   s.disk_usage,
                   s.updated_on
            FROM server_info s
            WHERE s.id = ${id}
        `;
    return servers[0] ?? null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the server.");
  }
}
