import { neon } from "@netlify/neon";

export const handler = async (event: any) => {
  try {
    const sql = neon();

    // POST 요청이면 카운터 증가
    if (event.httpMethod === "POST") {
      await sql`UPDATE counter SET value = value + 1 WHERE name = 'participants'`;
    }

    // 현재 값 조회
    const [row] = await sql`SELECT value FROM counter WHERE name = 'participants'`;

    return {
      statusCode: 200,
      body: JSON.stringify({ count: row.value }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
