## Attendance Calci
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
### Chrome (and other Chrome-based) users
* Download the extension from the [releases page](https://github.com/GlowingScrewdriver/attendance_calci/releases) (you should
  download the file with the .zip extension). Extract the zip file to any folder on your computer.
* Go to the extensions page (about:extensions or chrome://extensions) and enable Developer Mode (the switch near the top-right of the page).
* Click on "Load Unpacked" (near the top-left of the page), and select the folder where you extracted the zip file.
* The extension should now be installed

Note: Although this is unlikely, you may be able to install the extension directly by downloading the .crx file and
dragging-and-dropping it onto the extensions page. However, most major chromium-based browsers will block the extension and
not allow it to run. It may work on Chromium, and I don't know what else.

### Firefox users
* Download the extension from the [releases page](https://github.com/GlowingScrewdriver/attendance_calci/releases) (you should
  download the file with the .xpi extension).
* The extension should get installed automatically.
* You will have to enable permissions for the extension. Go to the extensions page (about:addons), click on the extension and go to permissions.

After installing the extension, simply log on to PESU Academy and go to "My Attendance". You should see an extra column on the attendance table.  
Note: If the page takes too load, the extension might not work. If you notice that nothing happens when you load the attendance page,
simply reload the page and see if it works.

Keep a lookout for updates on this GitHub page. Automatic updates have not been set up.
