<#
    build-executable-app.ps1
    remove previous build and package a new build
#>

function killRunningProcess() {
    ## kill any running  processes
    Write-Host "kill any running electron-rosary* processes ..." -ForegroundColor Cyan
    Stop-Process -Name "electron-rosary*"
    Start-Sleep 3
}

function removePreviousBuild() {

    ## rm old build
    Write-Host "Remove previous build ..." -ForegroundColor Cyan

    $arch = $env:PROCESSOR_ARCHITECTURE
    $length = $arch.length
    $archNo = $arch.substring($length -2)

    if ( $archNo = "64" ) {
        Remove-Item -Recurse -Force ".\electron-rosary-win32-x64" -ErrorAction Ignore
    } else {
        Remove-Item -Recurse -Force ".\electron-rosary-win32-ia32" -ErrorAction Ignore
    }

    Start-Sleep 3
}

function buildNewPackage() {
    ## build new package
    Write-Host "Build a new package ..." -ForegroundColor Cyan
    electron-packager .
    Start-Sleep 3
}

function set-shortcut( [string]$ShortcutFile, [string]$WorkingDir, [string]$TargetFile, [string]$shortcutIcon ) {
    $WScriptShell = New-Object -ComObject WScript.Shell

    $Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
    $Shortcut.TargetPath = $TargetFile
    $Shortcut.WorkingDirectory = $WorkingDir
    $Shortcut.IconLocation=$shortcutIcon

    $Shortcut.Save()
}
function createShortcutLinks() {
    ## Make a shortcut link
    Write-Host "Creating shortcut links..." -ForegroundColor Cyan
    Set-Location -Path electron-rosary-*

    $verbosePath = Get-Location
    $appName = "electron-rosary"
    $linkName = "$appName.lnk"
    $exeName = "$appName.exe"
    $ShortcutFile1 = "$env:UserProfile\Desktop\$linkName"

    $WorkingDir = "$verbosePath"
    $TargetFile = "$verbosePath\$exeName"
    $shortcutIcon = "$verbosePath\resources\app\myAssets\img\favicon.ico"

    ## desktop
    set-shortcut $ShortcutFile1 $WorkingDir $TargetFile $shortcutIcon
    Write-Host "Created a desktop shortcut ..." -ForegroundColor Cyan

    Set-Location -Path ..\

}

function main() {
    ## Install npm package
    npm install
    Start-Sleep 3

    npm install -g electron-packager
    Start-Sleep 3

    killRunningProcess
    removePreviousBuild
    buildNewPackage
    createShortcutLinks
}

<# RUN #>

main

Write-Host "Done.`n"-ForegroundColor Yellow
