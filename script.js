function getLinearPrice(symbol,index) {
    // 發送AJAX請求
	
	var getdata
    $.ajax({
        url: 'https://api.bybit.com/v5/market/orderbook?category=linear&symbol='+symbol, // 替換成實際的API端點URL
        method: 'GET',
		async: false,
        dataType: 'json',
        success: function (data) {
            // 成功取得資料後，更新網頁上的資料區域
			//console.log(data.result);
			//getLinearPriceUpdate(data);
			getdata=data
			//return data;
            
        },
        error: function () {
            // 處理錯誤情況
            alert('無法取得資料');
        }
    });
	$('#symbol td').eq(index).html(getdata.result.s);
	
	
	$('#sell td').eq(index).html(getdata.result.a[0][0]);
	var td= $('#sell td')
	 flashing(td,index);
	/*aaa.eq(index).addClass("shape-ex1") ;
	setTimeout(function() {
		aaa.eq(index).removeClass("shape-ex1") ;
	  }, 2000 )*/
}

function flashing(td,index) {
		td.eq(index).addClass("shape-ex1") ;
	setTimeout(function() {
		td.eq(index).removeClass("shape-ex1") ;
	  }, 2000 )
	
}

function getSpotPrice(symbol,index) {
    // 發送AJAX請求
	
	var getdata
    $.ajax({
        url: 'https://api.bybit.com/v5/market/orderbook?category=spot&symbol='+symbol, // 替換成實際的API端點URL
        method: 'GET',
		async: false,
        dataType: 'json',
        success: function (data) {
            // 成功取得資料後，更新網頁上的資料區域
			//console.log(data.result);
			//getLinearPriceUpdate(data);
			getdata=data
			//return data;
            
        },
        error: function () {
            // 處理錯誤情況
            alert('無法取得資料');
        }
    });
	
	
	$('#buy td').eq(index).html(getdata.result.a[0][0]);
    var td= $('#buy td')
	 flashing(td,index);


	console.log($('#sell td').eq(index).html());
	$('#sell td').eq(index).val()
	if ($('#sell td').eq(index).html() >0 )
	{ 
		console.log('sell---'+$('#sell td').eq(index).html());
		console.log('buy---'+getdata.result.b[0][0]);
		
		
		var spare = $('#sell td').eq(index).html()/getdata.result.b[0][0]
		$('#spare td').eq(index).html(roundDecimal(spare,5));
		var td= $('#spare td')
	    flashing(td,index);
	}
	
}


function getLinearPriceUpdate(data,count) {
    // 將資料更新到網頁上的資料區域
	var td = document.createElement('td');
	td.textContent = data.result.s;
	
	//$('td').eq(0).html('123');
	$('#symbol td').eq(count).html(data.result.s);
	
	console.log($('td').eq(0));

}

let roundDecimal = function (val, precision) {
  return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
}


function getData(symbolArray) {
  
 //$("table tbody:nth-child(1)").after("<tr><td> Item Second </td></tr>");
	//adding second item after 1st item
 //$("table tbody:last-child").before("<tr><td> Item Just Before Last</td></tr>");
	//adding an item before last item
    //console.log(getLinearPrice('ETHUSDT'));
	
	

	
	for ( i = 0; i < symbolArray.length; i++) {
		getLinearPrice(symbolArray[i],i+1)
	    getSpotPrice(symbolArray[i],i+1);
	}
	/*symbol = 'ETHUSDT'
	getLinearPrice(symbol,1)
	getSpotPrice(symbol,1);
	symbol = 'DOGEUSDT'
	getLinearPrice(symbol,2);
	getSpotPrice(symbol,2);
	symbol = 'ADAUSDT'
	getLinearPrice(symbol,3);
	getSpotPrice(symbol,3);*/

}

function clickClearInterval(){
  window.clearInterval(intervalId);	
}

	var symbolArray = ['ETHUSDT', 'DOGEUSDT','LTCUSDT','XRPUSDT'];
	for (i = 0; i < symbolArray.length; i++) {
		//var td = document.createElement('td');
		$('tr').append(document.createElement('td'));
	}	
	
getData(symbolArray);



var intervalId = setInterval(() => {
          getData(symbolArray);
		  console.log('check data');
        }, 5000);
		

	

