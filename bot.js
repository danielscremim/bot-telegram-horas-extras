const botToken = '5334464362:AAEzXA9pa9cqfqXu4MXy-OezIZSNE30XPS4';
const sheetId = '1NbPgOBz1ITetyfpuXY4p5e0YCNnSphHtk4Bz-ZzCHuE';
const googleWebAppURL = 'https://script.google.com/macros/s/AKfycbyVa59JhrOFEGzdGwKBUWZ2JpCz0kd-0vF4RfOYPmHKqGya4l4iGgZdAtiLkaBapd5YWw/exec'

function setWebhook() {
  const url = 'https://api.telegram.org/bot' + botToken + '/setWebhook?url=' + googleWebAppURL;
  const response = UrlFetchApp.fetch(url);
  console.log(response.getContentText());
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  sheet.appendRow([new Date(), JSON.stringify(data), data.message.text])

  const respostaDoRobo = 'Olá, recebi a sua mensagem:\n\n ' + data.message.text;

  const url = 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + data.message.chat.id + '&text=' + encodeURIComponent(respostaDoRobo);

  const response = UrlFetchApp.fetch(url);
}
