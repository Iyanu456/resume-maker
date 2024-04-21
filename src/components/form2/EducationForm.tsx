import { useEffect } from 'react';
import InputLabel from "../InputLabel";
import LinkButton from '../LinkButton';

interface educationProps {
	data: {
		school: string;
		degree: string;
		link: string;
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
export default function EducationForm(props: educationProps) {
	useEffect(() => {
        const allFieldsEmpty = Object.values(props.data).every(field => field === '');
        if (allFieldsEmpty) {
            props.handleChange('education', props.index, 'visible', false);
        } else {
            props.handleChange('education', props.index, 'visible', true);
        }
    }, [props.data]);
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			{/* Personal Info Form */}
			
				<div className="flex flex-col gap-1">
					<div className="grid grid-cols-[88%,10%] gap-1">
						<InputLabel
							label="School"
							type="text"
							value={props.data.school}
							handleChange={(e) =>
								props.handleChange(
									"education",
									props.index,
									"school",
									e.target.value
								)
							}
							placeholder='Enter School / University'
						/>
						<LinkButton 
						value={props.data.link}
						handleChange={(e) =>
							props.handleChange(
								"education",
								props.index,
								"link",
								e.target.value
							)
						}
						buttonStyle="flex mb-0 mt-auto mx-auto w-[38px] h-[38px]"
						inputStyle="left-[7.5em] right-8 mt-[-0.8em] z-50"
						/>
					</div>

					<InputLabel
						label="Degree"
						type="text"
						value={props.data.degree}
						handleChange={(e) =>
							props.handleChange(
								"education",
								props.index,
								"degree",
								e.target.value
							)
						}
						placeholder='Enter Degree / Field Of Study'
					/>

					<div>
						{" "}
						<InputLabel
							label="Duration"
							type="text"
							value={props.data.duration}
							handleChange={(e) =>
								props.handleChange(
									"education",
									props.index,
									"duration",
									e.target.value
								)
							}
						/>
					</div>
				</div>
		
		</form>
	);
}
