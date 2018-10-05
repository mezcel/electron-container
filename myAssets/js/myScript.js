console.log("o---+---+---+---o---+---+---+---o \nJOYFUL MYSTERY OF THE ROSARY \no---+---+---+---o \nMotivation: \nI made this app as a way to recite the rosary differently than I have done before. I also made this to give developers a working test-bench to build off of. \no---+---+---+---o\nMod:\nEdit the JSON variable 'var rosaryJSON;' to customize the chaplet text content. \no---+---+---+---o---+---+---+---o");

/* Global Vars */
var initialHailMaryCounter = 0;
var stringSpaceCounter = 0;
var hailmaryCounter = 0;
var beadCounter = 0;
// var rosaryJSON = a json var defined in rosaryJSON.js

var showBibleListFlag = false; // whether or not an html list was dynamically populated

/* var to contain progress state display  */
var progressBar = {
    setValue: function(beadCounterDecade, beadCounterRosary) {
        $('#decadeSlider').val(beadCounterDecade);
        $('#decadeSlider').slider("refresh");
        $('#rosaryProgress').val(beadCounterRosary);
        $('#rosaryProgress').slider("refresh");
    }
};

/* dynamic fill function */
function fillMysteryInfoContent(mysteryInfoID) {
    showBibleListFlag = false;
    $("#infoHeader").html(rosaryJSON.mysteryInfo[mysteryInfoID].infoHeader);
    $("#infoSubHeader").html(rosaryJSON.mysteryInfo[mysteryInfoID].infoSubHeader);
    $("#infoBody").html(rosaryJSON.mysteryInfo[mysteryInfoID].infoText);
    $("#infoFooter").html("this is suplimentary information about this mystery: " + rosaryJSON.mysteryInfo[mysteryInfoID].infoRefference);
}

function fillAppInfoContent(infoID) {
    showBibleListFlag = false;
    document.getElementById('infoHeader').innerHTML = rosaryJSON.appInfo[infoID].infoHeader;
    document.getElementById('infoSubHeader').innerHTML = rosaryJSON.appInfo[infoID].infoSubHeader;
    document.getElementById('infoBody').innerHTML = rosaryJSON.appInfo[infoID].infoText;
    document.getElementById('infoFooter').innerHTML = rosaryJSON.appInfo[infoID].infoFooter;
}

