import React from "react";
import Select from "react-select";
import Image from "next/image";
import usePhoneCodes from "@/hooks/loadPhoneCodes";

const styles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: 6,
    border: "1px solid rgb(229 231 235)",
    boxShadow: "none",
    height: 30,
    "&:hover": {
      borderColor: "#8B5CF6",
    },
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3182CE" : "#FFFFFF",
    color: state.isSelected ? "#FFFFFF" : "#1A202C",
    padding: 10,
    borderRadius: 8,
    fontSize: "0.9rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected ? "#3182CE" : "#8B5CF6",
      color: "#FFFFFF",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 8,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  }),
  menuList: (provided: any) => ({
    ...provided,
    "&::-webkit-scrollbar": {
      width: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bbabdb",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#F3F4F6",
    },
  }),
};

export type PhoneSelectValue = {
  value: string;
  label: string;
  countryCode: string;
};

interface PhoneSelectProps {
  value?: PhoneSelectValue;
  onChange: (value: PhoneSelectValue) => void;
}

const PhoneSelect: React.FC<PhoneSelectProps> = ({ value, onChange }) => {
  const { getAll } = usePhoneCodes();
  return (
    <div className="w-[170px]">
      <Select
        placeholder="Code"
        isClearable
        options={getAll()}
        styles={styles}
        value={value}
        onChange={(value) => onChange(value as PhoneSelectValue)}
        formatOptionLabel={(option) => (
          <div className="flex items-center gap-3">
            <Image
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option.countryCode}.svg`}
              alt={`${option.countryCode}`}
              width={20}
              height={20}
            />
            <div>{option.label}</div>
          </div>
        )}
      />
    </div>
  );
};

export default PhoneSelect;
