function isPhone() {
    // 768px se choti screen ko generally mobile mana jata hai
    return window.matchMedia("(max-width: 768px)").matches;
}


export default isPhone;