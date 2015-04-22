function frequency(str){
    var freq={};
    for(var i in str){
        if(str[i] in freq)
	    freq[str[i]] +=1;
	else
	    freq[str[i]] = 1;
    }
    return freq;
}

function sortfrequency(frequency){
    var tuples=[];
    for(var key in frequency){ tuples.push( [frequency[key],key] );}
    tuples.sort();
    return tuples;
}

function sortar(a){
	var array=[];
	var t=a.length;
	while(t>0){
	for(var i=0;i<a.length;i++){
		if(typeof(a[i+1])!="undefined"){
		if(a[i][0]>a[i+1][0]){
			var t=a[i];
			a[i]=a[i+1];
			a[i+1]=t;
		}}
	}
	t=t-1;
	}
	return a;
	
}
		
function buildtree(tuples){
    while(tuples.length>1){
	var leasttwo=tuples.slice(0,2);
	var rest = tuples.slice(2,tuples.length+1);
	var combfreq=leasttwo[0][0] +leasttwo[1][0];
	var s=[combfreq,leasttwo]
	var tuples=rest.concat([[combfreq,leasttwo]]);
	sortar(tuples);
    }
    return tuples[0];    
}

function node(l,r){
 return {
	left:(typeof l !== 'undefined' ? l : null),
	right:(typeof r !== 'undefined' ? r : null)};
 }


function build(tup){
	if(typeof(tup[1])=="string"){return tup[1];}
	else{
	return node(build(tup[1][0]),build(tup[1][1]))
        }
}
var codes={};
function code(node,pat){
	if(typeof(node)=="string"){codes[node]=pat;}
	else{
		code(node["left"],pat+"0");
		code(node["right"],pat+"1");
	}
	
}
function encode(str){
	var output="";
	for(var i in str){
		output+=codes[str[i]];
	}
	return output
}
function decode(tree,str){
	output="";
	p=tree;
	for(var i in str){
		if(str[i]==0){ p=p["left"];}
		else{p=p["right"]}
		if(typeof(p)=="string"){
			output+=p;
			p=tree;
		}
	}
	return output;
}
str="aaabccdeeeeeffg"
var f=frequency(str);
var t=sortfrequency(f);
var bt=buildtree(t);

var tr=build(bt)
code(tr,"");
var out=encode(str);
console.log("code: ",out);
console.log("decoded string: ",decode(tr,out));




