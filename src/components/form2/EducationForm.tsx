import { useEffect } from 'react';
import InputLabel from "../InputLabel";

interface educationProps {
	data: {
		school: string;
		degree: string;
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
