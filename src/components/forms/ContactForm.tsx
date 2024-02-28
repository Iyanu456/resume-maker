import React, { ChangeEvent, useState, useEffect } from "react";
import InputLabel from "../InputLabel";

interface contactFormProps {
  formStyle: string;
  index: any; // Unique index to identify the form
  data: {
    name: string;
    label: string;
    src: string;
  };
  onSave: (field: string, index: number, data: any) => any;
  debounceTime: number;
}

const ContactForm: React.FC<contactFormProps> = (props) => {
  
  const [contactData, setcontactData] = useState(props.data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave('contactInfo', props.index, contactData);
    }, props.debounceTime); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when contactData changes
    return () => clearTimeout(timeoutId);
  }, [contactData, props.index, props]);

  const handleInputChange = (field: string, value: string) => {
    setcontactData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        
            <InputLabel
          label="Label"
          type="text"
          value={contactData.label}
          handleChange={(e) => {
            handleInputChange("label", e.target.value);
          }}
        />
          <InputLabel
            label="Link"
            type="text"
            value={contactData.src}
            handleChange={(e) => {
              handleInputChange("src", e.target.value);
            }}
          />
          {/*<InputLabel
            label="name"
            type="text"
            value={contactData.name}
            handleChange={(e) => {
              handleInputChange("name", e.target.value);          
        }}
      />*/}
      </div>
    </form>
    </>
  );
};

export default ContactForm
