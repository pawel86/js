/*example code*/

function showNoGameError() {
	if(window.location.pathname == /games/) {
		var numberItems = 0;
		var numberDisabled = 0;
		$('.gameitem').each(function (index) {
			numberItems++;
			if ($(this).hasClass("disabled")) {
				numberDisabled++;
			}
		});
		if($('.gameitem').each > 0) {
			console.log('we dont have games like your search');
		}
	}
}
showNoGameError();
				
d2d.analogmeasure=function()
{
	d2d.ImageFigure.call(this,"measurments/Analogmeasure.png");
	var oThis = this; 
	oThis.setSelectable(false); // hide selectable border
	oThis.setDeleteable(false);
	oThis.setId("AnalogMeas");	 /* can't connect both AnalogMeas. */
	oThis.html.style.cursor="auto";
	oThis.inputPort=null;
	oThis.range=null;
	oThis.value = null;
	oThis.valuePort1 = null;
	oThis.valuePort2 = null;
	oThis.showingControl = 1;
	oThis.connectControl = null;
	oThis.FirstPortId=null; //first port id
	oThis.LastPortId=null; //second port id
	oThis.Sign=null;
	oThis.internalRes = 2000000;
	oThis.setDimension(261,329);
	oThis.i=0;
	oThis.j=0;
	var delay = 20; // z 20
 	var func = function(){oThis.measFunc();};			//period measure function
	oThis.timer = window.setInterval(func,delay);		//set timer interval	
	oThis.whatConected=null;
	oThis.whatFirstPort=null;
	oThis.whatLastPort=null;
	oThis.tmpValue = 0; //need to check if something change
	oThis.tmpRange = 750;
	return oThis;
};

d2d.analogmeasure.prototype=new d2d.ImageFigure();
d2d.analogmeasure.prototype.type="d2d.analogmeasure";

d2d.analogmeasure.prototype.setWorkflow=function(workflow){
d2d.ImageFigure.prototype.setWorkflow.call(this,workflow);
var oThis=this;
	if(workflow!==null&&oThis.inputPort===null)
		{
			oThis.inputPort=new d2d.MyInputPort();
			oThis.inputPort.setWorkflow(workflow);
			oThis.inputPort.setBackgroundColor(new d2d.Color(0, 0, 0));
			oThis.inputPort.setColor(new d2d.Color(255, 105, 105));
			oThis.inputPort.setDimension( 20,20);
			oThis.inputPort.setName("AnalogMeasPortPlus");
			oThis.addPort(oThis.inputPort,52, 25);
			oThis.inputPort1=new d2d.MyInputPort();
			oThis.inputPort1.setWorkflow(workflow);
			oThis.inputPort1.setBackgroundColor(new d2d.Color(0, 0, 0));
			oThis.inputPort1.setColor(new d2d.Color(95, 95, 95));
			oThis.inputPort1.setDimension( 20,20);
			oThis.inputPort1.setName("AnalogMeasPortMinus");
			oThis.addPort(this.inputPort1,218, 25);
		}
		
		oThis.indicator = new d2d.Rectangle(230,130);
		oThis.indicator.setPosition(14,106);
		oThis.indicator.setLineWidth(0);
		oThis.indicator.setId("indicator");
		oThis.html.appendChild(oThis.indicator.getHTMLElement());
		var workflow2  = new d2d.Workflow("indicator");
		workflow2.html.style.backgroundImage="url('measurments/scala.png')";
		oThis.point = new d2d.indicator();
		oThis.point.setWorkflow(workflow2);
		workflow2.addFigure(oThis.point);
		
		oThis.indicator8 = new d2d.Rectangle(27,27);
		oThis.indicator8.setPosition(110,20);
		oThis.indicator8.setId("selector8"); 
		oThis.indicator8.setLineWidth(0);
		oThis.html.appendChild(oThis.indicator8.getHTMLElement());
		var workflow10  = new d2d.Workflow("selector8"); // add new workflow
		workflow10.html.style.backgroundImage="none";
		oThis.point8 = new d2d.AnalogSel();
		oThis.point8.setWorkflow(workflow10);
		workflow10.addFigure(oThis.point8);
	};

