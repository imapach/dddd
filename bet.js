function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
function Group(num,val){
	this.num = num;
	this.val = val;
}
function xiazhu(){
	var norm_bet = [1,3,6,10,15,21,28,36,45,55,63,69,73,75,75,73,69,63,55,45,36,28,21,15,10,6,3,1];
	//点击清除
	document.querySelector("#form1 > div.content > div.content_middle > div.content > div.border_out1 > div.border_out1_r > div:nth-child(4)").click();
	
	var money = document.querySelector(".sheader_conr > ul:nth-child(1) > li:nth-child(5) > a:nth-child(1) > span:nth-child(1)").innerHTML;
	money = Number(money.split(",").join(""));
	money = Math.floor(money/10);
	//var money=500000;
	//alert(money);
//获取赔率
	var odds = new Array();
	var xmlhttp;
	var s="";
	if (window.XMLHttpRequest)
	{
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			s=xmlhttp.responseText;
		}
	}
	var url = window.location.href;
	url = url.replace("http://www.pceggs.com/play/pg28Insert.aspx?LID=","");
	xmlhttp.open("GET","http://www.pceggs.com/play/pg28mode.aspx?refresh="+url,false);
	xmlhttp.send();
	var arr=s.split(",");
	for(var i=0;i<28;i++){
		odds[i]=Number(arr[i]);
	}
	//alert(odds);
//获取预期收益率 赔率*胜率
	var groups = new Array();
	for(var i=0;i<28;i++){
		groups[i]=new Group(i,odds[i]*norm_bet[i]/1000);
	}
//预期收益率从大到小排序
	groups.sort(function(a,b){
		return b.val-a.val;
	});
//获得要投注的数字
	var result = new Array();
	var rs = 1;
	//var p=0;
	for(var i=0;i<28;i++){
		var val = groups[i].val;
		var pk=0;
		var ak=0;
	  //if (val>rs && val>1){
		if(val>rs){
		//if(p<750){
			result.push(groups[i]);
			for(var j=0;j<result.length;j++){
				var num = result[j].num;
				pk=pk+norm_bet[num]/1000;
				ak=ak+1/odds[num];
			}
			rs = (1-pk)/(1-ak);
			//p=p+norm_bet[groups[i].num];
			//alert(rs);
		}
		else{
			break;
		}
	}

//计算投注额
//27 #panel > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(1) > img
//26 #panel > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(1) > img
//14 #panel > table:nth-child(3) > tbody > tr:nth-child(15) > td:nth-child(1) > img
//0 #panel > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > img

//document.querySelector("#panel > table:nth-child(3) > tbody > tr:nth-child(15) > td:nth-child(4) > input[type="checkbox"]").value="true";
//var total=0;
	//var a=0;
	for(var i=0;i<result.length;i++){
		var num = result[i].num;
		//var bet;
		var bet = Math.floor(money*(norm_bet[num]/1000-rs/odds[num]));
		//var bet = Math.floor(money*(norm_bet[num]/1000-rs/odds[num]));
		/*if(a<100){
			bet = 3*norm_bet[num]*money;
			a=a+norm_bet[num];
		}
		else{
			bet = 2*norm_bet[num]*money;
		}*/
		if (num<14)
		{document.querySelector("#panel > table:nth-child(2) > tbody > tr:nth-child("+(num+2)+") > td:nth-child(1) > img").click();}
		else
		{document.querySelector("#panel > table:nth-child(3) > tbody > tr:nth-child("+(29-num)+") > td:nth-child(1) > img").click();}
		var txt = document.querySelector("#txt"+num);
		txt.focus();
		txt.value=bet;
		txt.blur();
		//total=total+bet;
	}
	document.querySelector("#border_out1_l > span:nth-child(7)").click();//10bei
	//document.querySelector("#border_out1_l > span:nth-child(1)").click();//0.1
	//document.querySelector("#border_out1_l > span:nth-child(7)").click();//10bei
	//document.querySelector("#border_out1_l > span:nth-child(6)").click();//2bei 320,000
	//document.querySelector("#border_out1_l > span:nth-child(6)").click();//640,000
	document.querySelector("#conform_btn").click();
	document.querySelector("#fc_an_l170223").click();
}

//document.querySelector("#form1 > div.content > div.content_middle > div:nth-child(5) > div:nth-child(1) > img").onclick=xiazhu;
//document.onkeypress=xiazhu;

var port = chrome.runtime.connect({name: "bet"});
port.postMessage({head: "1"});
port.onMessage.addListener(function(msg) {
  if (msg.answer == "1"){
	  document.querySelector("#form1 > div.content > div.content_middle > div.content > div:nth-child(2) > div > div:nth-child(2) > a:nth-child("+randomNum(1,3)+")").click();
	  port.postMessage({head: "2"});
  }
  if (msg.answer == "2"){
	  document.querySelector("#conform_btn").click();
	  port.postMessage({head: "3"});
  }
  if (msg.answer == "3"){
	  document.querySelector("#fc_an_r170223").click();
	  port.postMessage({head: "4"});
  }
  if (msg.answer == "4"){
	  xiazhu();
  }
  
  if (msg.answer == "5"){
	  document.querySelector("#form1 > div.content > div.content_middle > div.content > div:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(1)").click();
	  port.postMessage({head: "5"});
  }
  if (msg.answer == "6"){
	  document.querySelector("#conform_btn").click();
	  port.postMessage({head: "6"});
  }
  if (msg.answer == "7"){
	  document.querySelector("#fc_an_l170223").click();
  }
});