// static variables
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// current date variables
var date = new Date();
var cDate = date.getDate(),
    cMonth = date.getMonth(),
    cYear = date.getFullYear(),
    cMonString = monthNames[cMonth];
var nextYear = cYear,
    nextMonth = cMonth;
var h = date.getHours();
var m = date.getMinutes();
var s = date.getSeconds();
var ms = date.getMilliseconds();

$('.today').find('.day-week').html(days[date.getDay()]);
$('.today').find('.day-num').html(cDate);
// $('.today').find('.time').html(cDate);

function updateMs(){
    $('.today').find('.time').find('.ms').text(ms);
    ms++;
    if(ms > 100){
        ms = 0;
        updateScs();
    }
}

function updateScs(){
    s = checkTime(parseInt(s));
    $('.today').find('.time').find('.scs').text(s);
    s++;
    s = parseInt(s);
    if(s > 59){
        s = 0;
        updateMin();
    }
}
function updatetime(){
    date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ms = date.getMilliseconds();
    updateScs();
    k = setInterval(updateMs, 10);
    updateMin();
    updateHour();  
}
var k;
updatetime();
function main(){
    clearInterval(k);
    updatetime();
}

(function() {
  var hidden = "hidden";

  // Standards:
  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  // IE 9 and lower:
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  // All others:
  else
    window.onpageshow = window.onpagehide
    = window.onfocus = window.onblur = onchange;

  function onchange (evt) {
    main()
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});
})();


function updateHour(){
    h = checkTime(parseInt(h));
    if(h > 12 ){
        $('.today').find('.time').find('.daynight').text("PM");
        h = h%12;
        h = checkTime(parseInt(h));
    } else {
        $('.today').find('.time').find('.daynight').text("AM");
    }
    $('.today').find('.time').find('.hr').text(h); 
    h++;
}
function updateMin(){
    m = checkTime(parseInt(m));
    $('.today').find('.time').find('.min').text(m);
    m++;
    if(m > 59 ){
        m = 0;
        updateHour();
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function temp(year, month) {
    var tempDate = new Date(year, month);
    var tempMonLDate = (new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0)).getDate();
    var date = 1;
    var tempday = tempDate.getDay();
    var dayCount = tempday;
    var ss = 0;

    //update month and year on heading
    $('#calenderView').find('.monthN').text(monthNames[month]);
    $('#calenderView').find('.dayN').text(year);

    $('#calenderView .week').empty();

    while (tempMonLDate >= date) {
        var $li = $("<li class='day'> <span> 1 </span></li>");
            if(dayCount-- > 0){
                $li.find('span').remove();
            } else if(date <= tempMonLDate) {
                $li.find('span').text(date);
                if ((year == cYear) && (month == cMonth) && (cDate == date)) {
                    $li.addClass('now');
                }
                date++;
            } else {
                $li.find('span').remove();
            }
        $('#calenderView .week').append($li);

        // for loop stop - stackoverflow
        ss++;
        if (ss > 100) {
            break;
        }
    }
}

temp(cYear, cMonth);

$('#calenderView .nextMonth').on('click', function(e) {
    e.preventDefault();
    nextMonth++;
    if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
    }
    temp(nextYear, nextMonth);
});

$('#calenderView .preMonth').on('click', function(e) {
    e.preventDefault();
    nextMonth--;
    if (nextMonth < 0) {
        nextMonth = 11;
        nextYear--;
    }
    temp(nextYear, nextMonth);
});

$('.liveMonth').on('click', function(e){
    temp(cYear, cMonth);
    nextYear = cYear;
    nextMonth = cMonth;
    $('.goto').find('.mn').find('option[value="'+cMonth+'"]').prop("selected", true);
    $('.goto').find('.yr').val('');
});

function gotoMonthForm(){
    monthNames.forEach(function(text, index){
        var option = document.createElement('option');
        option.setAttribute('value', index);
        option.innerHTML = text;
        $('.goto').find('.mn').append(option);
    });
    $('.goto').find('.mn').find('option[value="'+cMonth+'"]').prop("selected", true);
}
gotoMonthForm();

/*function gotoYearForm(){
    for(var miny = cYear-200; miny <= cYear+200; miny++){
        var option = document.createElement('option');
        option.setAttribute('value', miny);
        option.innerHTML = miny;
        $('.goto').find('.yr').append(option);
    }
    $('.goto').find('.yr').find('option[value="'+cYear+'"]').prop("selected", true);
}
gotoYearForm();*/

$('.yr').on('keypress', function(e){
    e = (e) ? e : window.event;
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});

$('.onGoto').on('click', function(e){
    nextMonth = parseInt($('.goto').find('.mn').val());
    var yrEntered = parseInt($('.goto').find('.yr').val());
    if( yrEntered < 1500 || yrEntered > 3000 )
        alert('Year range between 1501 to 2999');
    else
        nextYear = yrEntered;
    temp(nextYear, nextMonth);
});
