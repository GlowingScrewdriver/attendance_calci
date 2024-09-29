## Attendance Calci
![image](https://github.com/user-attachments/assets/c5437292-bcf2-4aec-9d66-09ef0e5a2d1e)
An attendance calculator that integrates with the PESU Academy webpage.  
There is no communication with the PESU server; information about attendance (specifically, the number of classes attended and conducted for each subject) is taken from the webpage once it loads on your screen

Attendance calci adds an extra column to the Attendance page on PESU academy which you can use to calculate what you want.

## What can it do?
There are three basic operations you can carry out with this:

* Attendance after bunking some number of classes
* How many classes one needs to attended to reach some percentage of attendance
* How many classes one can bunk while retaining some percentage of attendance

Further, you can also 'chain' operations. This allows you to carry out one operation (e.g. "Bunk n classes") and then carry
out further operations based on the result of the first (e.g. "Target x attendance after bunking n classes"). To try out this
feature, simply click "chain" after calculating anything. A new set of buttons will be added, offering the same set of basic
operations, but with calculations done on the result of the first operation.  
There is no limit to the number of operations you can chain.

## Installation Instructions
### Chrome, Edge, Brave and other Chromium-based users
* Download the extension from the [releases page](https://github.com/GlowingScrewdriver/attendance_calci/releases) (you should
  download the file with the .zip extension). Extract the zip file to any folder on your computer.
* Go to the extensions page (chrome://extensions) and enable the Developer Mode (the switch near the top-right of the page).
* Click on "Load Unpacked" (near the top-left of the page), and select the folder where you extracted the zip file.
* The extension should now be installed

### Firefox users
* Download the extension from the [releases page](https://github.com/GlowingScrewdriver/attendance_calci/releases) (you should
  download the file with the .xpi extension).
* The extension should get installed automatically.
* You will have to enable permissions for the extension. Go to the extensions page (about:addons), click on the extension and go to permissions.

After installing the extension, simply log on to PESU Academy and go to "My Attendance". You should see an extra column on the attendance table.  

Keep a lookout for updates on this GitHub page. Automatic updates have not been set up.

## Reporting Bugs
I cannot possibly foresee everything that can go wrong with this software. While I try to keep things from breaking, feedback
from users definitely helps.

If you find a bug, feel free to open an issue on the [issues tab of the project](https://github.com/GlowingScrewdriver/attendance_calci/issues).

If you find a fix for a bug, go ahead and open a pull request!

## If you're not from PESU
Although I set this up to work on PESU Academy, getting it to work on other college websites should be trivial. If you can do so
for your college, do reach out! I would love to include your work in this project.

Have a look at [`attendance-calci.js`](attendance-calci.js) if you're interested in trying. A few pointers to get you started:
* The constructor for class `Attendance` is what extracts info from the webpage.<br>
  One instance of this class is constructed for each subject in an attendance table.
* Function `setup_buttons` sets up the attendance calculator buttons on the webpage
