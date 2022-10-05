export default function getEorr(error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.response;
}
