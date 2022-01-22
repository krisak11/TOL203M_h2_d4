//////////////////////////////////////////////////////////////////////
//    Sýnisforrit í Tölvugrafík
//     7-laga form teiknað með TRIANGLE-FAN
//
//    Hjálmtýr Hafsteinsson, janúar 2022
//////////////////////////////////////////////////////////////////////
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	//Svissa á v0 og v1 til að nota TRIANGLE_STRIP
	//TRIANGLE_STRIP: v0,v1,v2 > v2,v1,v3 > v2,v3,v4 > v4,v3,v5
	//Færi til punkta: v1 = v0, v2 = v1, v0 = v2, v3 eins, v5 = v4, v4 = v5
    var vertices = new Float32Array([ //0.75,  0.75,
									 -0.65,  0.75, //var v1
                                     -0.65,  0.35, // var v2                                    								 
									  0.75,  0.75, //var v0, 
                                      0.2,   0.35, //var v3
									  0.5,  -0.75, // var v5										  
									  0.0,  -0.75, // var v4


									  ]);

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
}
