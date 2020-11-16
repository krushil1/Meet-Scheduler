Modified from https://github.com/devlup-labs/meet-scheduler to open Zoom meetings as well.

## How to use a Zoom meeting link in the extension
If the link is https://us02web.zoom.us/------------------------#success, please remove the #success in the end and then input the link into the extension. Also, if the link is https://us04web.zoom.us/--------------------------------------, please replace the 04 with 02.

## Steps to run locally

1. Make sure you have [Node.js](https://nodejs.org/en/download/) installed on your machine
1. Clone this repository `git clone https://github.com/krushil1/Meet-Scheduler.git`
1. Run `npm install` to install the dependencies
1. Run `npm start`
1. Load your extension on Chrome:
   1. Go to `chrome://extensions/`
   1. Turn on `Developer mode`
   1. Click on `Load unpacked extension`
   1. Select the `build` folder
