export function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  hour = (hour>10) ? hour : ('0'+hour)
  var min = a.getMinutes();
  min = (min>10) ? min : ('0'+min)
  var sec = a.getSeconds();
  var time = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + min;
  return time;
}
// export const slugifyPostTitle = title =>
//   slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@?]/g });
export const randomID = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text
}
