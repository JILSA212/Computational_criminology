    function CBD([i,j],[a,b]) {
        d = (Math.abs(i-a)+Math.abs(j-b));
        return d;
    }

    var M = [];
    //var B = 5.0
    //var f = 0.67
    //var g = 0.49
    //var Loc = [[3,17],[15,3],[1,10]];
    //var B = 1.0
    //var B = document.getElementById("myRange").value;
    //console.log(B);
    var B = 5.0;
    var f = 0.67;
    var g = 0.49;
    //var Loc = [[12,17],[5,10],[19,5],[22,7],[4,1]];
    var sum_x=0, sum_y=0, center_x, center_y, chosen_x = 0, chosen_y = 0;
    var d,ans,finans;
    var temp=[], final=[];
    var scale1 = document.getElementById("myRange1");
    var scale2 = document.getElementById("myRange2");
    var scale3 = document.getElementById("myRange3");
    var Loc = [];
    var locations = new Array();
    locations = JSON.parse(localStorage.getItem("sgp_locs"));


    function calculate()
    {
        temp = [];
        final = [];
        M = [];
        d = 0;
        ans = 0;
        finans = 0;
        B = scale1.value;
        f = scale2.value;
        g = scale3.value;
        Loc = [];
        
        for(var i = 0 ; i < locations.length ; i++)
        {
            chosen_x = parseInt(locations[i]["lat"]);
            chosen_y = parseInt(locations[i]["lng"]);
            var temp_arr = [];
            temp_arr.push(((locations[i]["lat"]-parseInt(locations[i]["lat"])).toFixed(2))*100);
            temp_arr.push(((locations[i]["lng"]-parseInt(locations[i]["lng"])).toFixed(2))*100);
            Loc.push(temp_arr);
        }  
        
        for(var i = 0 ; i < Loc.length ; i++)
        {
            sum_x += Loc[i][0];
            sum_y += Loc[i][1];
        }
        center_x = sum_x/Loc.length;
        center_y = sum_y/Loc.length;
        
        for (var i = 0 ; i < 100; i++) {
            for (var j = 0 ; j < 100; j++) {
                finans = 0;
                for (var k = 0 ; k < Loc.length; k++) {
                    d = CBD([i,j],[Loc[k][0],Loc[k][1]]);
                    if (d > B) {
                        ans = (1/Math.pow(d,f));
                    }
                    else{
                        ans = (Math.pow(B,g-f))/(Math.pow((2*B)-d),g);
                    }
                    finans += ans;
                }

                M.push([i,j,finans.toFixed(2)]);
            }
        }
        /*for (var p = 0; p < M.length; p++) {
            document.write(M[p]+"<br>");	
        }*/

        for(var i = 0; i < M.length; i++)
        {
            temp.push(parseFloat(M[i][2]));
            if(temp.length!=0 && i%100==0)
            {
                //console.log(temp);
                final.push(temp);
                temp = [];
            }
        }
        //console.log(Loc);
        plot();
    }
    
calculate();



function plot()
{
    //z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
    var data = [
        {
            z: final,
            type: 'heatmap',
            opacity: 1,
            zsmooth: 'best',
        }
    ];

    var layout = {
        xaxis: {
            /*autotick: false,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.25,
            ticklen: 8,
            tickwidth: 4,
            tickcolor: '#000'*/
            visible: false,
            zeroline: false,
            showgrid: false,
        },
        yaxis: {
            /*autotick: false,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.25,
            ticklen: 8,
            tickwidth: 4,
            tickcolor: '#000'*/
            visible: false,
            zeroline: false,
            showgrid: false,
        }
    }

    Plotly.newPlot('myDiv', data, layout);
}

plot();







scale1.addEventListener('change', calculate);
scale2.addEventListener('change', calculate);
scale3.addEventListener('change', calculate);