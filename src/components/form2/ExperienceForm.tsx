import { useEffect, useState } from "react";
import InputLabel from "../InputLabel";
import TextEditor from "../../templates/template_1/TextEditor";
import LinkButton from "../LinkButton";

interface experienceProps {
    data: {
        jobTitle: string;
        company: string;
        description: string;
        link: string
        duration: string;
    };
    handleChange: (
        userDetails: string,
        index: any,
        field: string,
        event: any
    ) => any;
    index: any;
}
export default function ExperienceForm(props: experienceProps) {
    const [editorValue, setEditorValue] = useState(props.data.description)
    useEffect(() => {
        const allFieldsEmpty = Object.values(props.data).every(field => field === '');
        if (allFieldsEmpty) {
            props.handleChange('experience', props.index, 'visible', false);
        } else {
            props.handleChange('experience', props.index, 'visible', true);
        }
    }, [props.data]);
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            {/* Personal Info Form */}
           
                <div className="flex flex-col gap-1">
                    <div className="grid grid-cols-[88%,10%] gap-1">
                        <InputLabel
                            type="text"
                            value={props.data.jobTitle}
                            handleChange={(e) =>
                                props.handleChange(
                                    "experience",
                                    props.index,
                                    "jobTitle",
                                    e.target.value
                                )
                            }
                            label="Job Title"
                            placeholder="Enter Job Title"
                        />
                        <LinkButton 
                        value={props.data.link}
						handleChange={(e) =>
							props.handleChange(
								"experience",
								props.index,
								"link",
								e.target.value
							)
						}
						buttonStyle="flex mb-0 mt-auto mx-auto w-[38px] h-[38px]"
						inputStyle="left-[7.5em] right-8 mt-[-0.8em] z-50"
						/>
                    </div>
                    <div>
                        <InputLabel
                            type="text"
                            value={props.data.company}
                            handleChange={(e) =>
                                props.handleChange(
                                    "experience",
                                    props.index,
                                    "company",
                                    e.target.value
                                )
                            }
                            label="Employer"
                            placeholder="Enter employer"
                        />
                    </div>
                    
                    <div>
                        {" "}
                        <InputLabel
                            type="text"
                            value={props.data.duration}
                            handleChange={(e) =>
                                props.handleChange(
                                    "experience",
                                    props.index,
                                    "duration",
                                    e.target.value
                                )
                            }
                            label="Duration"
                        />
                    </div>
                    <div>
					<TextEditor 
					label="Description"
					value={editorValue} // Bind the Quill editor value to editorValue state
					editorContainerClassName="pt-3"
					editorClassName="md:max-w-[300px]"
					placeholder="Enter description here"
                    toolbar={[
                        ["bold"],
                        [{ list: "bullet" }],
                        ["link"],
                      ]}
					onChange={(value) => {
						setEditorValue(value); // Update the editorValue state
						props.handleChange(
							"experience",
							props.index,
							"description",
							value
						);
					}}
					
					/>
				</div>
                </div>
         
        </form>
    );
}
