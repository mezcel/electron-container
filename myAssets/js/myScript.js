/***************************************************************
 *  Global Vars
 * */

var initialMysteryFlag = false; // Initiated 1st mystery after the Mary Icon
var showBibleListFlag = false; // whether or not an html list was dynamically populated
var showPrayerListFlag = false; // whether or not an html list was dynamically populated

var initialHailMaryCounter = 0;
var stringSpaceCounter = 0;
var hailmaryCounter = 0;
var beadCounter = 0;
var rosaryJSON, rosaryJSONnab, rosaryJSONvulgate;

var progressBar = { // var containing progressbar state
    setValue: function(beadCounterDecade, beadCounterRosary) {
        $('#decadeSlider').val(beadCounterDecade);
        $('#decadeSlider').slider("refresh");
        $('#rosaryProgress').val(beadCounterRosary);
        $('#rosaryProgress').slider("refresh");
    }
};

/***************************************************************
 * My Function Objects
 */

function initialMystery() { // initial mystery based on weekday
    // (Sun = Wed), (Mon = Sat), (Tue = Fri), Thursday

    var initialMysteryArr = []; // [decade mystery, db bead no]
    var myDate = new Date();
    var dayOrderNo = myDate.getDay();

    switch(dayOrderNo) {
        case 0: case 3: // Sunday, Wednesday
            initialMysteryArr = [16,244];
            break;
        case 1: case 6: // Monday, Saturday
            initialMysteryArr = [1,7];
            break;
        case 2: case 5: // Tuesday, Friday
            initialMysteryArr = [11,165];
            break;
        case 3: // Thursday
            initialMysteryArr = [6,86];
            break;
        default: // default to monday
            initialMysteryArr = [1,7];
    }

    return initialMysteryArr;

}

function populateJumpToPosition(mysteryInfoID, jumptoBeadID) { // populate button and function

    // jump to positions function string
    var onclickFunction = 'beadCounter = ' + jumptoBeadID + '; hailmaryCounter = ' + ((mysteryInfoID * 10) - 10) + '; beadFwd(); progressBar.setValue(hailmaryCounter % 10, hailmaryCounter % 50);';

    // dynamic populate button
    var btnMysteryString = '<p><a href="#rosary" class="ui-btn ui-corner-all ui-icon-actiont" data-rel="back" onclick="' + onclickFunction + '">Start</a><p>';

    return btnMysteryString;
}

function fillMysteryInfoContent(mysteryInfoID, jumptoBeadID) { // populate mystery and scripture DOM display
    showBibleListFlag = false;
    showPrayerListFlag = false;

    $("#infoHeader").html(rosaryJSON.mysteryInfo[mysteryInfoID].infoHeader);
    $("#infoSubHeader").html(rosaryJSON.mysteryInfo[mysteryInfoID].infoSubHeader);
    $("#infoBody").html(rosaryJSON.mysteryInfo[mysteryInfoID].infoText + populateJumpToPosition(mysteryInfoID, jumptoBeadID - 1));
    $("#infoFooter").html("this is suplimentary information about this mystery: " + rosaryJSON.mysteryInfo[mysteryInfoID].infoRefference);
}

function fillAppInfoContent(infoID) { // called within html
    showBibleListFlag = false;
    showPrayerListFlag = false;

    document.getElementById('infoHeader').innerHTML = rosaryJSON.appInfo[infoID].infoHeader;
    document.getElementById('infoSubHeader').innerHTML = rosaryJSON.appInfo[infoID].infoSubHeader;
    document.getElementById('infoBody').innerHTML = rosaryJSON.appInfo[infoID].infoText;
    document.getElementById('infoFooter').innerHTML = rosaryJSON.appInfo[infoID].infoFooter;
}

