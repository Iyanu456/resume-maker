import React, { ChangeEvent, useState, useEffect, useCallback } from "react";
import PersonalDetails from "./components/forms/PersonalDetailsForm";
import EducationForm from "./components/forms/EducationForm";
import CustomForm from "./components/CustomComponent";
import ExperienceForm from "./components/forms/ProfessionalExperienceForm";
import PdfSection from "./components/PDFViewer";
import ProjectForm from "./components/forms/ProjectForm";
import "./home.css";

// Define types for user input and PDF rendering data
interface UserInfo {
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  phoneNo: string;
}

interface EducationInfo {
  school: string;
  degree: string;
  duration: string;
}

interface experienceInfo {
  jobTitle: string;
  company: string;
  description: string;
  duration: string;
}

interface ProjectInfo {
    project: string;
    about: string;
    description: string;
    duration: string;
  }

interface RenderedProps {
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  phoneNo: string;
  education: EducationInfo[];
  skill: { skill: string }[];
  experience: experienceInfo[];
  project: ProjectInfo[];
}

export default function Home(): JSX.Element {
  // State for user input displayed in the form
  const [userDisplayedInfo, setUserDisplayedInfo] = useState<UserInfo>({
    firstname: "",
    lastname: "",
    title: "Web Developer",
    email: "",
    phoneNo: "",
  });

  // State for data to be rendered in the PDF
  const [pdfRenderedProps, setPdfRenderedProps] = useState<RenderedProps>({
    firstname: "",
    lastname: "",
    title: "",
    email: "",
    phoneNo: "",
    education: [
      {
        school: "",
        degree: "",
        duration: "",
      },
    ],
    skill: [{ skill: "" }],

    experience: [{ jobTitle: "", company: "", description: "", duration: "" }],
    project: [{ project: "", about: "", description: "", duration: "" }],
  });

  // State for tracking screen width
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  // State for tracking resize timeout
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Scale factor for PDF rendering
  const scaleFactor = 1.6;

  // Effect to update screen width on resize
  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Function to calculate scale based on window width
  const handleScreenResize = (): number => {
    return (screenWidth / 2300) * scaleFactor;
  };

  // Data object for rendering PDF
  const info: RenderedProps = {
    firstname: pdfRenderedProps.firstname,
    lastname: pdfRenderedProps.lastname,
    title: pdfRenderedProps.title,
    email: pdfRenderedProps.email,
    phoneNo: pdfRenderedProps.phoneNo,
    education: pdfRenderedProps.education,
    skill: pdfRenderedProps.skill,
    experience: pdfRenderedProps.experience,
    project: pdfRenderedProps.project,
  };

  // Function to handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof UserInfo
  ): void => {
    const value = e.target.value;
    setUserDisplayedInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));

    // Clear the existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout for delayed update to pdfRenderedProps
    const newTimeoutId = setTimeout(() => {
      setPdfRenderedProps((prevUserInfo) => ({
        ...prevUserInfo,
        [field]: value,
      }));
    }, 850); // Set your desired delay in milliseconds

    // Update the state with the new timeout ID
    setTimeoutId(newTimeoutId);
  };

  // Function to save data for a specific field and index
  const handleDataSave = (
    field: "education" | "skill",
    index: number,
    data: any
  ) => {
    setPdfRenderedProps((prevProps) => {
      const newArray = [...prevProps[field]];
      newArray[index] = data;

      return {
        ...prevProps,
        [field]: newArray,
      };
    });
  };

  // Function to add a new form and corresponding education object
  const handleAddItem = (field: string, defaultObject?: any) => {
    setPdfRenderedProps((prevProps) => {
      const newItemArray = [...prevProps[field], { ...defaultObject }];

      return {
        ...prevProps,
        [field]: newItemArray,
      };
    });

    const currentItem =
      pdfRenderedProps[field][pdfRenderedProps[field].length - 1];
    const isCurrentItemBlank = Object.values(currentItem).every(
      (value) => value === ""
    );
    if (currentItem && !isCurrentItemBlank) handleAddData(field, defaultObject);
  };

  // Function to add new data based on the current item
  const handleAddData = (field: string) => {
    // Check if the current item has any non-empty values
    const currentItem =
      pdfRenderedProps[field][pdfRenderedProps[field].length - 1];
    const isCurrentItemBlank = Object.values(currentItem).every(
      (value) => value === ""
    );

    if (!isCurrentItemBlank) {
      handleAddItem(field);
    }
  };

  // Render EducationForm components based on the pdfRenderedProps
  const educationForms = pdfRenderedProps.education.map((data, index) => (
    <EducationForm
      key={index}
      formStyle=""
      index={index}
      data={data}
      onSave={handleDataSave}
    />
  ));

  // Render CustomForm components based on the pdfRenderedProps
  const customForm = pdfRenderedProps.skill.map((data, index) => (
    <CustomForm
      key={index}
      formStyle=""
      index={index}
      data={data}
      onSave={handleDataSave}
    />
  ));

  const experienceForm = pdfRenderedProps.experience.map((data, index) => (
    <ExperienceForm
      key={index}
      formStyle=""
      index={index}
      data={data}
      onSave={handleDataSave}
    />
  ));

  const projectForm = pdfRenderedProps.project.map((data, index) => (
    <ProjectForm
      key={index}
      formStyle=""
      index={index}
      data={data}
      onSave={handleDataSave}
    />
  ));

  // JSX for rendering the main component
  return (
    <div className="relative h-[100vh] overflow-y-hidden">
      {/* Navigation */}
      <div className="nav flex py-[1.2em] px-[2em] relative z-20 top-0 bottom-auto">
        <b>Sketch.cv</b>
      </div>

      {/* Main content */}
      <div className="home flex flex-wrap gap-[1.3em] justify-center center-align h-[100%] px-[2em] pt-[2em]">
        <div className="flex flex-col gap-2 h-[100%] overflow-y-hidden bg-grey">
          {/* Form Section */}
          <div className="form-section min-w-[400px] relative rounded-[0.75em]">
            {/* Form Header */}
            <div className="px-[1.2em] py-[1.6em] w-[400px] bg-white rounded-[0.6em] sticky top-0 z-20 shadow-lg">
              <b>Resume</b>
            </div>

            {/* Personal Details Form */}
            <PersonalDetails
              formStyle="form-card pb-[1em]"
              onFirstNameChange={(e) => handleChange(e, "firstname")}
              onLastNameChange={(e) => handleChange(e, "lastname")}
            />

            {/* Education Forms */}
            <div className="form-card">
              {educationForms}
              {/*<button onClick={() => { handleAddItem('education', { school: '', degree: '', duration: '' }) }}>Add Education</button>*/}
            </div>

            {/* Custom Forms */}
            <div className="form-card">
              {customForm}
            </div>

            {/* Additional Form Cards */}
            <div className="form-card">
                {experienceForm}
            </div>
            <div className="form-card">
                {projectForm}
            </div>
          </div>
        </div>

        {/* PDF Section */}
        <div className="w-auto flex flex-col justify-center center-align w-[max-content] h-[100%] overflow-y-hidden bg-white px-[1.5em] pb-[2.4em] rounded-[0.75em] shadow-md desktop">
          <div className="m-auto grid place-items-center w-[fit-content] h-[fit-content] overflow-y-scroll">
            <PdfSection
              className=" pt-[2em] m-auto"
              handleScreenResize={handleScreenResize}
              info={info}
              scaleFactor={scaleFactor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
