/* Liturgical Calendar Calculations */

function pfmTableDate(year) { // PFM Step 1 of 6
    "use strict";
    // Divide the current year by 19 and get the 1st 3 digits after the decimal

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

function pfmTableMonth(pfmDate) {  // PFM Step 2 of 6
    "use strict";

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

function pfmTableYear(pmfDate) {  // PFM Step 3 of 6
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

function pfmTableDecade(year) {  // PFM Step 4 of 6
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

function pfmTableCentury() {  // PFM Step 5 of 6
    "use strict";
    // First 2 digits if current year
    // I expect it will be 20 for the next +900 years... but the calander has changed more than once in the last 900 years
    // There is a lookup table for this... but we do not need to do that, 20 is just 0

    var centuryNo = 0;

    return centuryNo;
}

function pfmTableSum(annualNo, centuryNo, decadeNo) {  // PFM Step 6 of 6
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

function astroPFM(year) {
    "use strict";
	// The day of the full moon of the harvest

    var pfmDate = pfmTableDate(year);
    var estimatedDay = pfmTableMonth(pfmDate).estimatedDay;
    var virtualMonthNo = pfmTableMonth(pfmDate).virtualMonthNo;

    var tabulatedDate = new Date(year, virtualMonthNo, estimatedDay);

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
		// countDown = countDown + 1; // fudge a day off

    /* if ( countDown < 0 ) {
        currentTime.setMonth(currentTime.getMonth() + 12); // next year
        year = currentTime.getFullYear();
        var nextyearDay = calculate_Paschal_Full_Moon(year);

        if ( offsetNumber !== 0) {
            nextyearDay.setDate(nextyearDay.getDate() + offsetNumber);
        }

        countDown = daysUntill(currentTime, nextyearDay);
    } */

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
    
	if ( !isEasterSeason(currentTime) && (countDown < 0 ) ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}

    return countDown;
}

function  daysUntill_PalmSunday(currentTime) {
	// Palm Sunday
    "use strict";
    var offsetNumber = -7;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);
    
	if ( !isLentSeason(currentTime) && (countDown < 0 ) ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}
	
    return countDown;
}

function  daysUntill_HolyThursday(currentTime) {
	// Triduum Thursday
    "use strict";
    var offsetNumber = -3;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);
    
    if ( !isLentSeason(currentTime) && (countDown < 0 ) ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}

    return countDown;
}

function  daysUntill_GoodFriday(currentTime) {
	// Triduum Friday
    "use strict";
    var offsetNumber = -2;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);
    
    if ( !isLentSeason(currentTime) && (countDown < 0 ) ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}

    return countDown;
}

function  daysUntill_HolySaturday(currentTime) {
	// Triduum Saturday
    "use strict";
    var offsetNumber = -1;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    if ( !isLentSeason(currentTime) && (countDown < 0 ) ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}
	
    return countDown;
}

function daysUntill_AshWednesday(currentTime) {
	// Lent begins on Ash Wednesday, which is always held 46 days (40 fasting days and 6 Sundays) before Easter Sunday.
    "use strict";
    var offsetNumber = -46;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    if ( !isLentSeason(currentTime) && (countDown < 0 ) ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}
	
    return countDown;
}

function daysUntill_JesusAssension(currentTime) {
	// 40 Days After Easter, Thursday
    "use strict";
    var offsetNumber = 40;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);
    
    if ( !isEasterSeason(currentTime) && (countDown < 0) ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}

    return countDown;
}

function daysUntill_Pentecost(currentTime) {
	// 7 Sundays after Easter
    "use strict";
    var offsetNumber = 49;
    var countDown = thisYearCountdownPFM(currentTime, offsetNumber);

    if ( countDown < 0 ) {
		var year = currentTime.getFullYear();
		var nextyearDay = calculate_Paschal_Full_Moon(year+1);
		countDown = daysUntill(currentTime, nextyearDay) + offsetNumber;
	}
	
    return countDown;
}

function daysUntill_ImmaculateConception(currentTime) {
	// Dec 8
    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = new Date(year, 11, 8);
    var countDown = daysUntill(currentTime, thenDate);

    if ( !isAdventSeason && (countDown < 0) ) {
        thenDate.setMonth(thenDate.getMonth() + 12); // next year
        countDown = daysUntill(currentTime, thenDate);
    }

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

    if ( !isAdventSeason && (countDown < 0) ) {
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
    // var countDown = thisYearCountdownFixedDates(currentTime, thenDate);
    var countDown = daysUntill(currentTime, thenDate);

    if ( !isChristmasSeason && (countDown < 0) ) {
        thenDate.setMonth(thenDate.getMonth() + 12); // next year
        countDown = daysUntill(currentTime, thenDate);
    }

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
    // var countDown = thisYearCountdownFixedDates(currentTime, thenDate);
    var countDown = daysUntill(currentTime, thenDate);
	// var baptismCountdown = daysUntill_JesusBaptism(currentTime);
	
	if ( !isChristmasSeason(currentTime) && (countDown < 0) ) {
		thenDate.setMonth(thenDate.getMonth() + 12); // next year
        countDown = daysUntill(currentTime, thenDate);
	}

    return countDown;
}

function daysUntill_Epiphany(currentTime) {
	// Aprox: Jan 6
	// Start of the 1st segment of ordinary time // Sunday closest to 12 days after Christmas
	// If Jan 6 is >= friday add days forward to Sun // If Jan 6 is < friday subtract days back to Sun
	// The day is transfered to a Sunday if the day falls between Jan 2-8 // Day of Obligation

    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = new Date(year, 0, 6);
    var dayofweek = thenDate.getDay();
    var offsetNumber;

    switch ( dayofweek ) {
        case 0 :
            offsetNumber = 0;
            break;
        case 1 :
            offsetNumber = -1;
            break;
        case 2 :
            offsetNumber = -2;
            break;
        case 3 :
            offsetNumber = -3;
            break;
        case 4 :
            offsetNumber = -4;
            break;
        case 5 :
            offsetNumber = 2;
            break;
        case 6 :
            offsetNumber = 1;
            break;
    }

    thenDate.setDate( thenDate.getDate() + offsetNumber );
    var countDown = thisYearCountdownFixedDates(currentTime, thenDate);

    if ( ( countDown < 0 ) && (daysUntill_JesusBaptism(currentTime) < 0) ){
        thenDate = new Date(year, 0, 6);
        thenDate.setMonth(thenDate.getMonth() + 12); // next year
        dayofweek = thenDate.getDay();
        switch ( dayofweek ) {
            case 0 :
                offsetNumber = 0;
                break;
            case 1 :
                offsetNumber = -1;
                break;
            case 2 :
                offsetNumber = -2;
                break;
            case 3 :
                offsetNumber = -3;
                break;
            case 4 :
                offsetNumber = -4;
                break;
            case 5 :
                offsetNumber = 2;
                break;
            case 6 :
                offsetNumber = 1;
                break;
        }
        thenDate.setDate( thenDate.getDate() + offsetNumber );
        countDown = thisYearCountdownFixedDates(currentTime, thenDate);
    }

    return countDown;
}

function daysUntill_JesusBaptism(currentTime) {
	// Aprox Jan 13
	// sunday after the Mass which celbrates the Epiphany
	// Monday if Epiphany Sunday shared the same day

    "use strict";
    var year = currentTime.getFullYear();
    var thenDate = new Date(year, 0, 13);
    // var countDown = thisYearCountdownFixedDates(currentTime, thenDate);
    var countDown = daysUntill(currentTime, thenDate);

    if ( !isChristmasSeason && (countDown < 0) ) {
        thenDate.setMonth(thenDate.getMonth() + 12); // next year
        countDown = daysUntill(currentTime, thenDate);
    }

    if (countDown == 0) {
        countDown += 1;
    } else {
        countDown = daysUntill_Epiphany(currentTime) + 7;
    }

    return countDown;
}

function isLentSeason(currentTime) {
    "use strict";
    var countDown = daysUntill_Easter(currentTime);
    var output;
    if ( (countDown <= 46) && (countDown >= 0) ) {
        output = true;
    } else {
        output = false;
    }

    return output;
}

function isEasterSeason(currentTime) {
    "use strict";
    var countDown = daysUntill_Pentecost(currentTime);
    var output;
    if ( (countDown <= 50) && (countDown >= 0) ) {
        output = true;
    } else {
        output = false;
    }

    return output;
}

function isAdventSeason(currentTime) {
    "use strict";
    var countDown = daysUntill_Christmas(currentTime);
    var output;
    if ( ( countDown <= 25) && (countDown >= 0) ) {
        output = true;
    } else {
        output = false;
    }
    return output;
}

function isChristmasSeason(currentTime) {
    "use strict";
    var countDown = daysUntill_Epiphany(currentTime);
    var output;
    if ( ( countDown <= 12) && (countDown >= 0) ) {
        output = true;
    } else {
        output = false;
    }
    return output;
}

function isOrdinaryTimeSeason(currentTime) {
    "use strict";
    var output;
    if ( (! isLentSeason(currentTime)) && (! isEasterSeason(currentTime)) && (! isAdventSeason(currentTime)) && (! isChristmasSeason(currentTime)) ) {
        output = true;
    } else {
        output = false;
    }

    return output;
}

function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

/* ************************************************* */
/* GUI html rendering */
/* ************************************************* */

function yearCycleABC(currentTime) {
	// Year starts on the 1st Sunday of Advent on the previous year
    "use strict";
    var year = currentTime.getFullYear();

    if ( isDateBeforeToday(new Date(year, 11, 1)) ) {
        year = year;
    } else {
        year = year - 1;
    }

    var decadeYear = year - 2000;
    var modDivThree = decadeYear % 3;
    var cycleLetter, abcNo;

    var cycleSeasonAdvent = ["", "Season of Waiting", "Season of Preparation", "Season of Holiness"];
    var cycleSeasonEpiphany = ["", "Season of Foundation", "Season of New Beginning", "Season of Manifestation"];
    var cycleSeasonLent = ["", "Season of Hope", "Season of Cross Purposes", "Season of Repentance"];
    var cycleSeasonEaster = ["", "Season of Salvation", "Season of Witness", "Season of Joy & Life"];

    switch (modDivThree) {
        case 1:
            cycleLetter="Sunday Cycle A: The Gospel of Matthew";
            abcNo=1;
            break;
        case 2:
            cycleLetter="Sunday Cycle B: The Gospel of Mark";
            abcNo=2;
            break;
        case 0:
            cycleLetter="Sunday Cycle C: The Gospel of Luke";
            abcNo=3;
            break;
    }

    var abcAdvent = cycleSeasonAdvent[abcNo]
	var abcChristmas = cycleSeasonEpiphany[abcNo]
	var abcLent = cycleSeasonLent[abcNo]
	var abcEaster = cycleSeasonEaster[abcNo]

    return {
        "cycleLetter":cycleLetter,
        "abcAdvent":abcAdvent,
        "abcChristmas":abcChristmas,
        "abcLent":abcLent,
        "abcEaster":abcEaster
    }
}

function countdownString(countdown, countdownFeastName, boolHighlight) {
    "use strict";
    var stringOut;
    var dd, mm, y;    
    var tmpDate = new Date();
		tmpDate.setDate(tmpDate.getDate() + countdown);

    if ( countdown == 0 ) {
        stringOut = "<li> <b> Today is the Feast of " + countdownFeastName + " </b> </li>";
    } else {
        if ( countdown > 0 ) { 
            countdown = "<b><font color='blue'>" + countdown + "</font></b> days until";
            if (boolHighlight == true) {
				countdownFeastName = "<b class='highlightLightBlue'><i>" + countdownFeastName + "</i></b>";
			}
            stringOut = "<li> " + countdown + " the Feast of <u title='" + tmpDate + "'>" + countdownFeastName + "</u> </li>";
        } else { 
            countdown = "<b><font color='red'>" + countdown + "</font></b> days since";
            if (boolHighlight == true) {
				countdownFeastName = "<b class='highlightPink'><i>" + countdownFeastName + "</i></b>";
			}
            stringOut = "<li> " + countdown + " the Feast of <u title='" + tmpDate + "'>" + countdownFeastName + "</u> </li>";
        }    
    }
    
    return stringOut;
}

function liturgicalSeasonToday() {
    "use strict";
    var currentTime = new Date();
    var feastDayString = '';
    var countdown, countdownFeastName;
    
    var boolHighlightAdvent = false;
    var boolHighlightChristmas = false;
    var boolHighlightLent = false;
    var boolHighlightEaster = false;

    if ( isOrdinaryTimeSeason(currentTime) ) {
        feastDayString += " <li> Today is Ordinary Time Season </li><li><i>" + currentTime + "</i></li><hr>";
    } else if ( isLentSeason(currentTime) ) {
        feastDayString += " <li> Today is the " + yearCycleABC(currentTime).abcLent + ": Lent </li><li><i>" + currentTime + "</i></li><hr>";
        boolHighlightLent = true;
    } else if( isEasterSeason(currentTime) ) {
        feastDayString += " <li> Today is the " + yearCycleABC(currentTime).abcEaster + ": Eastertide </li><li><i>" + currentTime + "</i></li><hr>";
        boolHighlightEaster = true;
    } else if ( isAdventSeason(currentTime) ) {
        feastDayString += " <li> Today is the " + yearCycleABC(currentTime).abcAdvent + ": Advent </li><li><i>" + currentTime + "</i></li><hr>";
        boolHighlightAdvent = true;
    } else if ( isChristmasSeason(currentTime) ) {
        feastDayString += " <li> Today is the " + yearCycleABC(currentTime).abcChristmas + ": Christmastide </li><li><i>" + currentTime + "</i></li><hr>";
        boolHighlightChristmas = true;
    }
	
	countdown = daysUntill_ImmaculateConception(currentTime);
    countdownFeastName = "The Immaculate Conception of Mary";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightAdvent);

    countdown = daysUntill_Christmas(currentTime);
    countdownFeastName = "Christmas";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightAdvent);
	
    countdown = daysUntill_SolemnityOfMary(currentTime);
    countdownFeastName = "Solemnity of Mary";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightChristmas);

    countdown = daysUntill_Epiphany(currentTime);
    countdownFeastName = "The Epiphany";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightChristmas);

    countdown = daysUntill_JesusBaptism(currentTime);
    countdownFeastName = "Jesus' Baptism";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightChristmas);
    	
    countdown = daysUntill_AshWednesday(currentTime);
    countdownFeastName = "Ash Wednesday";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightLent);

	countdown = daysUntill_PalmSunday(currentTime);
    countdownFeastName = "Palm Sunday";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightLent);
    
    countdown = daysUntill_HolyThursday(currentTime);
    countdownFeastName = "Holy Thursday";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightLent);

    countdown = daysUntill_GoodFriday(currentTime);
    countdownFeastName = "Good Friday";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightLent);

    countdown = daysUntill_HolySaturday(currentTime);
    countdownFeastName = "Holy Saturday";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightLent);
    	
    countdown = daysUntill_Easter(currentTime);
    countdownFeastName = "Easter";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightEaster);
    
    countdown = daysUntill_JesusAssension(currentTime);
    countdownFeastName = "Jessus' Assension";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightEaster);

    countdown = daysUntill_Pentecost(currentTime);
    countdownFeastName = "Pentacost";
    feastDayString += countdownString(countdown, countdownFeastName, boolHighlightEaster);
    
    countdown = daysUntill_AllSaints(currentTime);
    countdownFeastName = "All Saints";
    feastDayString += countdownString(countdown, countdownFeastName, false);

    document.getElementById('infoHeader').innerHTML = "Liturgical Season Flags";
    document.getElementById('infoSubHeader').innerHTML = yearCycleABC(currentTime).cycleLetter ;
    document.getElementById('infoBody').innerHTML = feastDayString;
    document.getElementById('infoFooter').innerHTML = "Annual Countdown" + " <a href='http://www.vatican.va/archive/ccc_css/archive/catechism/p2s1c2a1.htm' target='_blank'>Celebration Of The Paschal Mystery</a>";
}
