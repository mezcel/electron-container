/***************************************************************
 *  Global Vars
 * */

var initialMysteryFlag = false; // Initiated 1st mystery after the Mary Icon
var showBibleListFlag = false; // whether or not an html list was dynamically populated
var showPrayerListFlag = false; // whether or not an html list was dynamically populated
var iamtyping = false; // a flag indicating if I am typing so I dont trigger keydown events
var isMessengerOpen = false; // a flag to determine of the Messenger is the display focus
var mainPageLoaded = false; // a flag to prevent re-loading dom objects;

var initialHailMaryCounter = 0;
var stringSpaceCounter = 0;
var hailmaryCounter = 0;
var beadCounter = 0;
var rosaryJSON, rosaryJSONnab, rosaryJSONvulgate;
 
/* WIP Variables:
* about: global string used to inform the messenger group of this clients bead progress
* experimental: to be used in further synchronizing developments
* goal: when everyone is at the same counter, then bead progress can continue.
* temp: for now i am just using messages to verify all clients know each others progress
* 	NO! the prayer chat is not a real-world thing... despite what seculars are 'selling'
* 	The chat is a toy/distraction, the real app is synchronizing behavior and accademics
* */
 
var decadeTextDisplay = ""; // message place holders
var messengerBeadProgress = ""; // message place holders

/***************************************************************
 *  Contrived Ajax
 * */
// import nab and define global nab json
// NAB will also be my initial language
$.ajax({
	url: './myAssets/database/rosaryJSON-nab.json',
	dataType: "json",
	async: false,
	success: function (result) {
		rosaryJSONnab = result;
		rosaryJSON = rosaryJSONnab;
	},
	error: function (request,error) {
		alert('NAB translation did not upload');
	}
});

// import Vulgate and define global vulgate json

$.ajax({
	url: './myAssets/database/rosaryJSON-min-vulgate.json',
	dataType: "json",
	async: false,
	success: function (result) {
		rosaryJSONvulgate = result;
		// rosaryJSON = rosaryJSONvulgate;
	},
	error: function (request,error) {
		alert('Vulgate translation did not upload');
	}
});

/***************************************************************
 *  Global Progressbar
 * */

// rosaryJSON = rosaryJSONvulgate;
rosaryJSON = rosaryJSONnab;

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
        case 4: // Thursday
            initialMysteryArr = [6,86];
            break;
        default: // default to monday
            initialMysteryArr = [1,7];
    }

    return initialMysteryArr;

}

function jumpFunction(mysteryInfoID, jumptoBeadID) {
	beadCounter = jumptoBeadID ;
	hailmaryCounter = ((mysteryInfoID * 10) - 10);
	beadFwd();
	progressBar.setValue(hailmaryCounter % 10, hailmaryCounter % 50);
	$("#btnClosePopup").click(); 
	$("#btnInfoPanel").click();
}

function populateJumpToPosition(mysteryInfoID, jumptoBeadID) { // populate button and function

    // dynamic populate button
    var btnMysteryString = '<p><a class="ui-btn ui-corner-all ui-icon-actiont" data-rel="back" onclick="jumpFunction(' + mysteryInfoID + ', ' + jumptoBeadID + ')">Start</a><p>';

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
	// used for popup modal
    showBibleListFlag = false;
    showPrayerListFlag = false;

    document.getElementById('infoHeader').innerHTML = rosaryJSON.appInfo[infoID].infoHeader;
    document.getElementById('infoSubHeader').innerHTML = rosaryJSON.appInfo[infoID].infoSubHeader;
    document.getElementById('infoBody').innerHTML = rosaryJSON.appInfo[infoID].infoText;
    document.getElementById('infoFooter').innerHTML = rosaryJSON.appInfo[infoID].infoFooter;
}

function fillAppInfoContent2(infoID) { // called within html
	// used for a dedicated jqm page
    showBibleListFlag = false;
    showPrayerListFlag = false;

    document.getElementById('reffHeader').innerHTML = rosaryJSON.appInfo[infoID].infoHeader;
    document.getElementById('reffSubHeader').innerHTML = rosaryJSON.appInfo[infoID].infoSubHeader;
    document.getElementById('reffBody').innerHTML = rosaryJSON.appInfo[infoID].infoText;
    document.getElementById('reffFooter').innerHTML = rosaryJSON.appInfo[infoID].infoFooter;
}

