function getRandomColor() {
    var letters = '012345678'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 9)];
    }
    return color;
}

function getLighterColor(color)
{
	var letters=color.split('');
	var result="#";
	for (var i=1;i<7;i++)
	{
		var new_letter=parseInt(color[i])+1;
		result+=""+new_letter;
	}
	return result;
}

function transform_to_sum(data_array,sum_column,filter_column)
{
	var result=new Array();
	for(var i=0; i<data_array.length;i++)
	{
		var new_obj=new Object();
		new_obj.label=data_array[i][filter_column];
		new_obj.value=parseInt(data_array[i][sum_column]);
		for(var j=i+1;j<data_array.length;j++)
		{
			if(data_array[j][filter_column]==new_obj.label)
			{
				new_obj.value+=parseInt(data_array[j][sum_column]);
				data_array.splice(j,1);
				j-=1;
			}
		}
		result.push(new_obj);
	}
	return result;
}


function transform_to_pie_sum(data_array,sum_column,filter_column)
{
	var result=new Array();
	for(var i=0; i<data_array.length;i++)
	{
		var new_obj=new Object();
		new_obj.label=data_array[i][filter_column];
		new_obj.value=parseInt(data_array[i][sum_column]);
		new_obj.color=getRandomColor();
		new_obj.highlight=getLighterColor(new_obj.color);
		for(var j=i+1;j<data_array.length;j++)
		{
			if(data_array[j][filter_column]==new_obj.label)
			{
				new_obj.value+=parseInt(data_array[j][sum_column]);
				data_array.splice(j,1);
				j-=1;
			}
		}
		result.push(new_obj);
	}
	return result;
}

function transform_to_pie_count(data_array,filter_column)
{
	var result=new Array();
	for(var i=0; i<data_array.length;i++)
	{
		var new_obj=new Object();
		new_obj.label=data_array[i][filter_column];
		new_obj.value=1;
		new_obj.color=getRandomColor();
		new_obj.highlight=getLighterColor(new_obj.color);
		for(var j=i+1;j<data_array.length;j++)
		{
			if(data_array[j][filter_column]==new_obj.label)
			{
				new_obj.value+=1;
				data_array.splice(j,1);
				j-=1;
			}
		}
		result.push(new_obj);
	}
	return result;
}

function transform_to_bar_sum(data_array,label_display,sum_column,label_column)
{
	var result=new Object();
	result.datasets=new Array();
	result.datasets[0]=new Object();
	result.datasets[0].label=label_display;
	result.datasets[0].fillColor=getRandomColor();
	result.datasets[0].strokeColor=result.datasets[0].fillColor;
	result.datasets[0].highlightFill=getLighterColor(result.datasets[0].fillColor);
	result.datasets[0].highlightStroke=getLighterColor(result.datasets[0].fillColor);
	result.datasets[0].data=new Array();
	result.labels=new Array();
	
	for(var i=0; i<data_array.length;i++)
	{
		for(var j=i+1;j<data_array.length;j++)
		{
			if(data_array[j][label_column]==data_array[i][label_column])
			{
				data_array[j][sum_column]=parseFloat(data_array[i][sum_column])+parseFloat(data_array[j][sum_column]);
				data_array.splice(j,1);
				j-=1;
			}
		}
	}
	
	data_array.sort(function(a,b)
	{
		if(parseFloat(a[sum_column])>parseFloat(b[sum_column]))
			return -1;
		else
			return 1;
	});
	
	for(var i=0; i<data_array.length && i<11;i++)
	{
		result.labels.push(data_array[i][label_column]);
		result.datasets[0].data.push(parseInt(data_array[i][sum_column]));
	}
	return result;
}


function transform_to_sum_2columns(data_array,sum_column,filter_column1,filter_column2)
{
	var result=new Array();
	for(var i=0; i<data_array.length;i++)
	{
		var new_obj=new Object();
		new_obj[filter_column1]=data_array[i][filter_column1];
		new_obj[filter_column2]=data_array[i][filter_column2];
		new_obj[sum_column]=parseInt(data_array[i][sum_column]);
		for(var j=i+1;j<data_array.length;j++)
		{
			if(data_array[j][filter_column1]==new_obj[filter_column1] && data_array[j][filter_column2]==new_obj[filter_column2])
			{
				new_obj[sum_column]+=parseInt(data_array[j][sum_column]);
				data_array.splice(j,1);
				j-=1;
			}
		}
		result.push(new_obj);
	}
	return result;
}