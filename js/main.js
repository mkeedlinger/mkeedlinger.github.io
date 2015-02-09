$(function () {
    markdown();
    copy();
    spacing();
    hljs.initHighlightingOnLoad();
});

function markdown () {
    $('md').each(function (index, element) {
        var text;
        element = $(element);
        text = limitSpacing(element.html());

        if (element.data('escape') !== false) {
            text = _.escape(text);
        }

        element.html(marked(text));

        if (element.data('keep-id') === undefined) {
            element.children().each(function (ind, ele) {
                ele = $(ele);
                ele.removeAttr('id');
            });
        }
    });
}

function spacing () {
    $('.limitSpacing').each(function (ind, ele) {
        ele = $(ele);
        console.log(99,limitSpacing(ele.html()))
        ele.html(limitSpacing(ele.html()));
    });
}

function limitSpacing (text) {
    var count = text.match(/^\s*/)[0].length - 1;

    text = text.split('\n').slice(1, -1);
    text = text.map(function (currentLine) {
        return currentLine.slice(count);
    });
    return text.join('\n');
}

function copy () {
    $('.copy').each(function (idx, ele) {
        ele = $(ele);
        var copy = ele.data('copy');
        ele.click(function () {
            prompt("Copy the text, then press enter:\n\n" + copy + '\n', copy);
        });
    });
}