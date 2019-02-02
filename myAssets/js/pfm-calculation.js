function initializeFeastFlags() {
    var isToday_Easter = 0;
    var isEasterSeason = 0;
    var isTodayAsh_Wednesday = 0;
    var isLentSeasion = 0;
    var isTodayHoly_Thursday = 0;
    var isTodayGood_Friday = 0;
    var isTodayHoly_Saturday = 0;
    var isTodayAsh_Wednesday = 0;
    var isTodayJesus_Assension = 0;
    var isTodayPentecost = 0;
    var isTodayImmaculateConception = 0;
    var isTodayAdventStart = 0;
    var isAdventSeasion = 0;
    var isTodayChristmas = 0;
    var isChristmasSeason = 0;
    var isTodaySolemnityOfMary = 0;
    var isTodayEpiphany = 0;
    var isTodayEpiphany2 = 0;
    var isTodayJesusBaptism = 0;
    var isTodayAll_Saints = 0;

    var isOrdinaryTime = 0;
}

function livingSeasonABC() {

    // Living Seasons of Change by Liturgical Year Cycles and Month: A,B,C

    var cycleSeasonAdvent = ["", "Season of Waiting", "Season of Preparation", "Season of Holiness"];
    var cycleSeasonEpiphany = ["", "Season of Foundation", "Season of New Beginning", "Season of Manifestation"];
    var cycleSeasonLent = ["", "Season of Hope", "Season of Cross Purposes", "Season of Repentance"];
    var cycleSeasonPentacost = ["", "Season of Glory", "Season of Power", "Season of the Spirit"];
    var cycleSeasonEaster = ["", "Season of Salvation", "Season of More Season of Witness", "Season of Joy & Life"];

}

function pfmTableDate(year) {
    "use strict";
    // Divide the current year by 19 and get the 1st 3 digits after the decimal

    //var currentTime = new Date();
    //var year = currentTime.getFullYear();
    var yearDiv3_decimal = new Number(year / 19);
    yearDiv3_decimal = yearDiv3_decimal.toFixed(4).slice(3, -1); //parse digits

    var wholeNum = yearDiv3_decimal * 1000;

    var pmfArray = [];
    pmfArray[0] = "A14";
    pmfArray[52] = "A3";
    pmfArray[105] = "M23";
    pmfArray[157] = "A11";
    pmfArray[210] = "M31";
    pmfArray[263] = "A18";
    pmfArray[315] = "A8";
    pmfArray[368] = "M28";
    pmfArray[421] = "A16";
    pmfArray[473] = "A5";
    pmfArray[526] = "M25";
    pmfArray[578] = "A13";
    pmfArray[631] = "A2";
    pmfArray[684] = "M22";
    pmfArray[736] = "A10";
    pmfArray[789] = "M30";
    pmfArray[842] = "A17";
    pmfArray[894] = "A7";
    pmfArray[947] = "M27";

    return pmfArray[wholeNum]; //pfmDate
}

function pfmTableMonth(pfmDate) {
    "use strict";

    // determine month according to PMF Date
    // var pfmDate = pfmTableDate();
    var firstLetter = pfmDate.charAt(0);

    var virtualMonthName, virtualMonthNo, last2numbers, estimatedDay;

    // 1st letter
    if (firstLetter == "M") {
        virtualMonthName = "March";
        virtualMonthNo = 2;
    } else {
        virtualMonthName = "April";
        virtualMonthNo = 3;
    }

    // last 2 numbers
    var stringLength = pfmDate.length;
    if (stringLength < 3) {
        last2numbers = pfmDate.slice(-1);
        estimatedDay = last2numbers;
    } else {
        last2numbers = pfmDate.slice(-2);
        estimatedDay = last2numbers;
    }

    return {
        "virtualMonthNo": virtualMonthNo,
        "estimatedDay": estimatedDay
    };
}

