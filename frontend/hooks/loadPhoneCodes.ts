import { countryPhoneCodesArray } from "@/lib/phoneCodes";

const formatedPhoneCodes = countryPhoneCodesArray.map((code) => ({
  value: code.phoneCode,
  label: code.phoneCode,
  countryCode: code.code,
}));

const usePhoneCodes = () => {
  const getAll = () => formatedPhoneCodes;

  const getByValue = (value: string) => {
    return formatedPhoneCodes.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default usePhoneCodes;
