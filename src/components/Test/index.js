import './index.css'
class Test {
    str;
    constructor(str = "") {
        this.str = str
        return this._init()
    }
    _init() {
        let div = document.createElement("div")
        div.setAttribute("class", "test")
        let text = document.createTextNode(this.str)
        div.appendChild(text)
        return div
    }

}

export default Test