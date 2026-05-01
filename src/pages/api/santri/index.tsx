import { getSheetsClient } from "@/lib/googleSheets";
import type { NextApiRequest, NextApiResponse } from 'next'

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

type ResponseData = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const sheets = await getSheetsClient();
  const responseSantri = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'santri!A2:A',
  });
  const santri = responseSantri.data.values?.map((row: any) => ({
    name: row[0],
  }));
  const responseJilid = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'santri!D2:D',
  });
  const jilid = responseJilid.data.values?.map((row: any) => ({ name: row[0] }));
  res.status(200).json({ santri, jilid })
}