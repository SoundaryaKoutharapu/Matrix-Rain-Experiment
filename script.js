const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d') ;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        context.fillStyle = "green";
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
}

const effect = new Effect(canvas.width, canvas.height);

function animate()
{
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0,0, canvas.width,canvas.height);
    context.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach(symbol => symbol.draw(context));
   requestAnimationFrame(animate);
}

animate();