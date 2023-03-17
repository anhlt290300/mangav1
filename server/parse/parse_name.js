const convert_param = (param) => {
  const page = "https://www.nettruyenvt.com/";
  const result = param.replace(page, "");
  return result;
};

module.exports = convert_param;
