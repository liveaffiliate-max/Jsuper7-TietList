import { google } from "googleapis";

export async function POST(req) {
  try {

    const { username, password } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "admin_login!A:B",
    });

    const rows = response.data.values || [];

    // หา admin ที่ username / password ตรงกัน
    const admin = rows.find(
      (row) => row[0] === username && row[1] === password
    );

    if (!admin) {
      return Response.json({
        success: false,
        message: "username หรือ password ไม่ถูกต้อง",
      });
    }

    return Response.json({
      success: true,
      username: admin[0],
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      error: "server error",
    });

  }
}