function draw_blocks(ctx,blocks)
{
    for(var x in blocks)
    {
    	var block=blocks[x];
    	roundedFilledRect(ctx,block.locx,block.locy,block.width,block.length,block.radius,block.color);
    }
}

function draw_storages(ctx,storages)
{
    for(var x in storages)
    {
    	var storage=storages[x];
    	roundedFilledRect(ctx,storage.locx,storage.locy,storage.width,storage.length,storage.radius,storage.color);
    }
}

function draw_doors(ctx,doors)
{
    for(var x in doors)
    {
    	var door=doors[x];
    	roundedFilledRect(ctx,door.locx,door.locy,door.width,door.length,door.radius,door.color);
    }
}


/**
 * A utility function to draw a rectangle with rounded corners. 
 */
function roundedRect(ctx,x,y,width,length,radius)
{
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+length-radius);
  ctx.quadraticCurveTo(x,y+length,x+radius,y+length);
  ctx.lineTo(x+width-radius,y+length);
  ctx.quadraticCurveTo(x+width,y+length,x+width,y+length-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.stroke();
}

/**
 * A utility function to draw a filled rectangle with rounded corners. 
 */
function roundedFilledRect(ctx,x,y,w,l,r,color)
{
  ctx.beginPath();
  ctx.moveTo(x,y+r);
  ctx.lineTo(x,y+l-r);
  ctx.quadraticCurveTo(x,y+l,x+r,y+l);
  ctx.lineTo(x+w-r,y+l);
  ctx.quadraticCurveTo(x+w,y+l,x+w,y+l-r);
  ctx.lineTo(x+w,y+r);
  ctx.quadraticCurveTo(x+w,y,x+w-r,y);
  ctx.lineTo(x+r,y);
  ctx.quadraticCurveTo(x,y,x,y+r);
  
  var radgrad = ctx.createRadialGradient(x+w/3,y+l/3,w/8+l/8,x+3*w/4,y+3*l/4,w+l);
  radgrad.addColorStop(0, '#A4A7A8');
  radgrad.addColorStop(0.5, color);
  
  ctx.fillStyle=radgrad;
  ctx.fill();
}


function drawSpirograph(ctx,R,r,O)
{
	var x1 = R-O;
	var y1 = 0;
	var i  = 1;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	do{
		if (i>20000) break;
		var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72));
		var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72));
		ctx.lineTo(x2,y2);
		x1 = x2;
		y1 = y2;
		i++;
		}
	while (x2 != R-O && y2 != 0 );
	ctx.stroke();
}


function drawStar(ctx,x,y,r,color)
{
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(x,y);
	for (var i=0;i<9;i++)
	{
		ctx.rotate(Math.PI/5);
		if(i%2 == 0)
		{
			ctx.lineTo((r/0.525731)*0.200811,y);
		}
		else
		{
			ctx.lineTo(x,y);
		}
	}
	ctx.closePath();
	ctx.fill(color);
	ctx.restore();
}