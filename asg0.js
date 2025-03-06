// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('cnv1');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  let ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color
  let v1 = new Vector3([2.25, 2.25]);
  drawVector(v1, "red");
}


function drawVector(v, color){
  let canvas = document.getElementById('cnv1'); 
  let ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = color;
  let xOrigin = canvas.width / 2;
  let yOrigin = canvas.height / 2;
  let endX = xOrigin + v.elements[0] * 20;
  let endY = yOrigin - v.elements[1] * 20;
  ctx.moveTo(xOrigin, yOrigin);
  ctx.lineTo(endX, endY);
  ctx.stroke();

}

function clearCanvas(){
  var canvas = document.getElementById('cnv1');
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVectors(){
  let x1 = parseFloat(document.getElementById("x1").value);
  let y1 = parseFloat(document.getElementById("y1").value);
  let v1 = new Vector3([x1, y1, 0]);

  let x2 = parseFloat(document.getElementById("x2").value);
  let y2 = parseFloat(document.getElementById("y2").value);
  let v2 = new Vector3([x2, y2, 0]);

  drawVector(v1, "red")
  drawVector(v2, "blue")
}

function handleDrawEvent(){
  clearCanvas()
  drawVectors()
}

function handleDrawOperationEvent(){
  clearCanvas()
  drawVectors()

  let op = document.getElementById("op-selector")
  var value = op.value;

  let x1 = parseFloat(document.getElementById("x1").value);
  let y1 = parseFloat(document.getElementById("y1").value);
  let v1 = new Vector3([x1, y1, 0]);

  let x2 = parseFloat(document.getElementById("x2").value);
  let y2 = parseFloat(document.getElementById("y2").value);
  let v2 = new Vector3([x2, y2, 0]);

  let scalar = parseFloat(document.getElementById("scalar").value);



  switch(value){
    case "add":
      let vAdd = v1.add(v2);
      drawVector(vAdd, "green");
      break;
    case "sub":
      let vSub = v1.sub(v2);
      drawVector(vSub, "green");
      break;
    case "mul":
      let vMul1 = v1.mul(scalar);
      let vMul2 = v2.mul(scalar);
      drawVector(vMul1, "green");
      drawVector(vMul2, "green");
      break;
    case "div":
      let vDiv1 = v1.div(scalar);
      let vDiv2 = v2.div(scalar);
      drawVector(vDiv1, "green");
      drawVector(vDiv2, "green");
      break;
    case "mag":
      let m1 = v1.magnitude();
      let m2 = v2.magnitude();
      console.log(m1);
      console.log(m2);
      break;
    case "norm":
      let v1Norm = v1.normalize();
      let v2Norm = v2.normalize();
      drawVector(v1Norm, "green");
      drawVector(v2Norm, "green");
    case "ang":
      let ang = angleBetween(v1, v2);
      console.log("Angle:", ang);
      break;
    case "area":
      let area = areaTriangle(v1, v2);
      console.log("Area:", area);
  }
}

function angleBetween(v1, v2){
  let dotProd = Vector3.dot(v1, v2);
  let m1 = v1.magnitude();
  let m2 = v2.magnitude();

  let cosA = dotProd / (m1 * m2);

  cosA = Math.min(1, Math.max(-1, cosA));
  let ang = Math.acos(cosA) * (180 / Math.PI);

  return ang;
}

function areaTriangle(v1, v2){
  let crossProd = Vector3.cross(v1,v2);
  let m = crossProd.magnitude();
  let area = 0.5 * m;
  return area;
}