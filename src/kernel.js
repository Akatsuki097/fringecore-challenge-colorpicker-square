export const kernelFunction = function (width, height, hue) {
  const imageSize = width * height;
  const imageDataLength = imageSize * 4;
  const i = this.thread.x;

  const y = Math.floor(i / (height * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;


  const distanceFromCorner = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  const normalizedDistance = distanceFromCorner / Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  
  const verticalDistance = Math.abs(y - height ) / (height );
  const horizontalDistance = Math.abs(x  ) / (width );
  const dist = verticalDistance * horizontalDistance;


  if(channel == 0){
    return 255*(1-hue)*dist;
  } else if(channel == 1){ 
    if(hue <= 0.5){
      var temphue = 2*hue;
      return 255 * temphue* dist;
    } else {
      return 255*2*(1-hue)* dist;
    }
  } else if(channel == 2){
    return 255 * hue * dist;
  } else if ( channel == 3){
    return 255*normalizedDistance*1.25;
  }


};
