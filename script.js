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
	
	//console.log(symbol +getdata); 
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
		console.log('buy---'+getdata.result.a[0][0]);
		
		
		var spare = $('#sell td').eq(index).html()/getdata.result.a[0][0]
		$('#spare td').eq(index).html(roundDecimal(spare,5));
		var td= $('#spare td')
	    flashing(td,index);
	}
	
}



function getHistoryRate(symbol,index) {
    // 發送AJAX請求
	
	var getdata
    $.ajax({
        //url: 'https://api.bybit.com/v5/market/funding/history?category=linear&limit=1&symbol='+
		url: 'https://api.bybit.com//v5/market/tickers?category=linear&symbol='+
		
		symbol , // 替換成實際的API端點URL
        method: 'GET',
		async: false,
        dataType: 'json',
        success: function (data) {
            // 成功取得資料後，更新網頁上的資料區域
			//console.log(data.result);
			//getLinearPriceUpdate(data);
			getdata=data
            
        },
        error: function () {
            // 處理錯誤情況
            alert('無法取得資料');
        }
    });
		
	 	
	 
	 var rate = getdata.result.list[0].fundingRate
	 rate = roundDecimal(rate*100,4)
	 
	 $('#history_rate td').eq(index).html(rate);
		var td= $('#history_rate td')
	    flashing(td,index);
	//history_rate
}

function gitdealtest() {
    // 發送AJAX請求
	
	var getdata
    $.ajax({
        //url: 'https://api.bybit.com//v5/execution/list?category=linear&limit=1', //
		url: 'https://api.bybit.com/v3/public/time', 
		
        method: 'GET',
		/*headers: { 'X-BAPI-SIGN': 'JmOoeEC96UP8bCibVP',
					'X-BAPI-API-KEY': 'YIbWzkLD6ZNic2omdbOTwE7Evmi8Oxa8cjkK',
					 "Content-Type" : "application/json"},*/
		async: false,
        dataType: 'json',
        success: function (data) {
            // 成功取得資料後，更新網頁上的資料區域
			//console.log(data.result);
			//getLinearPriceUpdate(data);
			getdata=data
			console.log(data.time);
			//return data;
            
        },
        error: function (data) {
            // 處理錯誤情況
			console.log(data);
            alert('無法取得資料');
        }
    });
	
	
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


var cancel;
function getData_5s(symbolArray,i) {  
	var mydate = new Date();
    $('#time').html(mydate.toLocaleString( ));
	//var symbolArray = ['ETHUSDT', 'ETHUSDT'];
	/*for ( i = 0; i < symbolArray.length; i++) {
		getLinearPrice(symbolArray[i],i+1)
	    getSpotPrice(symbolArray[i],i+1);
	}*/
	
	if (i== symbolArray.length){
		i=0
	}
	getLinearPrice(symbolArray[i],i+1)
	getSpotPrice(symbolArray[i],i+1);
	
	if (cancel!= "cancel"){
		setTimeout(function() {
		getData_5s(symbolArray,i+1)
	  }, 800 )
	}
	
	
}

function getData_30s(symbolArray,i) {
  
	//var symbolArray = ['ETHUSDT', 'ETHUSDT'];
	/*for ( i = 0; i < symbolArray.length; i++) {
		getHistoryRate(symbolArray[i],i+1);
	}
	if (i= symbolArray.length){
		i=0
	}*/
	if (i== symbolArray.length){
		i=0
	}
	getHistoryRate(symbolArray[i],i+1);
	
	if (cancel!= "cancel"){
		setTimeout(function() {
		getData_30s(symbolArray,i+1)
	  }, 3000 )
	}
		
		
	
}



function clickClearInterval(){
  //window.clearInterval(intervalId);	
  //window.clearInterval(interval_30s);	
  cancel="cancel";
  console.log(cancel);
  
}

var symbolArray = ['BTCUSDT','ETHUSDT', 'DOGEUSDT','LTCUSDT','XRPUSDT','LINKUSDT','ADAUSDT','EOSUSDT','BNBUSDT'];
for (i = 0; i < symbolArray.length; i++) {
	$('tr').append(document.createElement('td'));
}	


var mydate = new Date();
$('#time').html(mydate.toLocaleString( ));
getData_5s(symbolArray,i);
getData_30s(symbolArray,i);

//gitdealtest()
/*var intervalId = setInterval(() => {
          var mydate = new Date();
	      $('#time').html(mydate.toLocaleString( ));
	      //flashing($('#time'),0);
          getData_5s(symbolArray,0);
		  console.log('check data');
		  $('#count').html(Number($('#count').html())+1);
		  if ($('#count').html()>100){
			  clickClearInterval();
		  }
        }, 1000);
		
var interval_30s = setInterval(() => {
          var mydate = new Date();
	      $('#time').html(mydate.toLocaleString( ));
	      //flashing($('#time'),0);
          getData_30s(symbolArray);
		  console.log('rate');
        }, 30000);		*/
		
 //window.clearInterval(intervalId);	
 //window.clearInterval(interval_30s);	
	

