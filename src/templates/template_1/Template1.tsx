import { Div } from "../../Div.tsx";
import Education from "./Education.tsx";
import Skills from "./Skills.tsx";
import Experience from "./Experience.tsx";
import Projects from "./Projects.tsx";
import { style } from "./data.ts";
import * as Types from "../../types/usertypes.ts";
import emailIcon from './assets/email.svg'


const docData = {
	fontSize: "11pt",
	strokeWidth: 3,
	strokeLength: "516pt",
};

// Assuming you have types.ts or usertypes.ts where RenderedProps is defined
export interface RenderedProps {
	info: Types.RenderedProps
  }

  
export default function MyDoc(props: RenderedProps) {
	const {
	info: {
			personalInfo,
			contactInfo,
			education,
			skill,
			experience,
			project,}
	} = props;

	return (
		<Div 
			style={{fontSize: "11pt", display: "flex" }}>
			<Div
				style={{
					display: "flex",
					gap: "8pt",
					flexDirection: "column",
					margin: "auto",
				}}>
				{personalInfo &&
					personalInfo.map(({ fullname, jobTitle, email, website }, index) => (
						<>
						<Div key={index}>
							<p style={style.firstName}>{fullname}</p>
							<p style={style.profession}>{jobTitle}</p>
						</Div>
						<Div style={{display: 'flex', flexDirection: 'row', gap: '14pt', margin: 'auto', fontSize: '10.5pt', paddingTop: '4pt'}}>
							{email !== "" &&
							<Div style={{display: 'flex', flexDirection: 'row', gap: '3pt'}} >
								<img src='/email.png' style={{maxHeight: '13pt', maxWidth: '13pt', margin: 'auto'}} />
								<Div><a >{email}</a></Div>
							</Div>}
							{website !== "" &&
							<Div style={{display: 'flex', flexDirection: 'row', gap: '3pt'}}>
								<img src='/web.png' style={{maxHeight: '13pt', maxWidth: '13pt', margin: 'auto'}} />
								<a >{website}</a>
							</Div>}
						</Div>
						</>
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