//import { useState, useEffect } from 'react';
import { Div } from "../../Div.tsx";
import Education from "./Education.tsx";
import Skills from "./Skills.tsx";
import Experience from "./Experience.tsx";
import Projects from "./Projects.tsx";
import ProfessionalSummary from "./ProfessionalSummary.tsx";
import scaledStyle from "./data.ts";
import * as Types from "../../types/usertypes.ts";


// Assuming you have types.ts or usertypes.ts where RenderedProps is defined
export interface RenderedProps {
	info: Types.RenderedProps;
	scale: number;
}

export default function MyDoc(props: RenderedProps) {
	const {
		info: {
			personalInfo,
			professionalSummary,
			contactInfo,
			education,
			skill,
			experience,
			project,
			customSection,
		},
		scale,
	} = props;

	const style = scaledStyle(scale);

	const docData = {
		fontSize: `${11 * scale}pt`,
		strokeWidth: 3 * scale,
		strokeLength: `${516 * scale}pt`,
	};

	return (
		<Div style={{ fontSize: `${11 * scale}pt`, display: "flex" }}>
			<Div
				style={{
					display: "flex",
					gap: `${8 * scale}pt`,
					flexDirection: "column",
					margin: "auto",
				}}>
				{personalInfo &&
					personalInfo.map(
						(
							{ fullname, jobTitle, email, website, phone },
							index
						) => (
							<>
								<Div key={index}>
									<p style={style.firstName}>{fullname}</p>
									<p style={style.profession}>{jobTitle}</p>
								</Div>
								<Div
									style={{
										display: "flex",
										flexDirection: "row",
										gap: `${14 * scale}pt`,
										margin: "auto",
										fontSize: "10.5pt",
										paddingTop: `${4 * scale}pt`,
									}}>
									{email !== "" && (
										<Div
											style={{
												display: "flex",
												flexDirection: "row",
												gap: `${3 * scale}pt`,
											}}>
											<img
												src="/email.png"
												style={{
													maxHeight: `${
														13 * scale
													}px`,
													maxWidth: `${13 * scale}px`,
													margin: "auto",
												}}
											/>
											<Div>
												<a
													style={{
														fontSize: `${
															10 * scale
														}pt`,
													}}>
													{email}
												</a>
											</Div>
										</Div>
									)}
									{website !== "" && (
										<Div
											style={{
												display: "flex",
												flexDirection: "row",
												gap: `${3 * scale}pt`,
											}}>
											<img
												src="/web.png"
												style={{
													maxHeight: `${
														13 * scale
													}px`,
													maxWidth: `${13 * scale}px`,
													margin: "auto",
												}}
											/>
											<a
												style={{
													fontSize: `${10 * scale}pt`,
												}}
												href={website}>
												{website}
											</a>
										</Div>
									)}
									{phone !== "" && (
										<Div
											style={{
												display: "flex",
												flexDirection: "row",
												gap: `${3 * scale}pt`,
											}}>
											<img
												src="/phone.png"
												style={{
													maxHeight: `${
														13 * scale
													}px`,
													maxWidth: `${13 * scale}px`,
													margin: "auto",
												}}
											/>
											<a
												style={{
													fontSize: `${10 * scale}pt`,
												}}>
												{phone}
											</a>
										</Div>
									)}
								</Div>
							</>
						)
					)}



						
				<Div
					style={{
						display: "flex",
						gap: `${2 * scale}pt`,
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
						gap: `${12 * scale}pt`,
						marginTop: 8 * scale,
					}}>
						{professionalSummary &&
						(professionalSummary.some(
							(item: any) =>
								item.visible &&
								Object.values(item)
									.slice(0, -1)
									.some((value) => value !== "")
						) ? (
							<ProfessionalSummary
								titleStyle={style.title}
								schoolStyle={style.subtitle}
								lineStyle={style.line}
								strokeWidth={docData.strokeWidth}
								strokeLength={docData.strokeLength}
								fontSize={docData.fontSize}
								data={professionalSummary}
							/>
						) : null)}
					{education &&
						(education.some(
							(item) =>
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
						(skill.some(
							(item) =>
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
						(experience.some(
							(item) =>
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
						(project.some(
							(item) =>
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
