// app/actions.ts
'use server'
import { getSheetsClient } from '../lib/googleSheets';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// READ DATA
export async function getSheetData() {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'santri!A1:A5', // Adjust range as needed
  });
  return response.data.values;
}

// WRITE DATA (Append)
export async function appendToSheet(formData: string[]) {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [formData],
    },
  });
}