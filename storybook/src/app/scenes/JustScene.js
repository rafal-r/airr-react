import { SceneWrapper } from "airr-react/Airr";

export default class JustScene extends SceneWrapper {
	componentDidMount() {
		//these rules are only added to sustain proper render in storybooks
		const root = document.getElementById("root");
		root.style.height = "100%";
		root.children[0].style.height = "100%";
		root.children[0].children[0].style.height = "100%";

		super.componentDidMount();
	}

	componentWillUnmount() {
		//these rules are only added to sustain proper render in storybooks
		const root = document.getElementById("root");
		root.style.height = "";
		root.children[0].style.height = "";
		root.children[0].children[0].style.height = "";
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return Object.assign(prevState, nextProps, {
			sidepanel: {
				type: prevState.sidepanel.type,
				props: Object.assign(prevState.sidepanel.props, nextProps.sidepanel.props)
			}
		});
	}
}
