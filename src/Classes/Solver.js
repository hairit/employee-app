function formatCurrency(nationID, style, typeCurrency, number) {
  return Intl.NumberFormat(nationID, {
    style: style,
    currency: typeCurrency,
  }).format(number);
}
function getDateFormat(dateString) {
  var date = new Date(dateString);
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  return dd + "-" + mm + "-" + yyyy;
}

export { formatCurrency, getDateFormat };
