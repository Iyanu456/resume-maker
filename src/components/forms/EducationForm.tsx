import { useState, useEffect } from "react";
import InputLabel from "../InputLabel";

interface EducationFormProps {
  formStyle: string;
  index: any; // Unique index to identify the form
  data: {
    school: string;
    degree: string;
    duration: string;
  };
  onSave: (field: string, index: number, data: any) => any;
  debounceTime: number;
}

const EducationForm: React.FC<EducationFormProps> = (props) => {
  const { index, data } = props;
  const [educationData, setEducationData] = useState(data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave('education', index, educationData);
    }, props.debounceTime); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when educationData changes
    return () => clearTimeout(timeoutId);
  }, [educationData, index, props]);

  const handleInputChange = (field: string, value: string) => {
    setEducationData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
    
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <InputLabel
          label="School"
          type="text"
          value={educationData.school}
          handleChange={(e) => {
            handleInputChange("school", e.target.value);
          }}
        />
          <InputLabel
            label="Degree"
            type="text"
            value={educationData.degree}
            handleChange={(e) => {
              handleInputChange("degree", e.target.value);
            }}
          />
          <InputLabel
            label="Duration"
            type="text"
            value={educationData.duration}
            handleChange={(e) => {
              handleInputChange("duration", e.target.value);
            }}
          />
      </div>
    </form>
    </>
  );
};

export default EducationForm
