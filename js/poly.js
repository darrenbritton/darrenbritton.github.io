var sky = document.getElementById("sky");

sky.width = document.body.clientWidth;
sky.height = document.body.clientHeight * .8;

if (sky.getContext){
    var skyContext = sky.getContext("2d");

    var radius = 2;

    for(var star = 0; star < 50; star++){ 
        var min = ( Math.random() * 30 + 5 ) / 10;
        var max = sky.width - radius;

        var centerX = Math.floor(Math.random() * (max - min + 1)) + min;
        var centerY = Math.floor(Math.random() * (max - min + 1)) + min;

        skyContext.beginPath();
        skyContext.arc(centerX, centerY, min, 0, 2 * Math.PI);

        skyContext.fillStyle = "rgb(255, 255, 255)";
        skyContext.fill();
    }
}