function fillRosaryBeadPage(counterNo) {
    showBibleListFlag = false;
    showPrayerListFlag = false;

    var decadeIndex = rosaryJSON.rosaryBead[counterNo].decadeIndex;
    var mysteryIndex = rosaryJSON.rosaryBead[counterNo].mysteryIndex;
    var prayerIndex = rosaryJSON.rosaryBead[counterNo].prayerIndex;
    var scriptureIndex = rosaryJSON.rosaryBead[counterNo].scriptureIndex;
    var messageIndex = rosaryJSON.rosaryBead[counterNo].messageIndex;

    $("#mystery").html(rosaryJSON.mystery[mysteryIndex].mysteryName);
    $("#decade").html(rosaryJSON.decade[decadeIndex].decadeName);
    $("#scripture").html(rosaryJSON.scripture[scriptureIndex].scriptureText);
    $("#message").html(rosaryJSON.message[messageIndex].mesageText);
    $("#prayer").html(rosaryJSON.prayer[prayerIndex].prayerText);
    /*	//used to display optional navigation art ui
        $('#mySwipeImg').attr('src',rosaryJSON.decade[decadeIndex].decadeArt);
        $('#mySwipeImg').attr('width', '100%');
    */
}

/* navigation buttons */
function beadFwd() {
	var jsonBeadLength = (rosaryJSON.rosaryBead.length) - 1;

    if (beadCounter < jsonBeadLength) {
        beadProcess(+1);
    } else {
		beadCounter = 0; // reset counter
		beadProcess(+1);
	}

}

function beadRev() {
    if (beadCounter > 0) {
        beadProcess(-1);
    }
    //beadProcess(-1);
}

function beadProcess(directionFwRw) { // event displays based on bead counter sequence
	/* Note:
	 *  Progress Calculation Variables:
	 * 	    hailmaryCounter
	 * 	    thisDecadeSet
	 * 	    beadCounter
	 * */

    beadCounter += directionFwRw; // increment
    mysteryProgress = 0;

    var decadeIndex = rosaryJSON.rosaryBead[beadCounter].decadeIndex;
    var beadIndex 	= rosaryJSON.rosaryBead[beadCounter].beadIndex;
    var beadType 	= rosaryJSON.bead[beadIndex].beadID;

    switch (beadType) { // the bead type is used to configre count/progress settings

		case 2:
			if (decadeIndex !== 0){

				if(directionFwRw > 0) {
					// fwd
					hailmaryCounter = hailmaryCounter + 1;
				} else {
					// rev
					hailmaryCounter = hailmaryCounter - 1;
				}

				var thisDecadeSet = (hailmaryCounter % 10);
				if (thisDecadeSet == 0) {
					thisDecadeSet = 10;
				}

				var mysteryProgress = hailmaryCounter % 50;
				if (mysteryProgress == 0){
					mysteryProgress = 50;
				}

				$("#beadMarker").html("small rosary bead: " + thisDecadeSet + " / 10");
				progressBar.setValue(thisDecadeSet, mysteryProgress);

			}

			if (decadeIndex == 0) { // handles only the intro hail marys
                if (directionFwRw > 0) {

                    // fwd
                    if (initialHailMaryCounter == 0) {
                        initialHailMaryCounter = 1;
                    } else {
                        initialHailMaryCounter = initialHailMaryCounter + (1 * directionFwRw);
                    }

                    $("#beadMarker").html("small rosary bead: " + initialHailMaryCounter + " / 3");

                } else {
                    // rev
                    if (initialHailMaryCounter == 0) {
                        initialHailMaryCounter = 3;
                    } else {
                        initialHailMaryCounter = initialHailMaryCounter + (1 * directionFwRw);
                    }

                    $("#beadMarker").html("small rosary bead: " + initialHailMaryCounter + " / 3");
                }
            }

            stringSpaceCounter = 0;

			break;

		case 3: // big bead
			stringSpaceCounter = 0;
            initialHailMaryCounter = 0;

            $("#beadMarker").html("big bead");
            if (directionFwRw < 0) {
                // rev
                if ((hailmaryCounter % 10) > 0) {
                    hailmaryCounter -= 1;
                }
            }

            progressBar.setValue(0, hailmaryCounter % 50);

            break;

        case 4: // string space
            if (directionFwRw > 0) {
				// fwd
				if (stringSpaceCounter == 0) {
					stringSpaceCounter = 1;
					if ((hailmaryCounter % 10) == 0) {
                        hailmaryCounter += 1;
					}
				} else if (stringSpaceCounter == 1) {
					stringSpaceCounter = 2;
					if ((hailmaryCounter % 10) > 0) {
                        hailmaryCounter -= 1;
					}
				}

            } else {
				//rev
				if (stringSpaceCounter == 0) {
					stringSpaceCounter = 2;
					if ((hailmaryCounter % 10) > 0) {
						hailmaryCounter -= 1;
					}
				} else if (stringSpaceCounter == 2) {
					stringSpaceCounter = 1;
					if ((hailmaryCounter % 10) == 0) {
                        hailmaryCounter += 1;
					}
				}
            }

            $("#beadMarker").html("string space: " + stringSpaceCounter + " / 2");

            break;

		case 5: // Mary icon / bigbead alternate
            $("#beadMarker").html("Mary Icon");
            if (directionFwRw < 0) {
                stringSpaceCounter = 3;
            }
            stringSpaceCounter = 0;

            // App's initial startup mystery, a one time toggle
            if (initialMysteryFlag == false) {
                beadCounter = initialMystery()[1];
                hailmaryCounter = ((initialMystery()[0] * 10) - 10);
                initialMysteryFlag = true;
            }

            break;

        case 6: // cross
            $("#beadMarker").html("crucifix");
            initialHailMaryCounter = 0;
            progressBar.setValue(0, 0);
            stringSpaceCounter = 0;
            break;

        default: // just when the app turns on
            thisDecadeSet = 0;
            $("#beadMarker").html("0 / 0");
            stringSpaceCounter = 0;

            break;
    }

    fillRosaryBeadPage(beadCounter); // populare dom with text

}

