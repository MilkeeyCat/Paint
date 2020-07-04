fixScale(document);

main();

function main() {
    colorjoe.registerExtra('text', function(p, joe, o) {
        e(p, o.text? o.text: 'text');
    });
    
    function e(parent, text) {
        var elem = document.createElement('div');
        elem.innerHTML = text;
        parent.appendChild(elem);
    }
    
    colorjoe.rgb('extraPicker', '#000', [
        'currentColor',
        'hex',
    ]);
}