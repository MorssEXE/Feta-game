//helper funkce (pro jednodussi funkcionalitu ostatnich)

export function getCustomProperty(elem, prop){
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0 // chceme value z css, pak primo tu prop a potrebujeme to jako ciselnou hodnotu, proro parseFloat
}

export function setCustomProperty(elem, prop, value){
    elem.style.setProperty(prop, value)
}

export function incrementCustomProperty(elem, prop, inc){
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)

}