function populateBookJsonList() { // populate the right pannel list with bible content

    var li = '<li data-theme="b" class="ui-bar">Database Quotes</li>';
    var tempbookIndex = [];
    //container for $li's to be added
    $.each(rosaryJSON.scripture, function(i, name) { // consolidate scriptured from the same book
        if ($.inArray(name.bookIndex, tempbookIndex) !== -1) { // -1 = false
        } else {
            tempbookIndex.push(name.bookIndex);
            tempbookIndex.sort(function(a, b) {
                return a - b
            });
        }
    });

    for (var iLoop = 0; iLoop < tempbookIndex.length; iLoop += 1) { // collect book names for display
        li += '<li><a href="#" id="' + tempbookIndex[iLoop];
        li += '" class="infoDisp">' + rosaryJSON.book[tempbookIndex[iLoop]].bookName + '</a></li>';
    }

    //append li to ul
    $("#bible-list").append(li).promise().done(function() {
        $(this).on("click", ".infoDisp", function(e) {
            $("#infoSubHeader").hide();
            $("#infoBody").hide();

            // flag to determine bible verses will display in popup
            showBibleListFlag = true;
            showPrayerListFlag = false;

            e.preventDefault();
            $("#myDialogPopUp").data("myDataJsonVar", rosaryJSON.book[this.id]);
            $("#myDialogPopUp").popup("open");
        });
        $(this).listview("refresh");
    });
}

function populatePrayerJsonList() { // populate the right pannel list with bible content
    var li = '<li data-theme="b" class="ui-bar">List of prayers</li>';
    var tempprayerIndex = [];
    //container for $li to be added
    $.each(rosaryJSON.prayer, function(i, name) {
        tempprayerIndex.push(name.prayerID);
    });

    for (var iLoop = 0; iLoop < tempprayerIndex.length; iLoop += 1) { // collect prayer names
        li += '<li><a href="#" id="' + tempprayerIndex[iLoop];
        li += '" class="infoDisp">' + rosaryJSON.prayer[tempprayerIndex[iLoop]].prayerName + '</a></li>';
    }

    //append li to ul
    $("#prayer-list").append(li).promise().done(function() {
        $(this).on("click", ".infoDisp", function(e) {
            $("#infoSubHeader").hide();
            $("#infoBody").hide();

            // flag to determine prayers will display in popup
            showPrayerListFlag = true;
            showBibleListFlag = false;

            e.preventDefault();
            $("#myDialogPopUp").data("myDataJsonVar2", rosaryJSON.prayer[this.id]);
            $("#myDialogPopUp").popup("open");
        });
        $(this).listview("refresh");
    });
}

