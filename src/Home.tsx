import { useState, useEffect } from "react";
import { RegisterFont } from "./RegisteredFonts";
import { pdfjs } from "react-pdf";
import MyDoc from "./templates/template_1/Template1";
import PersonalDetails from "./components/form2/PersonalDetailsForm";
import EducationForm from "./components/form2/EducationForm";
import ExperienceForm from "./components/form2/ExperienceForm";
import ProjectForm from "./components/form2/ProjectForm";
import Accordion from "./components/Accordion";
import Accordion2 from "./components/Accordion2";
import SkillForm from "./components/form2/SkillsForm";
import Download from "./DownloadBtn";
//import Icon from "./Icon";
//import { RenderedProps } from "./types/usertypes";
import { useScaleFactor } from "./ScaleContext";
//import EditorConvertToHTML from "./TextEditor";
//import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./home.css";
//import ReactDOMServer from "react-dom/server";
//import { convertToReactPDFComponents } from "./convertToReactPdf";
//import { EditorState, convertToRaw } from 'draft-js';
//import draftToHtml from 'draftjs-to-html';

RegisterFont();

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.js",
	import.meta.url
).toString();

function convertToMilliseconds(hours: number = 0, minutes: number = 0, seconds: number = 0): number {
    const millisecondsPerHour = 60 * 60 * 1000;
    const millisecondsPerMinute = 60 * 1000;
    const millisecondsPerSecond = 1000;

    return (hours * millisecondsPerHour) + (minutes * millisecondsPerMinute) + (seconds * millisecondsPerSecond);
}

const EXPIRATION_DURATION_MS = convertToMilliseconds(6, 0, 0) // 24 hours

