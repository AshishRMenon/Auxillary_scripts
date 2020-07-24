function sendFormByEmail(e) 
{    
  
  var items = e.response.getItemResponses();
  for(var i in items){
    if (items[i].getItem().getTitle()=="Advisor Email Address"){
      var adv_address = items[i].getResponse();
    }
    }
  
  
  data = {}  
  var headers = [
    "Preferred Username",
    "Name",
    "Email Address",
    "Advisor Name",
    "Compute Level",
  ]
  data["Compute Level"] = "L1";
  for(var i in items){
    //Logger.log(i);
    var key = items[i].getItem().getTitle();
    var value = items[i].getResponse();
    if (items[i].getItem().getTitle()=="Advisor Email Address"){ continue; }
    data[key] = value;
  }
  
  var message = "";
  var subject = "[ada][cvit-account] ";
  
  e = {
    namedValues: data
  }
  
  var entries = [];
  for(var i in headers){
    Logger.log(e.namedValues[headers[i]].toString())
    var wrapped = /* '"' + */ e.namedValues[headers[i]].toString() /* +  '"' */;
    entries.push(wrapped);    
  }
  
  var values = entries.join(",")
  var name = headers[1]
  subject += e.namedValues[name].toString() ;
  message += /* headers.join(",") + "\n" +*/ values + "\n";

  //Logger.log(entries);
  //Logger.log(values);
  
  //to = cluster_admin@org.ac.in;
  //cc = data["Email Address"] + ',' + "group_admin@gmail.com" + ',' + adv_address;
  
  
  var csvSegment = "<pre>" + message + "</pre>";
  
  MailApp.sendEmail({
    to: to,
    cc: cc,
    subject:  subject,
    htmlBody: csvSegment,
  })
  
  // MailApp.sendEmail(email, subject, message); 

}