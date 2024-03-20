import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, View, Document, Text } from '@react-pdf/renderer';
import  { pdfjs } from 'react-pdf'
import MyDoc from "./components/PDF";
import PersonalDetails from "./components/forms/PersonalDetailsForm";
import EducationForm from "./components/forms/EducationForm";
import ExperienceForm from "./components/forms/ProfessionalExperienceForm";
import ProjectForm from "./components/forms/ProjectForm";
import ContactForm from "./components/forms/ContactForm";
import Accordion from "./components/Accordion";
import Accordion2 from "./Accordion2";
import SkillForm from "./components/forms/SkillForm";
import "./home.css";
import Icon from "./Icon";
import PDFViewer from "./components/PDFViewer";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

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
  //const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //const [renderedPageNumber, setRenderedPageNumber] = useState(Number);

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

  
  const handleDeleteItem = (field: string, index: number) => {
    if (index === 0) {
      // Do not allow deletion of the first item
      return;
    }
  
    setPdfRenderedProps((prevProps: any) => {
      const newArray = [...prevProps[field]];
      newArray.splice(index, 1);
      //handleAccordionClick(index);
      //setActiveIndex(null);
      //console.log(newArray)
      
  
      return {
        ...prevProps,
        [field]: newArray,
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
            onDelete={handleDeleteItem}
            //onAccordionClose={handleAccordionClose}
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

// Mapping array for React components to DOM elements
const validDomItem = [
  ['Document', 'div'],
  ['Page', 'div'],
  ['Text', 'p'],
];

// Function to convert React component tree to HTML
const convertToHTML = (element) => {
  if (!element) {
    return null;
  }

  const { type, props } = element;
  const children = React.Children.map(props.children, convertToHTML);

  const mapping = validDomItem.find(([reactType]) => reactType === type);

  if (mapping) {
    const [reactType, domType] = mapping;
    const htmlElement = document.createElement(domType);

    for (const prop in props) {
      if (prop !== 'children' && props.hasOwnProperty(prop)) {
        htmlElement[prop] = props[prop];
      }
    }

    children.forEach((child) => {
      if (child) {
        htmlElement.appendChild(child);
      }
    });

    return htmlElement;
  }

  // Fallback for unknown components
  if (typeof type === 'string') {
    const fallbackElement = document.createElement('div');
    fallbackElement.innerHTML = `Unknown component: ${type}`;
    return fallbackElement;
  }

  // Fallback for non-string types (e.g., fragments)
  if (Array.isArray(children) && children.length > 0) {
    return children.length === 1 ? children[0] : children;
  }

  return null;
};


const TestDoc = () => (
  <Document>
    <Page>
      
        <Text>Hello</Text>
    
    </Page>
  </Document>
)

// Convert the TestDoc component to HTML
const testDocHTML = convertToHTML(<TestDoc />);

// Log the HTML structure to the console if not null
if (testDocHTML) {
  console.log(testDocHTML.outerHTML || testDocHTML.innerHTML);
}

//const resumeHTML = convertToHTML(<TestDoc />);
//console.log(resumeHTML.outerHTML);
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
              <button onClick={() => console.log(testDocHTML.innerHTML)}>DOM</button>
            </div>
            <Accordion accordionData={accordionData} /*activeIndex={activeIndex} handleAccordionClick={handleAccordionClick}*//>
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
            <PDFViewer
              className="m-auto"
              handleScreenResize={handleScreenResize}
              info={info}
              scaleFactor={scaleFactor}
              numPages={numPages}
              pageNum={pageNum}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              //onRenderSuccess={() => setPageNum(pageNum)}
            />
          </div>
        </div>


      </div>
    </div>
  );
}
