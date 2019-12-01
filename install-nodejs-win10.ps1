#
## win10-installer.ps1
#

function downloadNodejs {
	# Download the Nodjs installer

	write-host "Downloading NodeJS ..."

	$url = "https://nodejs.org/dist/v12.13.1/node-v12.13.1-x64.msi"
	$outputFile = Split-Path $url -leaf
	$output = "C:\Users\$env:UserName\Downloads\$outputFile"

	Invoke-WebRequest -Uri $url -OutFile $output

	## Install via a web browser
	# start "https://www.mozilla.org/en-US/firefox/download/thanks/"
}

function installNodejs {

	$url = "https://nodejs.org/dist/v12.13.1/node-v12.13.1-x64.msi"
	$outputFile = Split-Path $url -leaf
	$output = "C:\Users\$env:UserName\Downloads\$outputFile"

	## if file exists, then do the do
	if ( Test-Path -Path $output -PathType Leaf ) {
		write-host "installing $output ..."
		Start-Process -FilePath $output
	} else {
		downloadNodejs
		Start-Process -FilePath $output
	}
}

function donePrompt {
	# A display prompt to indicate that the end of the script sequence is reached.

	write-host ""
	write-host "Done."
	write-host "Press any key to continue..."
	[void][System.Console]::ReadKey($true)
}

function main {
	installNodejs
	donePrompt
}

main