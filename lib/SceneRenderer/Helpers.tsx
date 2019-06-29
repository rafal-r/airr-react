import { SceneProps } from "../Scene";

export function extractAllPropsToFeed(views: SceneProps["views"]): string[] {
    return views.reduce((list, viewConfig) => {
        if (viewConfig.feedWithProps) {
            viewConfig.feedWithProps.forEach(propName => {
                list.findIndex(item => item === propName) === -1 && list.push(propName);
            });
        }

        return list;
    }, []);
}

export function getPropsFeedObject<P extends SceneProps = SceneProps>(
    props: P,
    feedList: string[]
): Partial<P> {
    const obj: Partial<P> = {};

    feedList.forEach(propName => {
        if (propName in props) {
            obj[propName] = props[propName];
        }
    });

    return obj;
}
