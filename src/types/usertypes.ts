

export interface PersonalInfoProps {
	fullname: string;
	jobTitle: string;
	email: string;
	website: string;
	phone: string;
}

export interface EducationInfo {
	school: string;
	degree: string;
	duration: string;
	link: string;
	visible: boolean;
}

export interface ExperienceInfo {
	jobTitle: string;
	company: string;
	description: string;
	duration: string;
	link: string;
	visible: boolean;
}

export interface ProjectInfo {
	project: string;
	about: string;
	description: string;
	duration: string;
	link: string;
	visible: boolean;
}

export interface ContactInfoProps {
	name: string;
	label: string;
	src: string;
	visible: boolean;
}
export interface RenderedProps {
	personalInfo: PersonalInfoProps[];
	education: EducationInfo[];
	skill: { skill: string; skillInformation: string; visible: boolean }[];
	experience: ExperienceInfo[];
	project: ProjectInfo[];
	contactInfo: ContactInfoProps[];
}

