import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDoc from "./components/PDF";
import PersonalDetails from "./components/forms/PersonalDetailsForm";
import EducationForm from "./components/forms/EducationForm";
import ExperienceForm from "./components/forms/ProfessionalExperienceForm";
import PdfSection from "./components/PDFViewer";
import ProjectForm from "./components/forms/ProjectForm";
import ContactForm from "./components/forms/ContactForm";
import Accordion from "./Accordion";
import Accordion2 from "./Accordion2";
import SkillForm from "./components/forms/CustomComponent";
import "./home.css";
import Icon from "./Icon";

interface personalInfoProps {
  fullname: string;
  jobTitle: string;
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

interface ContactInfoProps {
  name: string;
  label: string;
  src: string;
}

interface RenderedProps {
  personalInfo: personalInfoProps[];
  education: EducationInfo[];
  skill: { skill: string }[];
  experience: experienceInfo[];
  project: ProjectInfo[];
  contactInfo: ContactInfoProps[];
}

export default function Home(): JSX.Element {
  const [numPages, setNumPages] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState(Number);

  function nextPage() {
    if (pageNum >= numPages) setPageNum(pageNum);
    else setPageNum(pageNum + 1);
  }

  function prevPage() {
    if (pageNum > 0 && pageNum === 1) setPageNum(pageNum);
    else setPageNum(pageNum - 1);
  }

  // State for tracking screen width
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  // Scale factor for PDF rendering
  const scaleFactor = 1.6;

  const debounceTime = 1000;

  // State for data to be rendered in the PDF
  const [pdfRenderedProps, setPdfRenderedProps] = useState<RenderedProps>({
    personalInfo: [{ fullname: "", jobTitle: "" }],
    education: [{ school: "", degree: "", duration: "" }],
    skill: [{ skill: "" }],
    experience: [{ jobTitle: "", company: "", description: "", duration: "" }],
    project: [{ project: "", about: "", description: "", duration: "" }],
    contactInfo: [{ name: "", label: "", src: "" }],
  });

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Effect to update screen width on resize
      window.removeEventListener("resize", handleResize);
    };
  });

  // Function to calculate scale based on window width
  const handleScreenResize = (): number => {
    return (screenWidth / 2300) * scaleFactor;
  };

  // Data object for rendering PDF
  const info: RenderedProps = {
    education: pdfRenderedProps.education,
    skill: pdfRenderedProps.skill,
    experience: pdfRenderedProps.experience,
    project: pdfRenderedProps.project,
    contactInfo: pdfRenderedProps.contactInfo,
    personalInfo: pdfRenderedProps.personalInfo,
  };

  // Function to save data for a specific field and index
  const handleDataSave = (field: string, index: number, data: any) => {
    setPdfRenderedProps((prevProps: any) => {
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
    setPdfRenderedProps((prevProps: any) => {
      const newItemArray = [...prevProps[field], { ...defaultObject }];

      return {
        ...prevProps,
        [field]: newItemArray,
      };
    });
  };

  const accordionData = [
    {
      title: "Personal Details",
      content: pdfRenderedProps.personalInfo.map((data, index) => (
        <PersonalDetails
          debounceTime={debounceTime}
          key={index}
          index={index}
          data={data}
          onSave={handleDataSave}
        />
      )),
    },
    {
      title: "Contact Info",
      content: (
        <>
          <Accordion2
            accordionData={pdfRenderedProps.contactInfo.map((data, index) => ({
              title: `Contact Info ${index + 1}`,
              content: (
                <ContactForm
                  formStyle=""
                  index={index}
                  data={data}
                  onSave={handleDataSave}
                  debounceTime={debounceTime}
                />
              ),
            }))}
            onAdd={handleAddItem}
            field="contactInfo"
            defaultObject={{ name: "", label: "", src: "" }}
          />
        </>
      ),
    },
    {
      title: "Education",
      content: (
        <>
          <Accordion2
            accordionData={pdfRenderedProps.education.map((data, index) => ({
              title: `Education ${index + 1}`,
              content: (
                <EducationForm
                  formStyle=""
                  index={index}
                  data={data}
                  onSave={handleDataSave}
                  debounceTime={debounceTime}
                />
              ),
            }))}
            onAdd={handleAddItem}
            field="education"
            defaultObject={{
              school: "",
              degree: "",
              duration: "",
            }}
          />
        </>
      ),
    },

    {
      title: "Skills",
      content: (
        <>
          <Accordion2
            accordionData={pdfRenderedProps.skill.map((data, index) => ({
              title: `Skill ${index + 1}`,
              content: (
                <SkillForm
                  formStyle=""
                  index={index}
                  data={data}
                  onSave={handleDataSave}
                  debounceTime={debounceTime}
                />
              ),
            }))}
            onAdd={handleAddItem}
            field="skill"
            defaultObject={{ skill: "" }}
          />
        </>
      ),
    },
    {
      title: "Professional Experience",
      content: (
        <>
          <Accordion2
            accordionData={pdfRenderedProps.experience.map((data, index) => ({
              title: `Professional Experience ${index + 1}`,
              content: (
                <ExperienceForm
                  formStyle=""
                  index={index}
                  data={data}
                  onSave={handleDataSave}
                  debounceTime={debounceTime}
                />
              ),
            }))}
            onAdd={handleAddItem}
            field="experience"
            defaultObject={{
              jobTitle: "",
              company: "",
              description: "",
              duration: "",
            }}
          />
        </>
      ),
    },
    {
      title: "Projects",
      content: (
        <>
          <Accordion2
            accordionData={pdfRenderedProps.project.map((data, index) => ({
              title: `Project ${index + 1}`,
              content: (
                <ProjectForm
                  formStyle=""
                  index={index}
                  data={data}
                  onSave={handleDataSave}
                  debounceTime={debounceTime}
                />
              ),
            }))}
            onAdd={handleAddItem}
            field="project"
            defaultObject={{
              project: "",
              about: "",
              description: "",
              duration: "",
            }}
          />
        </>
      ),
    },
  ];

  // JSX for rendering the main component
  return (
    <div className="relative h-[100vh] overflow-y-hidden">
      {/* Navigation */}
      <div className="nav flex py-[1.2em] px-[2em] relative z-20 top-0 bottom-auto">
        <b>Sketch.cv</b>
      </div>

      {/* Main content */}
      <div className="home flex flex-wrap justify-center center-align h-[100%] px-[1em] pt-[2em]">
        <div className="flex flex-col gap-2 h-[100%] overflow-y-hidden bg-grey md:pr-[1em]">
          <div className="form-section w-[100%] md:min-w-[400px] relative rounded-[0.75em] overflow-x-hidden">
            <div className="flex px-[1.2em] py-[1.6em] w-[100%] bg-white border-[1px] rounded-[0.6em] sticky top-0 z-30 shadow-lg">
              <h2 className="my-auto">
                <b>Resume</b>
              </h2>
              <PDFDownloadLink
                className="ml-auto mr-0 my-auto btn-primary"
                document={<MyDoc info={info} />}
                fileName="resume.pdf"
              >
                Download
              </PDFDownloadLink>
            </div>
            <Accordion accordionData={accordionData} />
          </div>
        </div>

        {/* PDF Section */}

        <div className="w-auto flex flex-col bg-white justify-center center-align w-[max-content] h-[100%] overflow-y-hidden px-[1.5em] pb-[2.4em] rounded-[0.75em] desktop">
        <div className="grid w-[fit-content] h-[fit-content] sticky mx-auto mt-4 mb-4">
        <div className="flex  m-auto rounded-3 ml-4 border-2 rounded-[0.75em]">
              <Icon
                onClick={() => prevPage()}
                src="arrow-right-3.svg"
                className="m-auto p-2 rotate-180"
              />
              <div className="flex m-auto gap-2 text-sm">
                <p className="pl-1 ">{pageNum}</p> <p>/</p> <p className="pr-1">{numPages}</p> 
              </div>
              <Icon
                onClick={() => nextPage()}
                src="arrow-right-3.svg"
                className="m-auto p-2"
              />
        </div>
        </div>
          <div className="m-auto grid place-items-center w-[fit-content] h-[fit-content] overflow-y-scroll">
            <PdfSection
              className="m-auto"
              handleScreenResize={handleScreenResize}
              info={info}
              scaleFactor={scaleFactor}
              numPages={numPages}
              pageNum={pageNum}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onRenderSuccess={() => setRenderedPageNumber(pageNum)}
            />
          </div>
        </div>

        
      </div>
    </div>
  );
}
