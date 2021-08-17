export function savePageStates(pageName, states) {
    sessionStorage.setItem(`${pageName}State`, JSON.stringify(states));
}

export function loadPageStates(pageName) {
    const data = sessionStorage.getItem(`${pageName}State`);
    if(data) {
        return  JSON.parse(data);
    }
    return {};
}