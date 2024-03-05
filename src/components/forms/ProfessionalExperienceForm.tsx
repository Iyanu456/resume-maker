import { useState, useEffect } from "react";
import InputLabel from "../InputLabel";

interface formProps {
  formStyle: string;
  index: any; // Unique index to identify the form
  data: {
    jobTitle: string;
    company: string;
    duration: string;
    description: string;
  };
  onSave: (field: string, index: number, data: any) => any;
  debounceTime: number;
}

const ExperienceForm: React.FC<formProps> = (props) => {
  const { index, data } = props;
  const [experienceData, setExperienceData] = useState(data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave('experience', index, experienceData);
    }, props.debounceTime); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when experienceData changes
    return () => clearTimeout(timeoutId);
  }, [experienceData, index, props]);

  const handleInputChange = (field: string, value: string) => {
    setExperienceData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <InputLabel
          label="Job Title"
          type="text"
          value={experienceData.jobTitle}
          handleChange={(e) => {
            handleInputChange("jobTitle", e.target.value);
          }}
        />
          <InputLabel
            label="Company"
            type="text"
            value={experienceData.company}
            handleChange={(e) => {
              handleInputChange("company", e.target.value);
            }}
          />
          <InputLabel
            label="duration"
            type="text"
            value={experienceData.duration}
            handleChange={(e) => {
              handleInputChange("duration", e.target.value);
            }}
            />
          <InputLabel
            label="description"
            type="text"
            value={experienceData.description}
            handleChange={(e) => {
              handleInputChange("description", e.target.value);
            }}
          />
      </div>
    </form>
    </>
  );
};

export default ExperienceForm