function pfmTableYear(pmfDate) {
    "use strict";

    // PFM Date for year (M=March, A=April)
    var annualNo;

    switch (pmfDate) {
        case 'A2':
        case 'A9':
        case 'A16':
        case 'M26':
            annualNo = 0;
            break;
        case 'A3':
        case 'A10':
        case 'A17':
        case 'M27':
            annualNo = 1;
            break;
        case 'A4':
        case 'A11':
        case 'A18':
        case 'M21':
        case 'M28':
            annualNo = 2;
            break;
        case 'A5':
        case 'A12':
        case 'M29':
        case 'M22':
            annualNo = 3;
            break;
        case 'A6':
        case 'A13':
        case 'M23':
        case 'M30':
            annualNo = 4;
            break;
        case 'A7':
        case 'A14':
        case 'M24':
        case 'M31':
            annualNo = 5;
            break;
        case 'A1':
        case 'A8':
        case 'A15':
        case 'M25':
            annualNo = 6;
            break;
    }

    return annualNo;
}

function pfmTableDecade(year) {
    "use strict";
    // Last 2 digits in the current year
    // I am just going to use 18-21 and a few more future years just to fill it out

    // thisYear=$(date +%Y)
    var year2string = year.toString();;
    var last2numbers = year2string.slice(-2);
    var decadeNo;

    switch (last2numbers) {
        case '23':
        case '28':
            decadeNo = 0;
            break;
        case '18':
        case '29':
            decadeNo = 1;
            break;
        case '19':
        case '24':
            decadeNo = 2;
            break;
        case '25':
        case '31':
            decadeNo = 3;
            break;
        case '20':
        case '26':
            decadeNo = 4;
            break;
        case '21':
        case '27':
            decadeNo = 5;
            break;
        case '22':
        case '23':
            decadeNo = 6;
            break;
    }

    return decadeNo;
}

function pfmTableCentury() {
    "use strict";
    // First 2 digits if current year
    // I expect it will be 20 for the next +900 years... but the calander has changed more than once in the last 900 years
    // There is a lookup table for this... but we do not need to do that, 20 is just 0

    var centuryNo = 0;

    return centuryNo;
}

function pfmTableSum(annualNo, centuryNo, decadeNo) {
    "use strict";
    // Add results from all 3 tables
    var tableSum = annualNo + centuryNo + decadeNo;
    var pfmWeekDay, daysToAdd;

    switch (tableSum) {
        case 0:
        case 7:
        case 14:
            pfmWeekDay = 'Sunday';
            daysToAdd = 0;
            break;

        case 1:
        case 8:
        case 15:
            pfmWeekDay = 'Monday';
            daysToAdd = 6;
            break;

        case 2:
        case 9:
        case 19:
            pfmWeekDay = 'Tuesday';
            daysToAdd = 5;
            break;

        case 3:
        case 10:
        case 17:
            pfmWeekDay = 'Wednesday';
            daysToAdd = 4;
            break;

        case 4:
        case 11:
        case 18:
            pfmWeekDay = 'Thursday';
            daysToAdd = 3;
            break;

        case 5:
        case 12:
            pfmWeekDay = 'Friday';
            daysToAdd = 2;
            break;

        case 6:
        case 13:
            pfmWeekDay = 'Saturday';
            daysToAdd = 1;
            break;
    }

    return {
        "pfmWeekDay": pfmWeekDay,
        "daysToAdd": daysToAdd
    };
}

function daysUntill(nowDate, thenDate) {

    // The number of milliseconds in one day
    var dayMilliseconds = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var nowDate_ms = nowDate.getTime();
    var thenDate_ms = thenDate.getTime();

    // Calculate the difference in milliseconds
    //var difference_ms = Math.abs(date1_ms - date2_ms);
    var difference_ms = thenDate_ms - nowDate_ms;

    // Convert back to days and return
    return Math.round(difference_ms/dayMilliseconds);

}

