# SimpleGraphicsHx

Unified Haxe api for generating simple 2d graphics to svg, canvas and more. 

Work in progress!

```haxe

    // add graphic primitives
    final items:Array<GItem> = [
        Ellipse(-50, -50, 100, 100, Solid(Yellow), None),
        Line(0, 0, 100, -100, Stroke(Purple, 5)),
        Rect(-100, -100, 100, 100, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
        Rect(0, 0, 100, 100, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
        // Path (svg path style for curved shapes, truetype glyphs etc)...
    ];

    // render to svg
    final sSurface:SvgSurface = new SvgSurface();
    sSurface.addItems(items);
    final svg = sSurface.render();

    // render to canvas
    final cSurface = new CanvasSurface();
    cSurface.addItems(items);
    final canvas = cSurface.render();

    // test output
    outputToBrowser(svg, canvas);

```