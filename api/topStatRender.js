import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "11Hyx820ZLDsGnpr5EtJt4zPSFMNS2Y6j2Nz9En4xJ8w"; // from the sheet’s URL
    const range = "Sheet1!A1:D10"; // adjust to your range

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.status(200).json({ data: response.data.values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