function getBrowserUrl() { // get ipurl to string
    const hostUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '');
    var urlParse = new URL(hostUrl);

    //  Get any piece of the url you're interested in
    urlParse.hostname;  //  'example.com'
    urlParse.port;      //   12345
    urlParse.search;    //  '?startIndex=1&pageSize=10'
    urlParse.pathname;  //  '/blog/foo/bar'
    urlParse.protocol;  //  'http:'

    if (urlParse.protocol == 'http:') {
        // assumes we are connected on the same server ip
        urlParse.port = 3000;
    } else {
        // assumes we are on host machine
        urlParse = 'http://localhost:3000';
    }

    $('#inputMsgIp').val(urlParse);
    $('#show-val').attr('placeholder', urlParse);
}

function messengerLinkEvent() { // allow user to set which server to message with
    getBrowserUrl();

    // Messenger popup button
    $( "#btnMessenger" ).on( "click", function() {
        var href = $('#inputMsgIp').val();
        if (href !== 'No Network' ) {
            var link = $('<a href="' + href + '" />');
            link.attr('target', '_blank');
            window.open(link.attr('href'));
        }
    });
}

function initAudioVolume() { // initial audio volume setting
    $("#audioAveMaria").prop('volume', 0.25);
}

function initUi() {
	populateBookJsonList();
    populatePrayerJsonList();
    getBrowserUrl();
    messengerLinkEvent();
    initAudioVolume();
}

/***************************************************************
 * Page Load Events
 */

 $(document).on('pageshow', '#splashpage', function() {
    $("#popupStartApp").popup("open");
});

/* configure progressbars  */
$(document).on('pageshow', '#rosary', function() {

    $('<input>').appendTo('[ data-role="decadeProgress"]').attr({
        'name': 'decadeSlider',
        'id': 'decadeSlider',
        'data-highlight': 'true',
        'min': '0',
        'max': '10',
        'value': '0',
        'type': 'range'
    }).slider({
        create: function(event, ui) {
            $(this).parent().find('input').hide();
            $(this).parent().find('input').css('margin-left', '-9999px'); // Fix for some FF versions
            $(this).parent().find('.ui-slider-track').css('margin', '0 15px 0 15px');
            $(this).parent().find('.ui-slider-handle').hide();
        }
    }).slider("refresh");

    $('<input>').appendTo('[ data-role="rosaryProgress"]').attr({
        'name': 'rosaryProgress',
        'id': 'rosaryProgress',
        'data-highlight': 'true',
        'min': '0',
        'max': '50',
        'value': '0',
        'type': 'range'
    }).slider({
        create: function(event, ui) {
            $(this).parent().find('input').hide();
            $(this).parent().find('input').css('margin-left', '-9999px'); // Fix for some FF versions
            $(this).parent().find('.ui-slider-track').css('margin', '0 15px 0 15px');
            $(this).parent().find('.ui-slider-handle').hide();
        }
    }).slider("refresh");

    // initialize progressbar and prayer display
    progressBar.setValue(beadCounter, beadCounter);
    document.getElementById('prayer').innerHTML = rosaryJSON.prayer[1].prayerText;
});

