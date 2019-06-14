import { ViewsConfig } from "../Scene";
import { SidepanelConfig } from "../Airr";

export function TSValidateViewsConfig<T>(viewConfig: ViewsConfig<T>): ViewsConfig<T> {
    return viewConfig;
}
export function TSValidateSidepanelConfig<T>(config: SidepanelConfig<T>): SidepanelConfig<T> {
    return config;
}
