import { SceneProps } from "../Scene";
import { MayerProps } from "../Mayer";
import MayersAPIHelper from "./MayersAPIHelper";
import { Mayer } from "../Airr";

function promiseSetState(stateChange: Partial<SceneProps>): Promise<void> {
    return new Promise(resolve => {
        this.setState(stateChange, resolve);
    });
}
function checkGUIDisabledProps(): void {
    if (this.props.GUIDisabled !== this.state.GUIDisabled) {
        this.setState({ GUIDisabled: this.props.GUIDisabled });
    }
    if (this.props.GUIDisableCover !== this.state.GUIDisableCover) {
        this.setState({ GUIDisableCover: this.props.GUIDisableCover });
    }
}
function checkAnimationProps(): void {
    if (this.props.animation !== this.state.animation) {
        this.setState({ animation: this.props.animation });
    }
    if (this.props.animationTime !== this.state.animationTime) {
        this.setState({ animationTime: this.props.animationTime });
    }
}
function checkNavbarProps(): void {
    if (this.props.navbar !== this.state.navbar) {
        this.setState({ navbar: this.props.navbar });
    }
    if (this.props.navbarHeight !== this.state.navbarHeight) {
        this.setState({ navbarHeight: this.props.navbarHeight });
    }
    if (this.props.navbarMenu !== this.state.navbarMenu) {
        this.setState({ navbarMenu: this.props.navbarMenu });
    }
    if (this.props.navbarClass !== this.state.navbarClass) {
        this.setState({ navbarClass: this.props.navbarClass });
    }
}
function checkBackbuttonProps(): void {
    if (this.props.backButton !== this.state.backButton) {
        this.setState({ backButton: this.props.backButton });
    }
    if (this.props.backButtonOnFirstView !== this.state.backButtonOnFirstView) {
        this.setState({ backButtonOnFirstView: this.props.backButtonOnFirstView });
    }
    if (this.props.handleBackButton !== this.state.handleBackButton) {
        this.setState({ handleBackButton: this.props.handleBackButton });
    }
    if (this.props.handleBackBehaviourOnFirstView !== this.state.handleBackBehaviourOnFirstView) {
        this.setState({
            handleBackBehaviourOnFirstView: this.props.handleBackBehaviourOnFirstView
        });
    }
}
async function checkSidepanelProps(): Promise<void> {
    if (!this.sidepanelChangeInProgress && this.props.sidepanel !== this.state.sidepanel) {
        this.sidepanelChangeInProgress = true;

        if (this.props.sidepanel && this.state.sidepanel) {
            if (this.props.sidepanel.props.isShown !== this.state.sidepanel.props.isShown) {
                const funcName =
                    (this.props.sidepanel.props.isShown ? "open" : "hide") + "Sidepanel";
                await this[funcName]();
            }

            if (this.props.sidepanel.props.enabled !== this.state.sidepanel.props.enabled) {
                const funcName =
                    (this.props.sidepanel.props.enabled ? "enable" : "disable") + "Sidepanel";
                await this[funcName]();
            }
        } else if (!this.props.sidepanel && this.state.sidepanel) {
            await this.disableSidepanel();
            await this.hideSidepanel();
        }

        await this.setSidepanelConfig(this.props.sidepanel);
        this.sidepanelChangeInProgress = false;
    }

    if (
        this.props.sidepanelVisibilityCallback &&
        this.props.sidepanelVisibilityCallback !== this.state.sidepanelVisibilityCallback
    ) {
        this.setState({ sidepanelVisibilityCallback: this.props.sidepanelVisibilityCallback });
    }
}
function checkActiveViewNameProp(): Promise<void> {
    if (this.props.activeViewName !== this.state.activeViewName) {
        return this.changeView(this.props.activeViewName);
    }

    return Promise.resolve();
}
async function checkViewsProps(): Promise<void> {
    if (!this.viewChangeInProgress) {
        if (this.props.activeViewName !== this.state.activeViewName) {
            this.viewChangeInProgress = true;
        }

        if (this.props.views !== this.state.views) {
            //new active view is present in views array. First change view then update views array
            if (this.getViewIndex(this.props.activeViewName) >= 0) {
                await checkActiveViewNameProp.call(this);
                promiseSetState.call(this, { views: this.props.views });
            } else {
                //new active view might be in new views array. First update views array then changeView
                await promiseSetState.call(this, { views: this.props.views });
                checkActiveViewNameProp.call(this);
            }
        } else {
            checkActiveViewNameProp.call(this);
        }
    }
}
interface MayersChangeSpec {
    open: MayerProps[];
    close: string[];
}
function extractMayersChangeSpec(
    currentMayers: MayerProps[],
    incomingMayers: MayerProps[]
): MayersChangeSpec {
    const obj: MayersChangeSpec = { open: [], close: [] };

    incomingMayers.forEach(item => {
        const currentMayer = currentMayers.find(cfg => cfg.name === item.name);
        if (!currentMayer) {
            obj.open.push(item);
        } else {
            //if we already have mayer with same name
            //compare refferences, if different then open new and close old
            if (item !== currentMayer) {
                obj.open.push(item);
                obj.close.push(item.name);
            }
        }
    });

    currentMayers.forEach(item => {
        if (incomingMayers.findIndex(cfg => cfg.name === item.name) === -1) {
            obj.close.push(item.name);
        }
    });

    return obj;
}
async function checkMayersProps(): Promise<void> {
    if (!this.mayersChangeInProgress && this.props.mayers !== this.state.mayers) {
        const changeSpec = extractMayersChangeSpec(this.state.mayers, this.props.mayers);
        console.log("BUM", JSON.stringify(changeSpec));

        if (changeSpec.close.length || changeSpec.open.length) {
            this.mayersChangeInProgress = true;
        }

        if (changeSpec.close.length) {
            //closing will be done by calling animateOut on Mayer Component instance
            //state removal will be done with last setState call

            await Promise.all(
                changeSpec.close.map(name => {
                    return new Promise(resolve => {
                        if (this.refsCOMPMayers[name] && this.refsCOMPMayers[name].current) {
                            this.refsCOMPMayers[name].current.animateOut(() => {
                                //delete the Componnent refference
                                delete this.refsCOMPMayers[name];
                                resolve();
                            });
                        }
                    });
                })
            );
        }

        if (changeSpec.open.length) {
            //if new mayers arrive just prepare them by mutation with ref and avaibleHeight props
            this.props.mayers.forEach(item => MayersAPIHelper.prepareMayerConfig(this, item));
        }

        this.setState({ mayers: this.props.mayers });

        if (changeSpec.open.length) {
            setTimeout(() => {
                this.mayersChangeInProgress = false;
            }, Mayer.defaultProps.animationTime + 50);
        } else {
            this.mayersChangeInProgress = false;
        }
    }
}
function checkSingleProps(): void {
    if (this.props.name !== this.state.name) {
        this.setState({ name: this.props.name });
    }
    if (this.props.title !== this.state.title) {
        this.setState({ title: this.props.title });
    }
    if (this.props.className !== this.state.className) {
        this.setState({ className: this.props.className });
    }
    if (this.props.children !== this.state.children) {
        this.setState({ children: this.props.children });
    }
}
//TODO
//pamietac o tym ze update z gory rowniez beda dokynywane z zachowaniem zasady
//niemutowalnosci, czyli jesli dojdzie do jakeis zmiany w tablicy views, zostanie podana
//nowa referencja do nowej tablicy
//poszczeglony propsy view i tak ostatecznie zostana rozbite za male czesci i w razie braku
//aktualizacji widok i tak nie wywola render
// przetestowac ostatecznie
export function componentDidUpdate<P extends SceneProps = SceneProps>(prevProps: P): void {
    console.log("update");
    checkSingleProps.call(this);
    checkGUIDisabledProps.call(this);
    checkAnimationProps.call(this);
    checkNavbarProps.call(this);
    checkBackbuttonProps.call(this);
    checkSidepanelProps.call(this);
    checkViewsProps.call(this);
    checkMayersProps.call(this);
}
