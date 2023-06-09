export namespace Obsidian {
    export function init(app) {}

    export namespace API {
        export function pages(query): Record<string, any> {
            return {}
        }
        export function parse(str) {}
        export function block(): string {
            return ""
        }
    }
}