/* the code destination for dynamically generated bible list */
$(document).on("popupbeforeposition", "#myDialogPopUp", function() { // Dynamically populated list content when active is clicked

    if (showBibleListFlag === true) { // Bible Book list in right panel
        var info = $("#myDialogPopUp").data("myDataJsonVar");
        var info_view = '<ol style="list-style: none; padding-left: 0;">';
        var bookID = info["bookID"];

        for (var iLoop = 0; iLoop < rosaryJSON.scripture.length; iLoop += 1) {
            if (rosaryJSON.scripture[iLoop].bookIndex === bookID) {
                info_view += '<li class="ui-field-contain ui-corner-all ui-shadow"><strong>(' + rosaryJSON.scripture[iLoop].chapterIndex + ":" + rosaryJSON.scripture[iLoop].verseIndex + ") &#x270d; </strong>" + rosaryJSON.scripture[iLoop].scriptureText + '</li>';
            }
        }
        info_view += '</ol>';

        // hide extra elements
        $(this).find("[data-role=prayerContent]").html('');
        $("#infoSubHeader").css("display","none");
        $("#infoBody").css("display","none");

        // show modal content
        $("#infoHeader").html(info["bookName"]);
        $(this).find("[data-role=bibleContent]").html(info_view);
        $("#infoFooter").html("Readings found in: " + info["library"]);


    } else if (showPrayerListFlag === true) { // Prayer Book list in right panel
        var info = $("#myDialogPopUp").data("myDataJsonVar2");
        var prayerID = info["prayerID"];
        var info_view = '<ol style="list-style: none; padding-left: 0;"><li class="ui-field-contain ui-corner-all ui-shadow">' + rosaryJSON.prayer[prayerID].prayerText + '</li></ol>';

        // hide extra elements
        $(this).find("[data-role=bibleContent]").html('');
        $("#infoSubHeader").css("display","none");
        $("#infoBody").css("display","none");

        // show modal content
        $("#infoHeader").html(rosaryJSON.prayer[prayerID].prayerName);
        $(this).find("[data-role=prayerContent]").html(info_view);
        $("#infoFooter").html("footer");

    } else { // the other content
        // hide bible verse and prayer elements
		$(this).find("[data-role=bibleContent]").html('');
		$(this).find("[data-role=prayerContent]").html('');

        // show modal content
        $("#infoSubHeader").show();
        $("#infoBody").show();
    }

});

/* UI swipe, slicks, & keydown triggers */
$(document).on("pagecreate", "#rosary", function() {

	// swipe
    $(".mySwipeClass").on("swiperight", function() { beadRev(); });

    $(".mySwipeClass").on("swipeleft", function() { beadFwd(); });

    // keyboard controlls
    $("html").on("keydown", function(event) {

        switch(event.which) {
            case 39: //lt arrow
                beadFwd();
                break;
            case 37: //rt arrow
                beadRev();
                break;
            case 49: case 97: // no 1
                $('#btnHomePanel').click();
                break;
            case 50: case 98: // no2
                $('#btnInfoPanel').click();
                break;
            case 78: // letter n
                $('#nabTranslation').click();
                break;
            case 86: // letter v
                $('#vulgateTranslation').click();
                break;
            case 81: // letter q
                $('#daynightSwitch').click();
                break;
            case 87: // letter w
                $('#feastRed').click();
                break;
            case 69: // letter e
                $('#marianBlue').click();
                break;
            case 82: // letter r
                $('#adventPurple').click();
                break;
            case 84: // letter t
                $('#ordinaryGreen').click();
                break;
            case 89: // letter y
                $('#easterGold').click();
                break;
            case 80: // letter p
                let firstAudioTrack = $('audio')[0];
                firstAudioTrack[firstAudioTrack.paused ? 'play' : 'pause']();
                // $('#audioAveMaria').trigger("play");
                break;
            case 38: // up arrow
                var volLevel = $('audio')[0].volume;
                $('audio')[0].volume = volLevel + 0.25;
                $('audio')[1].volume = volLevel + 0.25;
                break;
            case 40: // down arrow
                var volLevel = $('audio')[0].volume;
                $('audio')[0].volume = volLevel - 0.25;
                $('audio')[1].volume = volLevel - 0.25;
                break;
            case 73: // letter i
                // hacky but it works as a toggle
                $("#myDialogPopUp").popup("close");
                $('#rosary').click();
                $('#btnGithub').click();
                break;
            case 72: // letter h
                // hacky but it works as a toggle
                $("#myDialogPopUp").popup("close");
                $('#rosary').click();
                $('#btnShortcuts').click();
                break;
            default:
                /*// flicker screen
                $('html').css('display', 'none');
                setTimeout(function(){
                    $('html').css('display', 'block');
                }, 10);*/
        }

    });
});