function fillRosaryBeadPage(counterNo) {
    showBibleListFlag = false;
    showPrayerListFlag = false;

    var decadeIndex = rosaryJSON.rosaryBead[counterNo].decadeIndex;
    var mysteryIndex = rosaryJSON.rosaryBead[counterNo].mysteryIndex;
    var prayerIndex = rosaryJSON.rosaryBead[counterNo].prayerIndex;
    var scriptureIndex = rosaryJSON.rosaryBead[counterNo].scriptureIndex;
    var messageIndex = rosaryJSON.rosaryBead[counterNo].messageIndex;
	
	decadeTextDisplay = rosaryJSON.decade[decadeIndex].decadeName; // used for messenger
	
    $("#mystery").html(rosaryJSON.mystery[mysteryIndex].mysteryName);
    $("#decade").html(decadeTextDisplay);
    $("#scripture").html(rosaryJSON.scripture[scriptureIndex].scriptureText);
    $("#message").html(rosaryJSON.message[messageIndex].mesageText);
    $("#prayer").html(rosaryJSON.prayer[prayerIndex].prayerText);
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
}

function beadProcess(directionFwRw) { // event displays based on bead counter sequence

    beadCounter += directionFwRw; // increment
    mysteryProgress = 0;

    var decadeIndex = rosaryJSON.rosaryBead[beadCounter].decadeIndex;
    var beadIndex 	= rosaryJSON.rosaryBead[beadCounter].beadIndex;
    var beadType 	= rosaryJSON.bead[beadIndex].beadID;
    var prepostMystery; // intro or conclusion prayers

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

				$("#beadMarker").html("small bead: " + thisDecadeSet + " / 10");
				progressBar.setValue(thisDecadeSet, mysteryProgress);
				
				// Adds a status update string to your messenger messages
				messengerBeadProgress = decadeTextDisplay + ", bead " + thisDecadeSet;

			}

			if (decadeIndex == 0) { // handles only the intro hail marys
                if (directionFwRw > 0) {

                    // fwd
                    if (initialHailMaryCounter == 0) {
                        initialHailMaryCounter = 1;
                    } else {
                        initialHailMaryCounter = initialHailMaryCounter + (1 * directionFwRw);
                    }

					prepostMystery = "introductory prayers";
                    $("#beadMarker").html("small bead: " + initialHailMaryCounter + " / 3");

                } else {
                    // rev
                    if (initialHailMaryCounter == 0) {
                        initialHailMaryCounter = 3;
                    } else {
                        initialHailMaryCounter = initialHailMaryCounter + (1 * directionFwRw);
                    }
					prepostMystery = "introductory prayers";
                    $("#beadMarker").html("small bead: " + initialHailMaryCounter + " / 3");
                }
                
                // Adds a status update string to your messenger messages
				messengerBeadProgress = "Introduction prayers, " + $("#beadMarker").text();
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
            if (beadCounter < 8) {
				messengerBeadProgress = "Introduction prayers ...";
			} else {
				messengerBeadProgress = decadeTextDisplay + ", bead 0";
			}
			
			prepostMystery = "introductory prayers";

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

			prepostMystery = "introductory prayers";
            $("#beadMarker").html("string space: " + stringSpaceCounter + " / 2");
            messengerBeadProgress = decadeTextDisplay + ", " + $("#beadMarker").text();

            break;

		case 5: // Mary icon / bigbead alternate
            $("#beadMarker").html("Mary Icon");
            if (directionFwRw < 0) {
                stringSpaceCounter = 3;
            }
            stringSpaceCounter = 0;

            // App's initial startup mystery, a one time toggle
            if (initialMysteryFlag == false) {
				initialMysteryArr=initialMystery();

                beadCounter=initialMysteryArr[1];
                hailmaryCounter = ((initialMysteryArr[0] * 10) - 10);

                initialMysteryFlag = true;
            }
            
            // Adds a status update string to your messenger messages
			messengerBeadProgress = "Mary Icon ...";
			prepostMystery = "conclusion prayers";

            break;

        case 6: // cross
            $("#beadMarker").html("crucifix");
            initialHailMaryCounter = 0;
            progressBar.setValue(0, 0);
            stringSpaceCounter = 0;
            
            prepostMystery = "introductory prayers";
            messengerBeadProgress = "crucifix ...";
            
            break;

        default: // just when the app turns on
            thisDecadeSet = 0;
            $("#beadMarker").html("0 / 0");
            stringSpaceCounter = 0;
            
            prepostMystery = "introductory prayers";
			messengerBeadProgress = "starting ...";
            
            break;
    }

    fillRosaryBeadPage(beadCounter); // populare dom with text
    if ($("#decade").html() == "") {
		$("#decade").html(prepostMystery) ;
	}

}

