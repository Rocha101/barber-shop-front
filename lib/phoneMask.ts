const formatPhoneNumber = (input: string): string => {
  return input.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2");
};

export default formatPhoneNumber;
