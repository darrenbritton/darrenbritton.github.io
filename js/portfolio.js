var body = document.body,
    html = document.documentElement;

function drawBackground() {
    var pageHeight = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    var pattern = Trianglify({
        width: window.innerWidth,
        height: pageHeight,
        cell_size: 200,
        x_colors: ['#1C120D', '#aa7243']
    });
    pattern.canvas(document.getElementById('page-background'));
}
drawBackground();
