const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d') ;

canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

/*
// Create Linear Gradient
let gradient = context.createLinearGradient(0,canvas.width, canvas.height, 0);
gradient.addColorStop(0,"red");
gradient.addColorStop(0.2,"green");
gradient.addColorStop(0.4,"yellow");
gradient.addColorStop(0.6,"magenta");
gradient.addColorStop(0.8,"pink");
gradient.addColorStop(1,"cyan");
*/


//Create Radial Gradient  --> let Rgradient = context.createRadialGradient(x, y, r1, x2, y2, r2 );
let  Rgradient = context.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 500 );
Rgradient.addColorStop(0,"red");
Rgradient.addColorStop(0.2,"green");
Rgradient.addColorStop(0.4,"yellow");
Rgradient.addColorStop(0.6,"magenta");
Rgradient.addColorStop(0.8,"pink");
Rgradient.addColorStop(1,"cyan");



class Symbol
{
    constructor(x,y, fontSize, canvasHeight)
    {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context)
    {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));       
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.8)
        {
            this.y = 0;
        }
        else
        {
            this.y+=1;
        }
    }
}


class Effect
{
    constructor(canvasWidth, canvasHeight)
    {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize()
    {
        for(let i = 0; i<this.columns; i++)
        {
            this.symbols[i] = new Symbol(i,0, this.fontSize, this.canvasHeight);

        }
    }


    resize(width, height)
    {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns  =  this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 80;
const nextFrame = 1000/fps;
let timer = 0;


//delta time = difference in millisec between previous animation frame and the current animation frame
function animate(timestamp)
{
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if(timer > nextFrame)
    {

    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.textAlign = "center";
    context.fillRect(0,0, canvas.width,canvas.height);
    context.fillStyle = Rgradient  //"green"; 
    context.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach(symbol => symbol.draw(context));
    timer = 0;

    }
    else
    {
        timer+=deltaTime;
    }

    
   requestAnimationFrame(animate);
}

animate(0);


canvas.addEventListener("resize" ,function()
    {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    // resize();
Rgradient = context.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 500 );
Rgradient.addColorStop(0,"red");
Rgradient.addColorStop(0.2,"green");
Rgradient.addColorStop(0.4,"yellow");
Rgradient.addColorStop(0.6,"magenta");
Rgradient.addColorStop(0.8,"pink");
Rgradient.addColorStop(1,"cyan");

    }

);

