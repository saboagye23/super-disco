//Adding Date to Header
var displayCurrentDay=function(){
    var today = moment().format('MMMM Do YYYY');
    console.log(today)
    $("#currentDay").append(today);

    var now=parseInt(moment().format('HH'));
    console.log(now)  
}

var getSchedule=function(){
    var schedule=JSON.parse(window.localStorage.getItem("dailySchedule")) ;
    if (schedule==undefined){
        schedule= generateSchedule();
        window.localStorage.setItem("dailySchedule", JSON.stringify(schedule));
    }

    return schedule;
}

var generateSchedule=function(){
    var schedule={};
    for (var hour= 9; hour<=17; hour++){
       schedule[hour]={
            hour: hour,
            event: ""
        }
    }
    return schedule;
}

var saveSchedule=function(hour, eventName){
    var schedule= getSchedule();
    schedule[hour]={
        hour: hour,
        event: eventName
    }
    window.localStorage.setItem("dailySchedule", JSON.stringify(schedule));
}

var renderSchedule =function(schedule){
    var content = '';
    for (const [hour, hourEvent] of Object.entries(schedule)) {
        // convert 24 hour to 12hour
        var h12 = hour % 12;

        if(h12 === 0){
            h12 = 12;
        }

        // determine if hour is AM or PM
        var hourSymbol = hour % 24 < 12 ? "AM":"PM";
        var eColor =eventColour(hour);
        content += 
        `
        <div class="input-group schedule"> 
              <div class="input-group-prepend hour-label">
                <span class="input-group-text" id="">${h12}${hourSymbol}</span>
              </div>
              <input id="txtEvent-${hour}" type="text" value="${hourEvent.event}" class="form-control event ${eColor}" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-info btn-outline-secondary" type="button" hour="${hour}"><i class="fas fa-lock"></i>
              </div>
            </div>
        `
    }
    $('#display-schedule').html(content);
}

var eventColour= function(hour){
    var currentHour=moment().hour();
    if (currentHour == hour)
        return "current"
    else if (currentHour > hour)
        return "past"    
    else
        return "future"
}

$(document).ready(function(){
    displayCurrentDay();
    var schedule=getSchedule();
    renderSchedule(schedule);

    $(document).on("click", '.schedule button', function(e){
        var hour = $(this).attr('hour');
        var eventName= $(`#txtEvent-${hour}`).val();
        saveSchedule(hour, eventName);
    });
})




