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


var num = randomNum(15,25);
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "list");
  port.onMessage.addListener(function(msg) {
    if (msg.head == "ok"){
		var i = setInterval(function(){
			var date = new Date();
				if(date.getMinutes()%5==0 && date.getSeconds()==30){
					setTimeout(function(){
						port.postMessage({answer: "4"});
					},randomNum(30*1000,60*1000));
					clearInterval(i);
				}
		},100);
	}
  });
});


chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "bet");
  port.onMessage.addListener(function(msg) {
    if (msg.head == "1"){
		if(num>0){
			num=num-1;
			setTimeout(function(){
				port.postMessage({answer: "1"});
			},randomNum(5*1000,10*1000));
		}
		else{
			num=randomNum(15,25);
			setTimeout(function(){
				port.postMessage({answer: "5"});
			},randomNum(5*1000,10*1000));
		}
	}
	if (msg.head == "2"){
		setTimeout(function(){
			port.postMessage({answer: "2"});
		},randomNum(5*1000,10*1000));
	}
	if (msg.head == "3"){
		setTimeout(function(){
			port.postMessage({answer: "3"});
		},randomNum(2*1000,5*1000));
	}
	if (msg.head == "4"){
		var date = new Date();
		var min = date.getMinutes()%5;
		var sec = date.getSeconds();
		var mil = date.getMilliseconds();
		setTimeout(function(){
			port.postMessage({answer: "4"});
		},1000*((4-min)*60-sec)-mil+randomNum(0,3000));
	}
	if(msg.head == "5"){
		setTimeout(function(){
			port.postMessage({answer: "6"});
		},randomNum(2*1000,5*1000));
	}
	if(msg.head == "6"){
		setTimeout(function(){
			port.postMessage({answer: "7"});
		},randomNum(2*1000,5*1000));
	}
  });
});