export default function Home(): JSX.Element {

	// State for data to be rendered in the PDF
	const [accordionActiveIndex, setAccordionActiveIndex] = useState<number | null>(null);
	const [accordion2ActiveIndex, setAccordion2ActiveIndex] = useState<number | null>(null);
	//const [isAccordion2open, setIsAccordion2Open] = useState<boolean | null>(null)
	const [pdfRenderedProps, setPdfRenderedProps] = useState(() => {
    const storedData = localStorage.getItem('pdfRenderedProps');
    if (storedData) {
      const { data, timestamp } = JSON.parse(storedData);
      if (Date.now() - timestamp <= EXPIRATION_DURATION_MS) {
        return data;
      } else {
        localStorage.removeItem('pdfRenderedProps'); // Remove expired data
      }
    }
    return {
      personalInfo: [
        { fullname: "", jobTitle: "", email: "", website: "", phone: "" },
      ],
      education: [{ school: "", degree: "", duration: "", link: "", visible: true }],
      skill: [{ skill: "", skillInformation: "", visible: true }],
      experience: [
        {
          jobTitle: "",
          company: "",
          description: "",
          duration: "",
		  link: "",
          visible: true,
        },
      ],
      project: [
        {
          project: "",
          about: "",
          description: "",
          duration: "",
		  link: "",
          visible: false,
        },
      ],
      contactInfo: [{ name: "", label: "", src: "", visible: true }],
    };
  });
	  
	const { scaleFactor } = useScaleFactor();

 useEffect(() => {
    localStorage.setItem('pdfRenderedProps', JSON.stringify({ data: pdfRenderedProps, timestamp: Date.now() }));
  }, [pdfRenderedProps]);

  // Function to handle input change
  const handleChange = (category: string,
		index: number,
		field: string,
		value: any) => {
    setPdfRenderedProps((prevData: any) => {
      const updatedData = { ...prevData };
      updatedData[category][index][field] = value;
      return updatedData;
    });
  };
	
	type ArrayKeys = keyof typeof pdfRenderedProps;

	const handleSetActiveIndex = (index: number | null | any) => {
		setAccordionActiveIndex(index);
	  };

	//toogles the visibility of an item in the list of Accordion2 component
	const toggleVisibility = (field: ArrayKeys, index: number): void => {
		setPdfRenderedProps((prevState: any) => {
			const updatedArray = prevState[field].map((item: any, i: any) => {
				if (i === index && "visible" in item) {
					return {
						...item,
						visible: !item.visible,
					};
				}
				return item;
			});
			return {
				...prevState,
				[field]: updatedArray,
			};
		});
	};

	// Function to add a new form and corresponding object
	const handleAddItem = (field: string, defaultObject?: any) => {
		setPdfRenderedProps((prevProps: any) => {
			const newItemArray = [...prevProps[field], { ...defaultObject }];

			return {
				...prevProps,
				[field]: newItemArray,
			};
		});
	};

	const handleAccordionClose = () => setAccordionActiveIndex(null)
	//deletes an item from the corresponding object
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

	function truncateText(text: string, maxLength: number) {
		if (text.length <= maxLength) {
			return text;
		} else {
			return text.substring(0, maxLength) + '...';
		}
	}

	//array usedto populate the Accordion Compnent
	//note Accordion and Accordion2 components are two different components with different functionalities
	const accordionData = [
		{
			title: "Personal Details",
			content: pdfRenderedProps.personalInfo.map((data: any, index: number) => (
				<PersonalDetails
					//debounceTime={debounceTime}
					//key={index}
					index={index}
					data={data}
					handleChange={handleChange}
					handleAccordionClose={handleAccordionClose}
					//onSave={handleDataSave}
				/>
			)),
		},
		/*{
      title: "Contact Info",
      content: (
        <>
          <Accordion2
            accordionData={pdfRenderedProps.contactInfo.map((data, index) => ({
              title: `Contact Info ${index + 1}`,
              content: (
                <ContactForm
                  //formStyle=""
                  //index={index}
                  data={data}
                  //onSave={handleDataSave}
                  //debounceTime={debounceTime}
                />
              ),
            }))}
            onAdd={handleAddItem}
            field="contactInfo"
            defaultObject={{ name: "", label: "", src: "" }}
          />
        </>
      ),
    },*/
		{
			title: "Education",
			content: (
				<>
					<Accordion2
						accordionData={pdfRenderedProps.education.map(
							(data: any, index: number) => ({
								title: `${truncateText(data.school, 24)}`,
								content: (
									<EducationForm
										//formStyle=""
										index={index}
										data={data}
										handleChange={handleChange}
										//onSave={handleDataSave}
										//debounceTime={debounceTime}
									/>
								),
								visible: data.visible,
							})
						)}
						activeIndex={accordion2ActiveIndex}
						setActiveIndex={setAccordion2ActiveIndex}
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						//onAccordionClose={handleAccordionClose}
						field="education"
						defaultObject={{
							school: "",
							degree: "",
							duration: "",
							link: "",
							visible: true,
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
						accordionData={pdfRenderedProps.skill.map(
							(data: any, index: number) => ({
								title: `${truncateText(data.skill, 24)}`,
								content: (
									<SkillForm
										//formStyle=""
										index={index}
										data={data}
										handleChange={handleChange}
										//onSave={handleDataSave}
										//debounceTime={debounceTime}
									/>
								),
								visible: data.visible,
							})
						)}
						activeIndex={accordion2ActiveIndex}
						setActiveIndex={setAccordion2ActiveIndex}
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						field="skill"
						defaultObject={{ skill: "", skillInformation: "", visible: true }}
					/>
				</>
			),
		},
		{
			title: "Professional Experience",
			content: (
				<>
					<Accordion2
						accordionData={pdfRenderedProps.experience.map(
							(data: any, index: number) => ({
								title: `${truncateText(data.jobTitle, 24)}`,
								content: (
									<ExperienceForm
										//formStyle=""
										index={index}
										data={data}
										handleChange={handleChange}
										//onSave={handleDataSave}
										//debounceTime={debounceTime}
									/>
								),
								visible: data.visible,
							})
						)}
						activeIndex={accordion2ActiveIndex}
						setActiveIndex={setAccordion2ActiveIndex}
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						field="experience"
						defaultObject={{
							jobTitle: "",
							company: "",
							description: "",
							duration: "",
							link: "",
							visible: true,
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
						accordionData={pdfRenderedProps.project.map(
							(data: any, index: number) => ({
								title: `${truncateText(data.project, 24)}`,
								content: (
									<ProjectForm
										//formStyle=""
										index={index}
										data={data}
										handleChange={handleChange}
										state={pdfRenderedProps}
										//onEditorStateChange={onEditorStateChange}
										//onToggleVisibility={}
										//onSave={handleDataSave}
										//debounceTime={debounceTime}
									/>
								),
								visible: data.visible,
							})
						)}
						activeIndex={accordion2ActiveIndex}
						setActiveIndex={setAccordion2ActiveIndex}
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						field="project"
						defaultObject={{
							project: "",
							about: "",
							description: "",
							duration: "",
							link: "",
							visible: true,
						}}
					/>
				</>
			),
		},
	];

	//const rawTextRepresentation = ReactDOMServer.renderToString(convertToReactPDFComponents(<MyDoc info={pdfRenderedProps} />));

	return (
		<div className="relative h-[100svh] overflow-y-hidden">
			{/* Navigation */}
			<div className="nav flex py-[1.2em] px-[1.4em] md:px-[2em] relative z-20 top-0 bottom-auto border-b-2">
                <p className="text-[1.2em] my-auto font-bold">Sketch.cv</p>
      
            </div>

			{/* Main content */}
			<div className="home md:flex justify-center center-align h-[100%] md:px-[0.1em] pt-[1em] md:pt-[2em] md:fixed left-0 right-0">
				<div className="flex flex-col gap-2 h-full overflow-y-auto bg-grey md:pr-[1em]">
					<div className="form-section max-[768px]:w-[100%] md:min-w-[340px] min-[941px]:w-[380px] max-[940px]:w-[300px] relative md:rounded-[0.75em] overflow-x-hidden">
						<div className="min-[870px]:hidden flex px-[1.2em] py-[1.2em] md:py-[1.6em] w-[100%] bg-white border-[1px] md:rounded-[0.6em] sticky top-0 z-30 md:shadow-lg">
							<h2 className="my-auto">
								<b>Resume</b>
							</h2>
							<Download
								component={
									<MyDoc info={pdfRenderedProps} scale={1} />
								}
								className="btn-primary mr-0 ml-auto"
							/>
						</div>
						<Accordion
							accordionData={
								accordionData
							} /*activeIndex={activeIndex} handleAccordionClick={handleAccordionClick}*/
							setActiveIndex={handleSetActiveIndex}
							activeIndex={accordionActiveIndex}
							accordion2ActiveIndex={accordion2ActiveIndex}
						/>
						{/*rawTextRepresentation*/}
					</div>
				</div>

				{/* PDF Section */}
				
				<div className="max-[870px]:hidden w-[fit-content] flex flex-col justify-center center-align w-[max-content] pb-[2.4em] rounded-[0.75em] desktop h-[100%]">
					
					<div className="grid h-[fit-content] w-[100%] bg-white py-[1.5em] rounded-t-[0.6em]">
						<Download
							component={
								<MyDoc info={pdfRenderedProps} scale={1} />
							}
							iconVisible={false}
							className=" py-[0.5em] px-[1.2em] border-[2.3px] font-bold rounded-md m-auto"
						/>
						{/*<div className="flex  m-auto rounded-3 ml-4 border-2 rounded-[0.75em]">
							<Icon
								//onClick={() => prevPage()}
								src="arrow-right-3.svg"
								className="m-auto p-2 rotate-180"
							/>
							<div className="flex m-auto gap-2 text-sm">
								<p className="pl-1 ">1</p> <p>/</p>{" "}
								<p className="pr-1">1</p>
							</div>
							<Icon
								//onClick={() => nextPage()}
								src="arrow-right-3.svg"
								className="m-auto p-2"
						/>
						</div>*/}
					</div>
					<div className="overflow-y-scroll bg-white mt-0  mb-auto p-[1em] pt-0 rounded-b-[0.6em] shadow-md">
					<div
						className=" w-[fit-content] h-[fit-content] overflow-y-scroll"
						style={{
							width: `${210 * scaleFactor}mm`,
							paddingTop: `${1 * scaleFactor}em`,
							paddingBottom: `${1 * scaleFactor}em`,
							height: `auto`,
							minHeight: `${297 * scaleFactor}mm`,
							border: "1px solid #ccc",
							fontSize: `${16.5 * scaleFactor}pt`,
							fontFamily: "Inter",
							wordBreak: "break-word",
							margin: "auto",
							marginTop: `${1 * scaleFactor}em`,
						}}>
						<MyDoc info={pdfRenderedProps} scale={scaleFactor} />
					</div>
					</div>
				</div>
			</div>
		</div>
	);
}
