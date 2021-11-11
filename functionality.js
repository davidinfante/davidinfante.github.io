/**
 * Some cute animation
 * by David Infante
 */

Vue.component('cute-animation', {
    template:`
        <div id="canvas">
            <div id="main"></div>

            <div id="shadow0"></div>
            <div id="shadow1"></div>
            <div id="shadow2"></div>
            <div id="shadow3"></div>
            <div id="shadow4"></div>
            <div id="shadow5"></div>
            <div id="shadow6"></div>
            <div id="shadow7"></div>

            <div id="collision0"></div>
            <div id="collision1"></div>
            <div id="collision2"></div>
            <div id="collision3"></div>
        </div>
    `,

    data() {
        return {
            
        };
    },

    mounted() {
        var direction = {
            XPOSITIVE: 1,
            XNEGATIVE: 2,
            YPOSITIVE: 3,
            YNEGATIVE: 4
        };
        var collision = false;
        
        // The greater, the slower
        var speed = 20;
        var movementDistance = 3;
        var angle = Math.PI / 6;
        
        var canvas = document.getElementById("canvas");
        var canvasStyle = getComputedStyle(canvas);
        var main = document.getElementById("main");
        var mainStyle = getComputedStyle(main);
        
        var posX = parseFloat(mainStyle.left);
        var posY = parseFloat(mainStyle.top);
        var directionX = direction.XPOSITIVE;
        var directionY = direction.YPOSITIVE;
        var interval = null;
        
        var shadow0 = document.getElementById("shadow0");
        var shadow1 = document.getElementById("shadow1");
        var shadow2 = document.getElementById("shadow2");
        var shadow3 = document.getElementById("shadow3");
        var shadow4 = document.getElementById("shadow4");
        var shadow5 = document.getElementById("shadow5");
        var shadow6 = document.getElementById("shadow6");
        var shadow7 = document.getElementById("shadow7");
        
        var collision0 = document.getElementById("collision0");
        var collision1 = document.getElementById("collision1");
        var collision2 = document.getElementById("collision2");
        var collision3 = document.getElementById("collision3");
        var collidePosX = 0;
        var collidePosY = 0;
        var collisionIterations = 0;
        var collisionInterval = null;
        
        function move() {        
            interval = setInterval(update, speed);
        
            function update() {
                updateShadows();
                computeDirection();
                updateCollisions();
                computePosition();
                updateCanvasColor();
            }
        }
        
        function updateShadows() {
            shadow7.style.left = shadow6.style.left;
            shadow7.style.top = shadow6.style.top;
            shadow6.style.left = shadow5.style.left;
            shadow6.style.top = shadow5.style.top;
            shadow5.style.left = shadow4.style.left;
            shadow5.style.top = shadow4.style.top;
            shadow4.style.left = shadow3.style.left;
            shadow4.style.top = shadow3.style.top;
            shadow3.style.left = shadow2.style.left;
            shadow3.style.top = shadow2.style.top;
            shadow2.style.left = shadow1.style.left;
            shadow2.style.top = shadow1.style.top;
            shadow1.style.left = shadow0.style.left;
            shadow1.style.top = shadow0.style.top;
            if (directionX == direction.XPOSITIVE) {
                shadow0.style.left = posX + 'px';
            } else {
                shadow0.style.left = posX + 'px';
            }
            if (directionY == direction.YPOSITIVE) {
                shadow0.style.top = posY + 'px';
            } else {
                shadow0.style.top = posY + 'px';
            }
        }
        
        function computeDirection() {
            if (directionX == direction.XPOSITIVE && posX >= (parseFloat(canvasStyle.width) - parseFloat(mainStyle.width) * 4)) {
                directionX = direction.XNEGATIVE;
                collision = true;
            } else if (directionX == direction.XNEGATIVE && posX <= 0) {
                directionX = direction.XPOSITIVE;
                collision = true;
            }
        
            if (directionY == direction.YPOSITIVE && posY >= (parseFloat(canvasStyle.height) - parseFloat(mainStyle.width) * 4)) {
                directionY = direction.YNEGATIVE;
                collision = true;
            } else if (directionY == direction.YNEGATIVE && posY <= 0) {
                directionY = direction.YPOSITIVE;
                collision = true;
            }
        }
        
        function updateCollisions() {
            if (collision) {
                collision = false;
                resetColisions();
                collidePosX = posX;
                collidePosY = posY;
                collision0.style.left = collidePosX + 'px';
                collision0.style.top = collidePosY + 'px';
                collision0.style.visibility = 'visible';
                collision1.style.left = collidePosX + 'px';
                collision1.style.top = collidePosY + 'px';
                collision1.style.visibility = 'visible';
                collision2.style.left = collidePosX + 'px';
                collision2.style.top = collidePosY + 'px';
                collision2.style.visibility = 'visible';
                collision3.style.left = collidePosX + 'px';
                collision3.style.top = collidePosY + 'px';
                collision3.style.visibility = 'visible';
                clearInterval(collisionInterval);
                collisionInterval = setInterval(collideAnimation, speed);
        
                function collideAnimation() {
                    collision0.style.left = (collidePosX - collisionIterations) + 'px';
                    collision0.style.top = (collidePosY - collisionIterations) + 'px';
                    collision1.style.left = (collidePosX + collisionIterations) + 'px';
                    collision1.style.top = (collidePosY - collisionIterations) + 'px';
                    collision2.style.left = (collidePosX + collisionIterations) + 'px';
                    collision2.style.top = (collidePosY + collisionIterations) + 'px';
                    collision3.style.left = (collidePosX - collisionIterations) + 'px';
                    collision3.style.top = (collidePosY + collisionIterations) + 'px';
                    if (collisionIterations >= 25) {
                        resetColisions();
                        clearInterval(collisionInterval);
                    }
                    ++collisionIterations;
                }
            }
        }
        
        function computePosition() {
            if (directionX == direction.XPOSITIVE) {
                posX += Math.sin(angle) + movementDistance;
            } else {
                posX -= Math.sin(angle) + movementDistance;
            }
        
            if (directionY == direction.YPOSITIVE) {
                posY += Math.cos(angle) + movementDistance;
            } else {
                posY -= Math.cos(angle) + movementDistance;
            }
        
            main.style.left = posX + 'px';
            main.style.top = posY + 'px';
        }
        
        function updateCanvasColor() {
            var r = posX * 0.2 + 50;
            var g = posY * 0.1 + 50;
            var b = (posX + posY) * 0.1 + 50;
            canvas.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        }
        
        function resetColisions() {
            collisionIterations = 0;
            collision0.style.visibility = 'hidden';
            collision0.style.left = '0px';
            collision0.style.top = '0px';
            collision1.style.visibility = 'hidden';
            collision1.style.left = '0px';
            collision1.style.top = '0px';
            collision2.style.visibility = 'hidden';
            collision2.style.left = '0px';
            collision2.style.top = '0px';
            collision3.style.visibility = 'hidden';
            collision3.style.left = '0px';
            collision3.style.top = '0px';
        }

        move();
    },
    methods: {
        
    },
})
  

new Vue({
    el: '#vue-app-animation'
})