/* toggle theme presets */
$(document).on("pagecreate", function() {

    /* Color themes */
    $("#darklight input").on("change", function(event) { // black white
        if (event.target.name === "theme") {
            $('input:radio[name=rdoLiturgicalColors]:checked').prop('checked', false).checkboxradio("refresh");

            $("#entireBody").removeClass("ui-page-theme-a ui-page-theme-b ui-page-theme-c ui-page-theme-d ui-page-theme-e ui-page-theme-f ui-page-theme-g");
            $(".myUiBody").removeClass("ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e ui-body-f ui-body-g");

            if ($("#daynightSwitch").is(":checked")) {
                $("#entireBody").addClass("ui-page-theme-a");
                $(".myUiBody").addClass("ui-body-a");
            } else {
                $("#entireBody").addClass("ui-page-theme-b");
                $(".myUiBody").addClass("ui-body-b");
            }

        }
    });

    $("#liturgicalColors input").on("change", function(event) { // multi color
        if (event.target.name === "rdoLiturgicalColors") {
            $("#entireBody").removeClass("ui-page-theme-a ui-page-theme-b ui-page-theme-c ui-page-theme-d ui-page-theme-e ui-page-theme-f ui-page-theme-g");
            $(".myUiBody").removeClass("ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e ui-body-f ui-body-g");

            if ($("#feastRed").is(":checked")) {
                $("#entireBody").addClass("ui-page-theme-c");
                $(".myUiBody").addClass("ui-body-c");
            }
            if ($("#marianBlue").is(":checked")) {
                $("#entireBody").addClass("ui-page-theme-d");
                $(".myUiBody").addClass("ui-body-d");
            }
            if ($("#adventPurple").is(":checked")) {
                $("#entireBody").addClass("ui-page-theme-e");
                $(".myUiBody").addClass("ui-body-e");
            }
            if ($("#ordinaryGreen").is(":checked")) {
                $("#entireBody").addClass("ui-page-theme-f");
                $(".myUiBody").addClass("ui-body-f");
            }
            if ($("#easterGold").is(":checked")) {
                $("#entireBody").addClass("ui-page-theme-g");
                $(".myUiBody").addClass("ui-body-g");
            }

        }
    });

    /* text translations */
    $("#language input").on("change", function(event) {
        console.log('$("#language input").on("change", function(event)');
        if (event.target.name === "rdoTranslation") {

            if ($("#nabTranslation").is(":checked")) {
                rosaryJSON = rosaryJSONnab;
            }

            if ($("#vulgateTranslation").is(":checked")) {
                rosaryJSON = rosaryJSONvulgate;            }

            $("#bible-list").html(''); //clear dom list
            $("#prayer-list").html(''); //clear dom list

            populateBookJsonList(); // repopulate dom list
            populatePrayerJsonList(); // repopulate dom list

            fillRosaryBeadPage(beadCounter); // display translation of current bead
        }
    });

});

/* translation db variable initialization */
$(document).on('pageinit', '#rosary', function(e, data){ // import json files
	// there are other ways to do this, but ajax script works the best with JQM
	// Note: https://joshzeigler.com/technology/web-development/how-big-is-too-big-for-json

	// import nab and define global nab json
	$.ajax({url: 'myAssets/database/rosaryJSON-min-nab.json',
        dataType: "json",
        async: true,
        success: function (result) {
            rosaryJSONnab = result;
            //alert('rosaryJSONnab');
        },
        error: function (request,error) {
            alert('NAB translation did not upload');
        }
    });

    // import Vulgate and define global vulgate json
    // vulgate will also be my initial language
    $.ajax({url: 'myAssets/database/rosaryJSON-min-vulgate.json',
        dataType: "json",
        async: true,
        success: function (result) {
            rosaryJSONvulgate = result;
            rosaryJSON = rosaryJSONvulgate;
            // alert('rosaryJSONvulgate');
        },
        error: function (request,error) {
            alert('Vulgate translation did not upload');
        }
    });

});

/* initialize features provided the page's DOM is loaded */
$(document).on('pageshow', '#rosary', function() {
	initUi();
});

/*$(document).on('pagecreate',function(event){
    populateBookJsonList();
    populatePrayerJsonList();
    getBrowserUrl();
    messengerLinkEvent();
    initAudioVolume();
});*/


////
/* prevent images from getting dragged on swipe */
/*
$('img').on('dragstart', function(event) {
    event.preventDefault();
}); //prevent img for being dragged
*/
