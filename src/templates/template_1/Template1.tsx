import { Div } from "../../Div.tsx";
import Education from "./Education.tsx";
import Skills from "./Skills.tsx";
import Experience from "./Experience.tsx";
import Projects from "./Projects.tsx";
import { style } from "./data.ts";

interface DocumentProps {
	info: {
		education?: {
			// Define the structure of the education object
			school: string;
			degree: string;
			duration: string;
      visible: boolean;
		}[];
		experience?: {
			// Define the structure of the experience object
			jobTitle: string;
			company: string;
			description: string;
			duration: string;
			visible: boolean;
		}[];
		skill?: {
			// Define the structure of the skill object
			skill: string;
			visible: boolean;
		}[];
		project?: {
			// Define the structure of the project object
			project: string;
			about: string;
			description: string;
			duration: string;
			visible: boolean;
		}[];
		contactInfo?: {
			// Define the structure of the contactInfo object
			name?: string;
			label: string;
			src?: string;
		}[];
		personalInfo?: {
			// Define the structure of the personalInfo object
			fullname: string;
			jobTitle: string;
		}[];
	};
}

const docData = {
	fontSize: "11pt",
	strokeWidth: 3,
	strokeLength: "516pt",
};

export default function MyDoc(props: DocumentProps) {
	const {
		info: {
			personalInfo,
			contactInfo,
			education,
			skill,
			experience,
			project,
		},
	} = props;

	return (
		<Div
			style={{ padding: "30pt 40pt", fontSize: "11pt", display: "flex" }}>
			<Div
				style={{
					display: "flex",
					gap: "8pt",
					flexDirection: "column",
					margin: "auto",
				}}>
				{personalInfo &&
					personalInfo.map(({ fullname, jobTitle }, index) => (
						<Div key={index}>
							<p style={style.firstName}>{fullname}</p>
							<p style={style.profession}>{jobTitle}</p>
						</Div>
					))}
				<Div
					style={{
						display: "flex",
						gap: "8pt",
						flexDirection: "row",
						margin: "0 auto",
					}}>
					{contactInfo &&
						contactInfo.map(({ label, src }, index) => (
							<a
								key={index}
								href={src}
								style={{
									color: "black",
									textDecoration: "none",
								}}>
								{label}
							</a>
						))}
				</Div>
				<Div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "15pt",
						marginTop: 15,
					}}>
					{education &&
						(education.some((item) =>
							item.visible &&
								  Object.values(item)
										.slice(0, -1)
										.some((value) => value !== "")
						) ? (
							<Education
								titleStyle={style.title}
								schoolStyle={style.subtitle}
								lineStyle={style.line}
								strokeWidth={docData.strokeWidth}
								strokeLength={docData.strokeLength}
								fontSize={docData.fontSize}
								data={education}
							/>
						) : null)}
					{skill &&
						(skill.some((item) =>
							item.visible &&
								  Object.values(item)
										.slice(0, -1)
										.some((value) => value !== "")
						) ? (
							<Skills
								titleStyle={style.title}
								schoolStyle={style.subtitle}
								lineStyle={style.line}
								strokeWidth={docData.strokeWidth}
								strokeLength={docData.strokeLength}
								fontSize={docData.fontSize}
								data={skill}
							/>
						) : null)}
					{experience &&
						(experience.some((item) =>
							item.visible &&
								  Object.values(item)
										.slice(0, -1)
										.some((value) => value !== "")
						) ? (
							<Experience
								titleStyle={style.title}
								positionStyle={style.subtitle}
								lineStyle={style.line}
								dateStyle={style.dateStyle}
								strokeWidth={docData.strokeWidth}
								strokeLength={docData.strokeLength}
								fontSize={docData.fontSize}
								data={experience}
							/>
						) : null)}
					{project &&
						(project.some((item) =>
							item.visible &&
								  Object.values(item)
										.slice(0, -1)
										.some((value) => value !== "")
						) ? (
							<Projects
								titleStyle={style.title}
								projectStyle={style.subtitle}
								lineStyle={style.line}
								dateStyle={style.dateStyle}
								strokeWidth={docData.strokeWidth}
								strokeLength={docData.strokeLength}
								fontSize={docData.fontSize}
								data={project.filter((proj, index) =>
									index === 0
										? proj.visible
										: proj.visible &&
										  Object.values(proj)
												.slice(0, -1)
												.some((value) => value !== "")
								)}
							/>
						) : null)}
				</Div>
			</Div>
		</Div>
	);
}
