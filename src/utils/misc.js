export const randomID = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text
}

//get this working juan day
export const handleRequest = (props) => dispatch => {
  const request = props.request
    request(props.payload)
    .then(response => dispatch(props.onSuccess(response)))
    .catch(error => dispatch(props.onFail(error)));
}