d2d.analogmeasure.prototype.showScheme=function() 
{
	var oThis = this;
	var url = oThis.url;
	var anotherUrl = "Scheme"+url;		

	if (oThis.showingControl ==1)
	{
		var imageSchemeName = "Scheme"+oThis.url;
		oThis.html.style.backgroundImage="url("+imageSchemeName+")";
		oThis.indicator.html.style.visibility="hidden";
		oThis.indicator8.html.style.visibility="hidden";
		oThis.showingControl=!oThis.showingControl;
	}
	else
	{
		oThis.html.style.backgroundImage="url("+url+")";
		oThis.indicator.html.style.visibility="";
		oThis.indicator8.html.style.visibility="";
		oThis.showingControl=!oThis.showingControl;
	}
};

d2d.analogmeasure.prototype.ResetDevice=function(level)
{
	if(level == 1)
	{
	var oThis = this; 
	
	oThis.valuePort1 = null;
	oThis.valuePort2 = null;
	oThis.connectControl = null;
	oThis.Sign=null;	
	oThis.point.setValue75(0);
	}
	if(level == 2) 
	{}
	
	if(level == 3)
	{
	var oThis = this; 
	oThis.setSelectable(false);
	oThis.setId("AnalogMeas");
	oThis.html.style.cursor="auto";
	oThis.value = null;
	oThis.valuePort1 = null;
	oThis.valuePort2 = null;
	oThis.showingControl = 1;
	oThis.connectControl = null;
	oThis.FirstPortId=null;
	oThis.LastPortId=null;
	oThis.Sign=null;
	oThis.whatConected=null;
	oThis.whatFirstPort=null;
	oThis.whatLastPort=null;
	oThis.tmpValue = 0;
	}
}

d2d.analogmeasure.prototype.doNothingIfEmpty=function()
{
	if(this.whatFirstPort==null && this.whatLastPort==null){
	return true;
	}
	else if(this.whatFirstPort==null || this.whatLastPort==null){
	return true;
	}
	else
	{
	return false;}
	
}

d2d.analogmeasure.prototype.measFunc=function()
{
	var oThis = this;
	var range = oThis.point8.getValue();
	var iP2=oThis.inputPort.getValue();
	var iP3=oThis.inputPort1.getValue();	
	oThis.checkPorts();//check ports
		
			if(oThis.getSign()){val = iP2*(-1); val = iP2*(-1);}
			else {val = iP3; val = iP2;}
			
		if(!oThis.getConectControl())	return;
		if(oThis.doNothingIfEmpty()){	 return};
			if(range == 750 || range == 75 || range == 7.5 || range == 0.75)
			{
			if(oThis.tmpValue == iP2 && oThis.tmpValue == iP3 && oThis.tmpRange==range ) return;
				switch (range)
				{
					case 750:
						oThis.point.setValue75(val*0.1);
						break;
					case 75:
						oThis.point.setValue75(val);
						break;
					case 7.5:
						oThis.point.setValue75(val*10);
					break;
					case 0.75:
						oThis.point.setValue75(val*100);
					break;
					default:
						oThis.point.setValue75(0);
				}
					oThis.tmpValue = val;
					oThis.tmpValue = val;
					oThis.tmpRange=range
			}		
			else
			{
			
			if(oThis.tmpValue == iP2 && oThis.tmpValue == iP3 && oThis.tmpRange==range ) return;
				switch (range)
				{
					case 300:
					oThis.point.setValue30(val*0.1);
					break;
					case 150:
					oThis.point.setValue30(val*0.2);
					break;
					case 30:
					oThis.point.setValue30(val);
					break;
					case 15:
					oThis.point.setValue30(val*2);
					break;
					case 3:
					oThis.point.setValue30(val*10);
					break;
					case 1.5:
					oThis.point.setValue30(val*20);
					break;
					case 0.3:
					oThis.point.setValue30(val*100);
					break;
					case 0.15:
					oThis.point.setValue30(val*200);
					break;
					default:
					oThis.point.setValue30(val);
				}
					oThis.tmpValue = iP2;
					oThis.tmpValue = iP3;
					oThis.tmpRange=range
			}

};

