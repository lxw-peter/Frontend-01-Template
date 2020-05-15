const EOF = Symbol("EOF");  // EOF: End of File

function data(params) {
    if (c == '') {

    } else if () {

    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF);
}

function tagName(c) {
    if (c.match(/^[\t\t\f]$/)) {
        return beforeAttributeName;
    } else if (){
        return selfClosingStartTag();
    }
}

function beforeAttributeName(params) {
    
}

function afterAttributeName() {

}

function selfClosingStartTag(params) {
    
}

function attributeName(params) {
    
}

function beforeAttributeValue(params) {
    
}