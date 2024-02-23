import React, { ChangeEvent, useState, useEffect } from "react";
import InputLabel from "./InputLabel";

interface dataProps {
  formStyle?: string;
  index: any; // Unique index to identify the form
  data: {
    skill: string;
  };
  title?: string;
  onSave: (index: number, data: any) => void;
}

const customForm: React.FC<dataProps> = (props) => {
  const { index, data } = props;
  const [customData, setCustomData] = useState(data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave(index, customData);
    }, 500); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when educationData changes
    return () => clearTimeout(timeoutId);
  }, [customData, index, props]);

  const handleInputChange = (field: string, value: string) => {
    setCustomData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
    <h1 className="section-title"><b>{props.title}</b></h1>
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <InputLabel
          label="School"
          type="text"
          value={customData.skill}
          handleChange={(e) => {
            handleInputChange("school", e.target.value);
          }}
          />
      </div>
    </form>
    </>
  );
};

export default customForm;