d2d.analogmeasure.prototype.checkPorts=function()
{
	var oThis = this;
	var fstId = oThis.FirstPortId;
	var secId = oThis.LastPortId;
	var firstPort = oThis.getFirstPort();
	var lastPort = oThis.getLastPort();
	
	if (fstId != null && secId != null && fstId == secId)
	{
		if (firstPort!=null&&lastPort!=null)
		{
			oThis.setConectControl(true);
			return true;
		}
		else 
		{
			oThis.setConectControl(false);
			return false;
		}
	}
	else if ((fstId != null && secId != null) && (fstId =="MeasSupply" && secId == "DecadeMeas")||(secId =="MeasSupply" && fstId == "DecadeMeas"))
	{
		if (firstPort!=null&&lastPort!=null)
		{
			oThis.setConectControl(true);
			return true;
		}
		else {
		oThis.setConectControl(false);
		return false;}
	}
	else if (fstId != null && secId != null && fstId != secId)
	{
		return false;
	}
	else 
	{
		return;
	}
};

d2d.analogmeasure.prototype.getContextMenu=function()
{
	var menu=new d2d.Menu();
	
	var oThis=this;	
	if (oThis.tmpValue==0)
	tmpV=0.0000001;
	else 
	tmpV = oThis.tmpValue;
	var deltU = 0.5*oThis.tmpRange/100;
	deltU = deltU.toFixed(2);
	var deltU2 = deltU/oThis.tmpValue;
	deltU2 = deltU2.toFixed(3);
	if(deltU2=="Infinity") deltU2=0;
	menu.appendMenuItem(new d2d.MenuItem("Symbol/Obraz",null,function()
	{
		oThis.showScheme();
	}));
		menu.appendMenuItem(new d2d.MenuItem("Parametry urządzenia",null,function(){win4 = window.open("", "Window4", "width=480,height=450,scrollbars=no");
		win4.document.writeln("<h3>Parametry pomiaru</h3>");	
		win4.document.writeln("<ul><li>Obecny zakres przyrządu: " + oThis.tmpRange + "</li><li>Rezystancja wewnętrzna"+ (1000*oThis.tmpRange) +" Ω/V </li><li>Wartość napięcia : " + oThis.tmpValue + "</li><li>Klasa przyrządu: 0.5</li><li>Obliczenia błędów:</li><li>Graniczny błąd bezwzględny pomiaru: &#916;U = &#177; "+ deltU +" V</li><li>Graniczny błąd względny pomiaru: &#948;U = "+ deltU2 +" %</li><li>Ostateczny wynik pomiaru: U = " +oThis.tmpValue + " &#177; "+ deltU +" V </li></ul>");
		win4.document.writeln('<h4>Wzory z których skorzystano przy obliczeniach:</h4>');
		win4.document.writeln('<div style="text-align:center;"><img src="measurments/bladgranicznybezanalog.gif" alt="bladgranicznybezanalog"/> <br/> <img src="measurments/bladgranicznywzganalog.gif" alt="bladgranicznywzganalog"/></div>');
		win4.document.writeln('<a href="javascript:self.close()">Zamknij okno</a>');}));
	return menu;
};

d2d.analogmeasure.prototype.setValue=function(tmpVal){this.value = tmpVal;};
d2d.analogmeasure.prototype.getValue=function(){return this.value;};
d2d.analogmeasure.prototype.onRemove=function(){window.clearInterval(this.timer);};
d2d.analogmeasure.prototype.setWhatConected = function(id){this.whatConected=id;};
d2d.analogmeasure.prototype.getWhatConected = function(){return this.whatConected;};
d2d.analogmeasure.prototype.setFirstPort	= function(namePort){this.whatFirstPort=namePort;};
d2d.analogmeasure.prototype.getFirstPort = function(){return this.whatFirstPort;};
d2d.analogmeasure.prototype.setLastPort = function(namePort){this.whatLastPort=namePort;};
d2d.analogmeasure.prototype.getLastPort = function(){return this.whatLastPort;};
d2d.analogmeasure.prototype.setFirstPortId = function(id){this.FirstPortId=id;};
d2d.analogmeasure.prototype.setLastPortId = function(id){this.LastPortId=id;};
d2d.analogmeasure.prototype.setConectControl = function(/*boolean*/ state){this.connectControl = state;};
d2d.analogmeasure.prototype.getConectControl = function(){return this.connectControl;};
d2d.analogmeasure.prototype.setSign = function(/*boolean*/ state){this.Sign=state;};
d2d.analogmeasure.prototype.getSign = function(){return this.Sign;};
