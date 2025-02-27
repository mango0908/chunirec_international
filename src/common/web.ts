export function getScriptHost(scriptName: string) {
    const scripts = Array.from(document.querySelectorAll("script"))
    while (scripts.length) {
        const script = scripts.pop()
        if (script?.src.includes(scriptName)) {
            const url = new URL(script.src)
            const path = url.pathname
            return url.origin + path.substring(0, path.lastIndexOf("/scripts"))
        }
    }
    return "https://mango0908.github.io/chunirec-international"
}

export function getPostMessageFunc(w: WindowProxy, origin: string): PostMessageFunc {
    if (!w) throw new Error("Target window does not exist")
    return (action, payload, uuid?: string) => {
        const obj = <CrossPageRequestMessageEvent["data"]>{ action, payload }
        if (uuid) obj.uuid = uuid
        w.postMessage(obj, origin)
    }
}

export function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function getCookie(key: string) {
    const cookieEntry = document.cookie
        .split(";")
        .map(e => decodeURIComponent(e.trim()))
        .map(e => e.split("="))
        .find(e => e[0] === key)
    if (cookieEntry) return cookieEntry[1] // value
    return ""
}
