const uuid = require('uuid')

export namespace Execute {
    export function executeJS(block, container) {
        let execute_func = new Function('lib', block) as (Object) => void
        execute_func({
            dom: {
                container: container
            }
        })
    }
}