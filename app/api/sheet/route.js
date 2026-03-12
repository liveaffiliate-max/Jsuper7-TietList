import { google } from "googleapis";

async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "'ลงเว็บ ยอดเดือน ก.พ.'!A:N",
  });

  const rows = response.data.values || [];

  const data = rows.slice(1).map((row) => ({
    fullname: row[1] || "",
    nickname: row[2] || "",
    phone: row[3] || "",
    line: row[4] || "",
    tiktok: row[5] || "",
    profile: row[6] || "",
    sale_uni: row[7] || "0",
    sale_exam: row[8] || "0",
    shopee: row[9] || "0",
    tier: row[10] || "",
    total_sale: row[11] || "0",
  }));

  return data;
}

/* ---------- GET (เปิดใน browser) ---------- */
export async function GET() {
  try {
    const data = await getSheetData();

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}

/* ---------- POST (ค้นหาจาก phone) ---------- */
export async function POST(req) {
  try {
    const { phone } = await req.json();

    const data = await getSheetData();

    const user = data.find((u) => u.phone === phone);

    if (!user) {
      return Response.json({ found: false });
    }

    return Response.json({
      found: true,
      ...user,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}