function populateBookJsonList() { // populate the right pannel list with bible content

    var li = '<li data-theme="b" class="ui-bar">Bible Quotes </li>';
    var tempbookIndex = [];
    //container for $li's to be added
    $.each(rosaryJSON.scripture, function(i, name) { // consolidate scriptures from the same book
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
        li += '" class="infoDisp">- ' + rosaryJSON.book[tempbookIndex[iLoop]].bookName + '</a></li>';
    }

    //append li to ul
    $("#bible-list").append(li).promise().done(function() {
        $(this).on("click", ".infoDisp", function(e) {
            //$("#infoSubHeader").hide();
            //$("#infoBody").hide();

            // flag to determine bible verses will display in popup
            showBibleListFlag = true;
            showPrayerListFlag = false;

            e.preventDefault();
            $("#refferencesPage").data("myDataJsonVar", rosaryJSON.book[this.id]);
            // $("#myDialogPopUp").popup("open");
            $.mobile.navigate("#refferencesPage", {transition: "fade"});
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
        li += '" class="infoDisp">- ' + rosaryJSON.prayer[tempprayerIndex[iLoop]].prayerName + '</a></li>';
    }

    //append li to ul
    $("#prayer-list").append(li).promise().done(function() {
        $(this).on("click", ".infoDisp", function(e) {
            //$("#infoSubHeader").hide();
            //$("#infoBody").hide();

            // flag to determine prayers will display in popup
            showPrayerListFlag = true;
            showBibleListFlag = false;

            e.preventDefault();
            $("#refferencesPage").data("myDataJsonVar2", rosaryJSON.prayer[this.id]);
            // $("#myDialogPopUp").popup("open");
            $.mobile.navigate("#refferencesPage", {transition: "fade"});
        });
        $(this).listview("refresh");
    });
}

function initAudioVolume() { // initial audio volume setting
    $("#audioAveMaria").prop('volume', 0.30);
}

function collapsibleEvents() {	
    
    $('#collapsibleMystery a').click( function() {
		$('#collapsibleRefferences').children().collapsible("collapse");
		$('#collapsibleAbout').collapsible("collapse");
		$('#collapsibleSettings').children().collapsible("collapse");
	});
	
    $('#collapsibleRefferences a').click( function() {
		$('#collapsibleMystery').children().collapsible("collapse");
		$('#collapsibleAbout').collapsible("collapse");
		$('#collapsibleSettings').children().collapsible("collapse");
	});
	
    $('#collapsibleAbout a').click( function() {
		$('#collapsibleMystery').children().collapsible("collapse");
		$('#collapsibleRefferences').children().collapsible("collapse");
		$('#collapsibleSettings').children().collapsible("collapse");
	});
	
    $('#collapsibleSettings a').click( function() {
		$('#collapsibleMystery').children().collapsible("collapse");
		$('#collapsibleRefferences').children().collapsible("collapse");
		$('#collapsibleAbout').collapsible("collapse");
	});
	
	/*$('#btnHomePanel').click( function() {
		$('#collapsibleAbout').collapsible("collapse");
		$('#collapsibleSettings').children().collapsible("collapse");
	});*/
	
	$('#btnInfoPanel').click( function() {
		$('#collapsibleMystery').children().collapsible("collapse");
		$('#collapsibleRefferences').children().collapsible("collapse");
	});
	
}

function minimalText() { $('#lblscripture').hide(); $('#lblmessage').hide(); $('#lblprayer').hide(); $('.progressBar').show(); $("#btnClosePopup").click(); $("#btnHomePanel").click(); }
function minimalNavigation() { $('#lblscripture').show(); $('#lblmessage').show(); $('#lblprayer').show(); $('.progressBar').hide(); $("#btnClosePopup").click(); $("#btnHomePanel").click(); }
function minimalAll() { $('#lblscripture').hide(); $('#lblmessage').hide(); $('#lblprayer').hide(); $('.progressBar').hide(); $("#btnClosePopup").click(); $("#btnHomePanel").click(); }
function minimalShowAll() { $('#lblscripture').show(); $('#lblmessage').show(); $('#lblprayer').show(); $('.progressBar').show(); $("#btnClosePopup").click(); $("#btnHomePanel").click(); }

function minimalUI() {
	// minimal ui display
	
	showBibleListFlag = false;
    showPrayerListFlag = false;

    document.getElementById('infoHeader').innerHTML = "Minimal";
    document.getElementById('infoSubHeader').innerHTML = "Toggle text headers and progress bars.";
    document.getElementById('infoBody').innerHTML = "4 view states: <hr>" + 
		"<a href='#rosary' class='ui-btn ui-corner-all ui-icon-arrow-u ui-btn-icon-left' onclick='minimalText()'>min text</a>" + 
		"<a href='#rosary' class='ui-btn ui-corner-all ui-icon-arrow-d ui-btn-icon-left' onclick='minimalNavigation()'>min bars</a>" + 
		"<a href='#rosary' class='ui-btn ui-corner-all ui-icon-eye ui-btn-icon-left' onclick='minimalAll()'>min all</a>" + 
		"<a href='#rosary' class='ui-btn ui-corner-all ui-icon-grid ui-btn-icon-left' onclick='minimalShowAll()'>show all</a>";
    document.getElementById('infoFooter').innerHTML = "-";
}

function initUi() {
	populateBookJsonList();
    populatePrayerJsonList();
    initAudioVolume();

    myControllEvents();
    myThemeEvents();
    initProgressBars();
    
    collapsibleEvents();

	// Sign of the cross
    beadProcess(0);
}

/* keystroke inputs */
function myControllEvents() {

    // swipe
    $(".mySwipeClass").on("swiperight", function() { beadRev(); });

    $(".mySwipeClass").on("swipeleft", function() { beadFwd(); });

    // flag if I am in typing mode
    $("#myMessage").focusout(function(){
        iamtyping = false;
    });
    $("#myMessage").focusin(function(){
        iamtyping = true;
    });

    // Messaging State Toggle
    
    $("#btnOpenMessenger").click(function() {
        // true
        isMessengerOpen = true;
    });
    
    $("#btnCloseMessenger").click(function() {
        // false
        isMessengerOpen = false;
    });

    // keyboard controlls

    $("html").on("keydown", function(event) {

        if (isMessengerOpen == false) {

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
                case 73: // letter i
                    // hacky but it works as a toggle
                    $('#myDialogPopUp').popup("close");
                    $('#rosary').click();
                    $('#btnGithub').click();
                    break;
                case 72: // letter h
                    // hacky but it works as a toggle
                    $("#myDialogPopUp").popup("close");
                    $('#rosary').click();
                    $('#btnShortcuts').click();
                    break;
                case 77: // letter m
                    // m for message
                    $('#btnOpenMessenger').click();
                    break;
                case 109: // toggle minimal UI display
                    // minus sign
                    $('#btnHomePanel').click();
                    $('#btnMinimal').click();
                    break;
                default:                    
					if ( $('#dailyMassPage').focus() ) {
						$('#btnCloseMassPage').click();
					}
					// console.log("key press", event.which); // debug keys
            }
            
        } else {
			// Messenger			
			switch(event.which) {
				case 27: // escape key
					if ( $("#messagingPage").focus() ) {
						$('#btnCloseMessenger').click();
					}
					
					if ( $("#refferencesPage").focus() ) {
						$('#btnCloseRefferencePage').click();
					}
			}
		}
        
    });

}

function myThemeEvents() {

    // Color themes
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

    // text translations
    $("#language input").on("change", function(event) {
        console.log('$("#language input").on("change", function(event)');
        if (event.target.name === "rdoTranslation") {

            if ($("#nabTranslation").is(":checked")) {
                rosaryJSON = rosaryJSONnab;
                $(".mysteryTranslationIndicator").text('NAB');
            }

            if ($("#vulgateTranslation").is(":checked")) {
                rosaryJSON = rosaryJSONvulgate;
                $(".mysteryTranslationIndicator").text('Vulgate');
            }

            $("#bible-list").html(''); //clear dom list
            $("#prayer-list").html(''); //clear dom list

            populateBookJsonList(); // repopulate dom list
            populatePrayerJsonList(); // repopulate dom list

            fillRosaryBeadPage(beadCounter); // display translation of current bead
        }
    });
}

function initProgressBars() {
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

}

/***************************************************************
 * Web Scrape Usccb.org
 */

function scrapeUsccb() {	
    $.getJSON("http://www.whateverorigin.org/get?url=" + encodeURIComponent("http://www.usccb.org/bible/readings") + "&callback=?", function(data){
        scrapeVar = data.contents;

        var remBottomHtml = scrapeVar.substring(0, scrapeVar.indexOf('<a name="readingssignup"'));
        var remTopHtml = remBottomHtml.substring(remBottomHtml.indexOf('<div class="contentarea">'));
        var scrapeHeader = new Date() + "<br>";
        var scrapeFooter = "<hr><center>Readings taken from: <a href='http://www.usccb.org/bible/readings' target='_blank' >http://www.usccb.org/bible/readings</a></center>";
        var cropHtml = scrapeHeader + remTopHtml + scrapeFooter;

        // <object type="text/html" data="http://www.usccb.org/bible/readings" width="100%" height="800px"></object>
        $("#usccbOrg").html(cropHtml);
    });
    
    if ( $("#usccbOrg").is(":empty") ) {
		$("#usccbOrg").load("./myAssets/404/404.html");
	}
}

/***************************************************************
 * Page Load Events (JQM Specific)
 */

/* login page */
$(document).on('pagebeforeshow', '#splashpage', function() {
    $("#myName").on("keydown", function(event) {
		if (event.which == 13) {
			$.mobile.navigate("#coverpage", {transition: "flip"});
			$("#btnUsrInput").click();
		}
	});
	$("#btnUsrInput").click( function() {
		setUsername();
	});
});

$(document).on('pageshow', '#splashpage', function() {
    $("#myName").focus();  
});

/* configure progressbars  */
$(document).on('pagebeforeshow', '#rosary', function() {
    if (mainPageLoaded == false) {
        initUi(); // generate rosary
        mainPageLoaded = true; // prevent reactivating or resetting
    }
});

/* popup modal */
$(document).on("popupbeforeposition", "#myDialogPopUp", function() { 
	// Dynamically populated list content when active is clicked
	
    // show modal content
	$("#infoSubHeader").show();
	$("#infoBody").show();
    
});

/* the code destination for dynamically generated bible list */
$(document).on("pagebeforeshow", "#refferencesPage", function() { 
	// Dynamically populated list content when active is clicked
    if (showBibleListFlag === true) { // Bible Book list in right panel
		
        var info = $("#refferencesPage").data("myDataJsonVar");
        var info_view = '<ol style="list-style: none; padding-left: 0;">';
        var bookID = info["bookID"];

        for (var iLoop = 0; iLoop < rosaryJSON.scripture.length; iLoop += 1) {
            if (rosaryJSON.scripture[iLoop].bookIndex === bookID) {
                info_view += '<li class="ui-field-contain ui-corner-all ui-shadow"><strong>(' + 
					rosaryJSON.scripture[iLoop].chapterIndex + ":" + rosaryJSON.scripture[iLoop].verseIndex + 
					") &#x270d; </strong>" + rosaryJSON.scripture[iLoop].scriptureText + '</li>';
            }
        }
        
        info_view += '</ol>';

        // hide extra elements
        $(this).find("[data-role=prayerContent]").html('');
        $("#reffSubHeader").css("display","none");
        $("#reffBody").css("display","none");

        // show modal content
        $("#reffHeader").html(info["bookName"]);
        $(this).find("[data-role=bibleContent]").html(info_view);
        $("#reffFooter").html("Readings found in: " + info["library"]);
        
    } else if (showPrayerListFlag === true) { // Prayer Book list in right panel
		
        var info = $("#refferencesPage").data("myDataJsonVar2");
        var prayerID = info["prayerID"];
        var info_view = '<ol style="list-style: none; padding-left: 0;">' + 
			'<li class="ui-field-contain ui-corner-all ui-shadow">' + 
			rosaryJSON.prayer[prayerID].prayerText + '</li></ol>';

        // hide extra elements
        $(this).find("[data-role=bibleContent]").html('');
        $("#reffSubHeader").css("display","none");
        $("#reffBody").css("display","none");

        // show modal content
        $("#reffHeader").html(rosaryJSON.prayer[prayerID].prayerName);
        $(this).find("[data-role=prayerContent]").html(info_view);
        $("#reffFooter").html("footer");

    } else { // the other content
		
        // hide bible verse and prayer elements
		$(this).find("[data-role=bibleContent]").html('');
		$(this).find("[data-role=prayerContent]").html('');

        // show modal content
        $("#reffSubHeader").show();
        $("#reffBody").show();
    }
    
});

/* messenger input */
$(document).on('pageshow', '#messagingPage', function() {
    document.getElementById("myMessage").focus();
});
