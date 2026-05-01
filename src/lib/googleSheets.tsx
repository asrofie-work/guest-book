// lib/googleSheets.ts
import { google } from 'googleapis';

export const getSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

export async function postData(sheetName: string, data: any) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: sheetName + "!A:B",
  });
  const rowNum = (response.data.values?.length || 0) + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: sheetName + "!A" + rowNum,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.name]],
    },
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: sheetName + "!B" + rowNum,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.jilid]],
    },
  });
  const now = new Date();
  const rawDate = now.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  // 1/5/2026, 20.20.55 -> 2026-01-05 20:20:55
  const [month, day, year] = rawDate.split(',')[0].split('/');
  const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  const time = rawDate.split(',')[1].trim().replace('.', ':').replace('.', ':');
  const formattedDate = `${date} ${time}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: sheetName + "!C" + rowNum,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[formattedDate]],
    },
  });
}
