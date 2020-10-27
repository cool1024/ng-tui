export class RouteUtil {

    public static generateRoutesFromComponents(components: Array<any>) {
        return components.map(component => {
            if (Array.isArray(component)) {
                const parentComponent = component.shift();
                return {
                    path: parentComponent.name, component: parentComponent,
                    children: RouteUtil.generateRoutesFromComponents(component)
                };
            } else {
                return {
                    path: component.name, component
                };
            }
        });
    }
}