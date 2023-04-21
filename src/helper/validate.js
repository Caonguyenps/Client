const validatePhoneNumber = (phoneNumber) => {
  let errMsg = "";
  const checkPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
    phoneNumber
  );
  if (checkPhone) {
    errMsg = "";
  } else {
    errMsg = "invalid phone number";
  }
  return errMsg;
};

const validateEmail = (email) => {
  let errMsg = "";
  const checkEmail = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (checkEmail) {
    errMsg = "";
  } else {
    errMsg = "Invalid email";
  }
  return errMsg;
};

const validateString = (name, string) => {
  let errMsg = "";
  const checkString =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u.test(
      string
    );
  if (checkString) {
    errMsg = "";
  } else {
    if (name == "fullName") {
      errMsg = "First and last name is not in the correct format";
    } else {
      errMsg = "The address is not in the correct format";
    }
  }
  return errMsg;
};

const validateConfirmPassword = (value, password) => {
  let errMsg = "";
  if (value === password) {
    errMsg = "";
  } else {
    errMsg = "Confirm password does not match";
  }
  return errMsg;
};

module.exports = {
  validatePhoneNumber: validatePhoneNumber,
  validateEmail: validateEmail,
  validateString: validateString,
  validateConfirmPassword: validateConfirmPassword,
};
