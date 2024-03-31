
export default function scaledStyle(scaleFactor: number) { 
	
	return ({
	page: {
		padding: `${40 * scaleFactor}`,
	},
	section: {
		padding: `${20 * scaleFactor}, ${40 * scaleFactor}`,
	},
	lastName: {
		fontSize: `${30 * scaleFactor}pt`,
		fontFamily: "Poppins",
		letterSpacing: `${1.1 * scaleFactor}pt`,
	},
	firstName: {
		fontSize: `${23 * scaleFactor}pt`,
		fontFamily: "Poppins",
		margin: "auto",
	},
	profession: {
		//textAlign: "center",
		fontSize: `${13 * scaleFactor}pt`,
		fontFamily: "Calibri",
        margin: 'auto',
		//marginBottom: "30pt",
	},
	title: {
		fontSize: `${11.8 * scaleFactor}pt`,
		fontFamily: "Calibri",
		//marginBottom: "5",
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: `${11 * scaleFactor}pt`,
		fontFamily: "Calibri",
		fontWeight: "bold",
	},
	line: {
		margin: `${3 * scaleFactor}pt, auto`,
	},
	dateStyle: { margin: "auto 0 auto auto", fontFamily: "Calibri" },
	icon: {maxHeight: `${13 * scaleFactor}px`, maxWidth: `${13 * scaleFactor}px`}
})}