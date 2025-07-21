const { google } = require('googleapis');
const GOOGLE_CREDENTIALS = './credentials.json';
const SHEET_ID = '1ArrXpTOPCoAV5gLgOLQ4LA6o0oUD6fiZSecY0E27d-w';

async function testSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: GOOGLE_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const values = [[new Date().toISOString(), 'test', 'Test', 'Test', '0', '0']];
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'RAW',
      resource: { values }
    });
    console.log('Successfully wrote to Google Sheet');
  } catch (error) {
    console.error('Error:', error);
  }
}

testSheets();