import { useState } from "react";
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
import { RenderedProps } from "./types/usertypes";
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

export default function Home(): JSX.Element {
	//const [numPages, setNumPages] = useState(1);
	//const [pageNum, setPageNum] = useState(1);

	/*function nextPage() {
		if (pageNum >= numPages) setPageNum(pageNum);
		else setPageNum(pageNum + 1);
	}

	function prevPage() {
		if (pageNum > 0 && pageNum === 1) setPageNum(pageNum);
		else setPageNum(pageNum - 1);
	}*/

	// State for data to be rendered in the PDF
	const [pdfRenderedProps, setPdfRenderedProps] = useState<RenderedProps>({
		personalInfo: [
			{ fullname: "", jobTitle: "", email: "", website: "", phone: "" },
		],
		education: [{ school: "", degree: "", duration: "", visible: true }],
		skill: [{ skill: "", visible: true }],
		experience: [
			{
				jobTitle: "",
				company: "",
				description: "",
				duration: "",
				visible: true,
			},
		],
		project: [
			{
				project: "",
				about: "",
				description: "",
				duration: "",
				visible: false,
			},
		],
		contactInfo: [{ name: "", label: "", src: "", visible: true }],
	});
	const { scaleFactor } = useScaleFactor();
	//const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
	//const [projectForms, setProjectForms] = useState([]);

	//function that handles input change in input fields
	const handleChange = (
		category: string,
		index: number,
		field: string,
		value: any
	): void => {
		const updatedData: any = { ...pdfRenderedProps };
		updatedData[category][index][field] = value;
		setPdfRenderedProps(updatedData);
	};

	/*const onEditorStateChange = (newEditorState: EditorState, editorProjectIndex: number) => {
		setEditorState(newEditorState);
		// Update the corresponding project description in pdfRenderedProps
		const updatedPdfRenderedProps = {
		  ...pdfRenderedProps,
		  project: pdfRenderedProps.project.map((project, i) => {
			if (i === editorProjectIndex) {
			  return {
				...project,
				description: draftToHtml(convertToRaw(newEditorState.getCurrentContent())),
			  };
			}
			return project;
		  }),
		};
		setPdfRenderedProps(updatedPdfRenderedProps);
	  };*/

	type ArrayKeys = keyof typeof pdfRenderedProps;

	//toogles the visibility of an item in the list of Accordion2 component
	const toggleVisibility = (field: ArrayKeys, index: number): void => {
		setPdfRenderedProps((prevState) => {
			const updatedArray = prevState[field].map((item, i) => {
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
			content: pdfRenderedProps.personalInfo.map((data, index) => (
				<PersonalDetails
					//debounceTime={debounceTime}
					//key={index}
					index={index}
					data={data}
					handleChange={handleChange}
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
							(data, index) => ({
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
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						//onAccordionClose={handleAccordionClose}
						field="education"
						defaultObject={{
							school: "",
							degree: "",
							duration: "",
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
							(data, index) => ({
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
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						field="skill"
						defaultObject={{ skill: "", visible: true }}
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
							(data, index) => ({
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
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						field="experience"
						defaultObject={{
							jobTitle: "",
							company: "",
							description: "",
							duration: "",
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
							(data, index) => ({
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
						onAdd={handleAddItem}
						onDelete={handleDeleteItem}
						onToggleVisibility={toggleVisibility}
						field="project"
						defaultObject={{
							project: "",
							about: "",
							description: "",
							duration: "",
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
			<div className="nav flex py-[1.2em] px-[2em] relative z-20 top-0 bottom-auto">
				<b>Sketch.cv</b>
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
							className="btn-primary m-auto"
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
