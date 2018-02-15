// static variables
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// current date variables
var date = new Date();
var cDate = date.getDate(),
    cMonth = date.getMonth(),
    cYear = date.getFullYear(),
    cMonString = monthNames[cMonth];
var nextYear = cYear,
    nextMonth = cMonth;

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
            } else if (/*(index == (dayCount % 7)) &&*/ (date <= tempMonLDate)) {
                $li.find('span').text(date);
                if ((year == cYear) && (month == cMonth) && (cDate == date)) {
                    $li.addClass('now');
                }
                date++;
                // dayCount++;
            } else {
                $li.find('span').remove();
            }
        // });
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

$('#calenderView .monthTitle').on('dblclick', function(e) {
    e.preventDefault();
    showmnView();
});

$('#calenderView .yearTitle').on('dblclick', function(e) {
    e.preventDefault();
    decadeForm(parseInt($(this).text()));
    showyrView();
});

$('#monthOverView').find('.monthBack').on('click', function(e){
    e.preventDefault();
    nextYear = parseInt($('#calenderView').find('.yearTitle').text());
    showCldView();
});

function showCldView(){
    $('#calenderView').show(1000);
    $('#yearOverView').hide(1000);
    $('#monthOverView').hide(1000);
}

function showyrView(){
    $('#calenderView').hide(1000);
    $('#yearOverView').show(1000);
    $('#monthOverView').hide(1000);
}

function showmnView(){
    $('#calenderView').hide(1000);
    $('#yearOverView').hide(1000);
    $('#monthOverView').show(1000);
    formMonth();
}

function formMonth(){
    $('#monthOverView').find('.viewyrView').html(nextYear);
}

$('#monthOverView').find('.onMonth').on('click', function(e){
    e.preventDefault();
    showCldView();
    nextMonth = parseInt($(this).attr('data-month-no'));
    temp(nextYear, nextMonth);
});

$('#monthOverView').find('.prevYear').on('click', function(e){
    e.preventDefault();
    nextYear--;
    $('#monthOverView').find('.viewyrView').text(nextYear);
});

$('#monthOverView').find('.nextYear').on('click', function(e){
    e.preventDefault();
    nextYear++;
    $('#monthOverView').find('.viewyrView').text(nextYear);
});

$('#yearOverView').find('.yrBack').on('click', function(e){
    e.preventDefault();
    nextYear = parseInt($('#calenderView').find('.yearTitle').text());
    showCldView();
});

$('#monthOverView').find('.viewyrView').on('dblclick', function(e){
    e.preventDefault();
    decadeForm(parseInt($(this).text()));
    showyrView();
});

$('#yearOverView').find('.yrText').on('click', function(e){
    nextYear = parseInt($(this).attr('data-yr'));
    showmnView();
});

function decadeForm(year){
    var s = year%10;
    var content;
    if(s == 0)
        content = year-10;
    else
        content = year-s;
    $('.yrText').each(function(e){
        content++;
        $(this).text(content);
        $(this).attr('data-yr',content);
    });
}

$('#yearOverView').find('.prevDecade').on('click', function(e){
    var ds = parseInt($('.yrText:first').text()) - 10;
    decadeForm(ds);
});

$('#yearOverView').find('.nextDecade').on('click', function(e){
    var ds = parseInt($('.yrText:first').text()) + 10;
    decadeForm(ds);
});

$('.liveMonth').on('click', function(e){
    temp(cYear, cMonth);
    nextYear = cYear;
    nextMonth = cMonth;
    showCldView();
});

function gotoMonthForm(){
    monthNames.forEach(function(text, index){
        var option = document.createElement('option');
        option.setAttribute('value', index);
        option.innerHTML = text;
        $('.goto').find('.month').append(option);
    });
    $('.goto').find('.month').find('option[value="'+cMonth+'"]').prop("selected", true);
}
gotoMonthForm();

function gotoYearForm(){
    for(var miny = cYear-200; miny <= cYear+200; miny++){
        var option = document.createElement('option');
        option.setAttribute('value', miny);
        option.innerHTML = miny;
        $('.goto').find('.year').append(option);
    }
    $('.goto').find('.year').find('option[value="'+cYear+'"]').prop("selected", true);
}
gotoYearForm();

$('.onGoto').on('click', function(e){
    nextMonth = parseInt($('.goto').find('.month').val());
    nextYear = parseInt($('.goto').find('.year').val());
    temp(nextYear, nextMonth);
});