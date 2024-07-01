

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

export interface CustomSectionInfo {
	title: string;
    content: string;
    visible: boolean;
}

export interface ProfessionalSummaryInfo { summary: string; visible: boolean }
export interface SkillInfo {skill: string; skillInformation: string; visible: boolean }

export interface RenderedProps {
	personalInfo: PersonalInfoProps[];
	education?: EducationInfo[];
	skill?: SkillInfo[];
	professionalSummary?: ProfessionalSummaryInfo[];
	experience?: ExperienceInfo[];
	project?: ProjectInfo[];
	contactInfo?: ContactInfoProps[];
	customSection?:CustomSectionInfo[];
}


export const defaultPdfRenderedProps: RenderedProps = {
    personalInfo: [{ 
			fullname: "", 
			jobTitle: "", 
			email: "", 
			website: "", 
			phone: "" }],
			
	professionalSummary: [{
		summary: "", 
		visible: true
	}],

    education: [{ 
		school: "", 
		degree: "", 
		duration: "", 
		link: "", 
		visible: true 
	}],

    skill: [{ 
		skill: "", 
		skillInformation: "", 
		visible: true 
	}],

    experience: [{
            jobTitle: "", 
			company: "", 
			description: "", 
			duration: "", 
			link: "", 
			visible: true,
        }],

    project: [{
            project: "", 
			about: "", 
			description: "", 
			duration: "", 
			link: "", 
			visible: false,
        }],

    contactInfo: [{ 
		name: "", 
		label: "", 
		src: "", 
		visible: true 
	}],
};
