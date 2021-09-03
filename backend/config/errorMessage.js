// get the errors array
// make a single message
const getErrorMessage = (error) => {
  let message = "Please provide";
  const errors = error.errors;
  if (errors.length > 0) {
    for (var i = 0; i < errors.length; i++) {
      if (i == errors.length - 1) {
        message += " " + errors[i].msg + ".";
      } else {
        message += " " + errors[i].msg + ",";
      }
    }
    return message;
  } else {
    return "";
  }
};

module.exports = getErrorMessage;
