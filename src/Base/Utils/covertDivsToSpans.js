export default function (element) {
    element.style.overflow = "hidden";
    // element.style.visibility = "hidden";
    element.innerHTML = element.innerText
        .split("")
        .map((char) => {
            if (char === " ") {
                return `<span style="margin-right: 1px;">&nbsp;</span>`;
            }
            return `<span class="animatedis" style="margin-right: 1px;">${char}</span>`;
        })
        .join("");

    return element;
}