function calculate_Paschal_Full_Moon(year) {
    "use strict";
	// Easter

    //var currentTime = new Date();
    //var year = currentTime.getFullYear();
    var pfmDate = pfmTableDate(year);
    var estimatedDay = pfmTableMonth(pfmDate).estimatedDay;
    var virtualMonthNo = pfmTableMonth(pfmDate).virtualMonthNo;
    var annualNo = pfmTableYear(pfmDate);
    var centuryNo = pfmTableDecade(year);
    var decadeNo = pfmTableCentury();
    var pfmWeekDay = pfmTableSum(annualNo, centuryNo, decadeNo).pfmWeekDay;
    var daysToAdd = pfmTableSum(annualNo, centuryNo, decadeNo).daysToAdd;

    var tabulatedDate = new Date(year, virtualMonthNo, estimatedDay);
        tabulatedDate.setDate(tabulatedDate.getDate() + daysToAdd);

    return tabulatedDate;
}

function thisYearCountdownPFM(currentTime, offsetNumber) {
    "use strict";
    var year = currentTime.getFullYear();
    var thisyearDay = calculate_Paschal_Full_Moon(year);

    if ( offsetNumber !== 0) {
        thisyearDay.setDate(thisyearDay.getDate() + offsetNumber);
    }

    var countDown = daysUntill(currentTime, thisyearDay);

    if ( countDown < 0 ) {
        currentTime.setMonth(currentTime.getMonth() + 12); // next year
        year = currentTime.getFullYear();
        var nextyearDay = calculate_Paschal_Full_Moon(year);

        if ( offsetNumber !== 0) {
            nextyearDay.setDate(nextyearDay.getDate() + offsetNumber);
        }

        countDown = daysUntill(currentTime, nextyearDay);
    }

    return countDown;
}

function thisYearCountdownFixedDates(currentTime, thenDate) {
    "use strict";
    var countDown = daysUntill(currentTime, thenDate);

    if ( countDown < 0 ) {
        thenDate.setMonth(thenDate.getMonth() + 12); // next year
        countDown = daysUntill(currentTime, thenDate);
    }

    return countDown;
}

function daysUntill_Easter(currentTime) {
    "use strict";
    var offsetNumber = 0;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    if ( countDown < 0) {
        countDown = nextYearCountdownPFM(currentTime, offsetNumber);
    }

    return countDown;
}

function  daysUntill_HolyThursday(currentTime) {
	// Triduum Thursday
    "use strict";

    var offsetNumber = -3;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);
    return countDown;
}

function  daysUntill_GoodFriday(currentTime) {
	// Triduum Friday
    "use strict";
    var offsetNumber = -2;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    return countDown;
}

function  daysUntill_HolySaturday(currentTime) {
	// Triduum Saturday
    "use strict";
    var offsetNumber = -1;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    return countDown;
}

function daysUntill_AshWednesday(currentTime) {
	// Lent begins on Ash Wednesday, which is always held 46 days (40 fasting days and 6 Sundays) before Easter Sunday.
    "use strict";
    var offsetNumber = -46;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    return countDown;
}

function daysUntill_JesusAssension(currentTime) {
	// 40 Days After Easter, Thursday
    "use strict";
    var offsetNumber = 40;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    return countDown;
}

function daysUntill_Pentecost(currentTime) {
	// 7 Sundays after Easter
    "use strict";
    var offsetNumber = 49;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    return countDown;
}

function daysUntill_ImmaculateConception(currentTime) {
	// Dec 8
    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = new Date(year, 11, 8);
    var countDown = thisYearCountdownFixedDates(currentTime, thenDate);

    return countDown;
}

function firstSunday(year, month) {
    "use strict";
    var isSunday = false;
    var dayCounter = 1;
    var sundayDate; //= new Date(year, month, 1);
    while ( isSunday == false ) {
        sundayDate = new Date(year, month, dayCounter);

        if ( sundayDate.getDay() == 0 ) {
            dayCounter += 1;
        } else {
            isSunday = true;
        }
    }

    return sundayDate;
}

