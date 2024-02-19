import { Styles } from "react-select";

export const customStyles: Styles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: 8,
    border: "1px solid #CBD5E0",
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
    "&:hover": {
      backgroundColor: "#8B5CF6",
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
