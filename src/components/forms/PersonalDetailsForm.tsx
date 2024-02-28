import { useEffect, useState } from "react";
import InputLabel from "../InputLabel";

interface personalProps {
  index: any;
  formStyle?: string;
  data: { fullname: string; jobTitle: string };
  onSave: (field: string, index: number, data: any) => any;
  debounceTime: number;
}

export default function PersonalDetails(props: personalProps) {
  const [personalData, setPersonalData] = useState(props.data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave("personalInfo", props.index, personalData);
    }, props.debounceTime); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when contactData changes
    return () => clearTimeout(timeoutId);
  }, [personalData, props.index, props]);

  const handleInputChange = (field: string, value: string) => {
    setPersonalData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <InputLabel
          label="Full Name"
          type="text"
          value={personalData.fullname}
          handleChange={(e) => {
            handleInputChange("fullname", e.target.value);
          }}
        />

        <InputLabel
          label="Job Title"
          type="text"
          value={personalData.jobTitle}
          handleChange={(e) => {
            handleInputChange("jobTitle", e.target.value);
          }}
        />
      </div>
    </form>
  );
}