function fillRosaryBeadPage(counterNo) {
    showBibleListFlag = false;
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
	/*
	 * Progress Calculation Variables:
	 * 	hailmaryCounter
	 * 	thisDecadeSet
	 * 	beadCounter
	 * */

	beadCounter += directionFwRw; // increment
    fillRosaryBeadPage(beadCounter);

    mysteryProgress = 0;

    var decadeIndex = rosaryJSON.rosaryBead[beadCounter].decadeIndex;
    var beadIndex 	= rosaryJSON.rosaryBead[beadCounter].beadIndex;
    var beadType 	= rosaryJSON.bead[beadIndex].beadID;

    switch (beadType) { // the bead type is used to configre count settings
		case 2:
			if (decadeIndex !== 0){

				if(directionFwRw > 0) {
					//fwd
					hailmaryCounter = hailmaryCounter + 1;
				} else {
					//rev

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
                    // initialHailMaryCounter = initialHailMaryCounter + (1 * directionFwRw);
                }
            }

            stringSpaceCounter = 0;

			break;
		case 3: // big bead
			stringSpaceCounter = 0;
            initialHailMaryCounter = 0;

            $("#beadMarker").html("big bead");
            if (directionFwRw < 0) {
                //rev
                if ((hailmaryCounter % 10) > 0) {
                    hailmaryCounter -= 1;
                }
            }
            break;

        case 4: // string space
            if (directionFwRw > 0) {
				//fwd
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

		case 5: // mary icon / bigbead
            $("#beadMarker").html("Mary Icon");
            if (directionFwRw < 0) {
                stringSpaceCounter = 3;
            }
            stringSpaceCounter = 0;
            break;

        case 6: // cross
            $("#beadMarker").html("crucifix");
            initialHailMaryCounter = 0;
            progressBar.setValue(0, 0);
            stringSpaceCounter = 0;
            break;
        default:
            thisDecadeSet = 0;
            $("#beadMarker").html("0 / 0");
            stringSpaceCounter = 0;
            fillRosaryBeadPage(beadCounter); // populate bead text readings
            break;
    }

}

function populateBookJsonList() { // populate the left pannel list with bible content

    var li = "";
    var tempbookIndex = [];
    //container for $li to be added
    $.each(rosaryJSON.scripture, function(i, name) {
        if ($.inArray(name.bookIndex, tempbookIndex) !== -1) { // -1 = false
        } else {
            tempbookIndex.push(name.bookIndex);
            tempbookIndex.sort(function(a, b) {
                return a - b
            });
        }
    });
    for (var iLoop = 0; iLoop < tempbookIndex.length; iLoop += 1) {
        li += '<li><a href="#" id="' + tempbookIndex[iLoop];
        li += '" class="infoDisp">' + rosaryJSON.book[tempbookIndex[iLoop]].bookName + '</a></li>';
    }
    //append list to ul
    $("#bible-list").append(li).promise().done(function() {
        $(this).on("click", ".infoDisp", function(e) {
            $("#infoSubHeader").hide();
            $("#infoBody").hide();
            showBibleListFlag = true;

            e.preventDefault();
            $("#myDialogPopUp").data("myDataJsonVar", rosaryJSON.book[this.id]); //"id" is a builtin data designation var
            var debg = this.id;
            $("#myDialogPopUp").popup("open");
        });
        $(this).listview("refresh");
    });
}

function messengerLinkEvent() { // allow user to set which server to message with

    $( "#btnMessenger" ).on( "click", function() {
        /// inputMsgIp
        var href = $('#inputMsgIp').val();
        var link = $('<a href="' + href + '" />');
        link.attr('target', '_blank');
        window.open(link.attr('href'));
    });
}

function initAudioVolume() { // initial audio setting
    $("#audioAveMaria").prop('volume', 0.25);
}

/* configure progressbars */
$(document).on('pageshow', '#pageone', function() {

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

    populateBookJsonList();
    messengerLinkEvent();
    initAudioVolume();

});

/* the code destination for dynamically generated bible list */
$(document).on("popupbeforeposition", "#myDialogPopUp", function() {
    //get this from data... you put this here when the a link was clicked in the previous page
    if (showBibleListFlag === true) {
        var info = $("#myDialogPopUp").data("myDataJsonVar");
        var info_view = "";
        var bookID = info["bookID"];

        $("#infoHeader").html(info["bookName"]);
        info_view += '<ol style="list-style: none; padding-left: 0;">';
        for (var iLoop = 0; iLoop < rosaryJSON.scripture.length; iLoop += 1) {
            if (rosaryJSON.scripture[iLoop].bookIndex === bookID) {
                info_view += '<li style="border-bottom: .5px solid black; "><strong>(' + rosaryJSON.scripture[iLoop].chapterIndex + ":" + rosaryJSON.scripture[iLoop].verseIndex + ") &#128489;</strong> " + rosaryJSON.scripture[iLoop].scriptureText + '</li>';
            }
        }
        info_view += '</ol>';
        $(this).find("[data-role=bibleContent]").html(info_view);
        $("#infoBody2").show();
        // $("#infoFooter").html("Scripture reffence to the Rosary: <u>The New American Bible</u>");
        $("#infoFooter").html("Readings found in: " + info["library"]);
    } else {
        $("#infoBody2").hide();
        $("#infoSubHeader").show();
        $("#infoBody").show();
    }
});

/* swipe event to trigger buttons */
$(document).on("pagecreate", "#pageone", function() {
    $(".mySwipeClass").on("swiperight", function() {
        beadRev();
    });
    $(".mySwipeClass").on("swipeleft", function() {
        beadFwd();
    });
    // keyboard arrow controlls
    $("html").on("keydown", function(event) {
        if (event.which == 39 ){
            beadFwd();
        } else if (event.which == 37) {
            beadRev();
        }

    });
});

/* toggle dark/light color theme */
$(document).on("pagecreate", function() {
    $("#settings input").on("change", function(event) {
        if (event.target.name === "theme") {

            $("#entireBody").removeClass("ui-page-theme-a ui-page-theme-b");

            if ($("#daynightSwitch").is(":checked")) {
                $("#entireBody").addClass("ui-page-theme-a");
            } else {
                $("#entireBody").addClass("ui-page-theme-b");
            }

        }
    });
});

////
/* prevent images from getting dragged on swipe */
/*
$('img').on('dragstart', function(event) {
    event.preventDefault();
}); //prevent img for being dragged
*/