function daysUntill_Advent(currentTime) {
	// 1st sunday of Dec through Dec 24
	// Start of Liturgical Year
	// Min 4 sunday durations

    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = firstSunday(year, 11);
    var countDown = daysUntill(currentTime, thenDate);

    if ( countDown < 0 ) {
        year += 1;
        thenDate = firstSunday(year, 11); // next year
        countDown = daysUntill(currentTime, thenDate);
    }

    return countDown;
}

function daysUntill_Christmas(currentTime) {
	// Dec 25
    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = new Date(year, 11, 25);
    var countDown = thisYearCountdownFixedDates(currentTime, thenDate);

    return countDown;
}

function daysUntill_AllSaints(currentTime)  {
	// Nov 1
    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = new Date(year, 10, 1);
    var countDown = thisYearCountdownFixedDates(currentTime, thenDate);

    return countDown;
}

function daysUntill_SolemnityOfMary(currentTime)  {
	// Jan 1
    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = new Date(year, 0, 1);
    var countDown = thisYearCountdownFixedDates(currentTime, thenDate);

    return countDown;
}

$(document).ready(function() {

    var currentTime = new Date();

    var year = currentTime.getFullYear();
    $("#year").html("year = " + year);

    var pfmDate = pfmTableDate(year);
    $("#pfmTableDate").html("pfmDate = " + pfmDate);

    var estimatedDay = pfmTableMonth(pfmDate).estimatedDay
    var virtualMonthNo = pfmTableMonth(pfmDate).virtualMonthNo

    $("#pfmTableMonth").html("estimatedDay = " + estimatedDay + ", virtualMonthNo = " + virtualMonthNo);

    var annualNo = pfmTableYear(pfmDate);
    var centuryNo = pfmTableDecade(year);
    var decadeNo = pfmTableCentury();

    $("#pfmTableYear").html("annualNo = " + annualNo);
    $("#pfmTableDecade").html("decadeNo = " + centuryNo);
    $("#pfmTableCentury").html("centuryNo = " + decadeNo);

    var pfmWeekDay = pfmTableSum(annualNo, centuryNo, decadeNo).pfmWeekDay
    var daysToAdd = pfmTableSum(annualNo, centuryNo, decadeNo).daysToAdd

    $("#pfmTableSum").html("pfmWeekDay = " + pfmWeekDay + ", daysToAdd = " + daysToAdd);
    $("#calculate_Paschal_Full_Moon").html( calculate_Paschal_Full_Moon(year) );
    $("#daysUntill").html( daysUntill(new Date(), new Date(2019, 3, 21)) );
    $("#daysUntill_Easter").html( "countDown = " + daysUntill_Easter(currentTime) );
    $("#daysUntill_HolyThursday").html( "countDown = " + daysUntill_HolyThursday(currentTime) );
    $("#daysUntill_GoodFriday").html( "countDown = " + daysUntill_GoodFriday(currentTime) );
    $("#daysUntill_HolySaturday").html( "countDown = " + daysUntill_HolySaturday(currentTime) );
    $("#daysUntill_AshWednesday").html( "countDown = " + daysUntill_AshWednesday(currentTime) );
    $("#daysUntill_JesusAssension").html( "countDown = " + daysUntill_JesusAssension(currentTime) );
    $("#daysUntill_Pentecost").html( "countDown = " + daysUntill_Pentecost(currentTime) );
    $("#daysUntill_ImmaculateConception").html( "countDown = " + daysUntill_ImmaculateConception(currentTime) );
    $("#daysUntill_Advent").html( "countDown = " + daysUntill_Advent(currentTime) );
    $("#daysUntill_Christmas").html( "countDown = " + daysUntill_Christmas(currentTime) );
    $("#daysUntill_AllSaints").html( "countDown = " + daysUntill_AllSaints(currentTime) );
    $("#daysUntill_SolemnityOfMary").html( "countDown = " + daysUntill_SolemnityOfMary(currentTime) );

});
