import type { NextApiRequest, NextApiResponse } from 'next'
import { postData } from "@/lib/googleSheets";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

type ResponseData = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const name = req.query.name;
  const jilid = req.query.jilid;
  await postData('absensi', { name, jilid });
  res.status(200).json({ data: "success" })
}