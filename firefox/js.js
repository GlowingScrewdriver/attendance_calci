console.log("I am run");
/*function setup_buttons () {
	subs = document.querySelectorAll('#subjetInfo > tr');

	for (let i = 0; i < subs.length; i++) {
		//attendances.push(new Attendance(subs[i]));
		new Attendance(subs[i]);
	}

	th = document.createElement("th");
	th.innerHTML = "Attendance Calculator";
	document.querySelector("#studentAttendanceSemester thead > tr").append(th);
}
document.querySelector('li[data-url*="Attendance"]').onclick = () => {
	setTimeout(setup_buttons, 1000) };*/

/*browser.scripting.registerContentScripts([{
  id: "js",
  js: ["js.js"],
  matches: ["*://*.pesuacademy.com/*"]
}]);*/

try {
	document.querySelector('li[data-url*="Attendance"]').onclick = () => {
		setTimeout( () => {
			subs = document.querySelectorAll('#subjetInfo > tr');

			for (let i = 0; i < subs.length; i++) {
				//attendances.push(new Attendance(subs[i]));
				new Attendance(subs[i]);
			}

			th = document.createElement("th");
			th.innerHTML = "Attendance Calculator";
			document.querySelector("#studentAttendanceSemester thead > tr").append(th);
		}, 1000)
	};
} catch (err) {
	if (err.type == "TypeError")
		throw Error();
}
class Attendance {
/* One instance of `Object Attendance` for each subject. Contains
   * .tr, .td: the HTML <tr> for that subject in the attendance table, and a <td> in which to dump stuff.
   * .attended, .conducted: counts of classes attended and conducted.
   * .attn_fn_chooser, .attn_ip_chooser: the <input>s for the parameter to calculate and the input.
   * .calc_op: the <> displaying whatever is calculated.
*/

	constructor (tr) {
		this.tr = tr; // The <tr> associated with the subject. Used as distinction mechanism.
		this.td = document.createElement("td");
		this.tr.append(this.td);

		let classes = this.tr.children[2].innerHTML.split("/");
		this.attended = Number(classes[0]);
		this.conducted = Number(classes[1]);

		this.attn_fn_chooser = document.createElement("select"); // Dropdown to select what to calculate
		this.attn_fn_chooser.innerHTML = `
			<option value="bunk">bunk __ classes</option>
			<option value="target">target __ attendance</option>
			<option value="bunk_to_target">bunk, retaining __ attendance</option>
		`;
		this.attn_fn_chooser.value = "bunk";
		this.attn_fn_chooser.onchange = () => { this.eval(); }; // Wrap `eval`, since `this` otherwise takes the value of the target element in `eval`'s context.
		this.td.append(this.attn_fn_chooser);

		this.attn_ip_chooser = document.createElement("input"); // The input to the calculator
		this.attn_ip_chooser.type = "number";
		this.attn_ip_chooser.min = 0;
		this.attn_ip_chooser.style.display = "inline";
		this.attn_ip_chooser.style.width = "5em";
		this.attn_ip_chooser.value = 1;
		this.attn_ip_chooser.oninput = () => { this.eval("Don't set defaults"); };
		this.td.append(this.attn_ip_chooser);

		this.calc_op = document.createElement("span");
		this.calc_op.style.marginLeft = "1em";
		this.td.append(this.calc_op);

		this.eval();
	}

	attendance () { // Current attendance as percentage
		return this.attended*100/this.conducted; }

	target (x) { // How many classes more to reach a target of x% attendance?
		x = x/100;
		return (x*this.conducted - this.attended) / (1 - x); }

	bunk (x) { // What will be attendance after bunking x classes?
		return this.attended*100 / (this.conducted + x); }

	bunk_to_target (x) { // How many classes can I bunk while targetting x% attendance?
		x = x/100;
		return (this.attended/x) - this.conducted; }


	eval (set_default) { // Run the entire calculation + display routine for given user inputs. Set default values if set_default is not null.
		let ip;
		let res;

		switch (this.attn_fn_chooser.value) {
		case "bunk":
			if (!set_default)
				this.attn_ip_chooser.value = 1;
			ip = Number(this.attn_ip_chooser.value);
			res = "Will have " + this.bunk(ip).toFixed(2) + "%";
			break;

		case "target":
			if (!set_default) {
				this.attn_ip_chooser.min = this.attendance().toFixed(2);
				this.attn_ip_chooser.max = 100;
				this.attn_ip_chooser.value = Number(this.attn_ip_chooser.min) + 5;
			}
			ip = Number(this.attn_ip_chooser.value);
			res = "Attend " + Math.ceil(this.target(ip)) + " classes";
			break;

		case "bunk_to_target":
			if (!set_default) {
				this.attn_ip_chooser.max = this.attendance().toFixed(2);
				this.attn_ip_chooser.min = 0;
				this.attn_ip_chooser.value = Number(this.attn_ip_chooser.max) - 5;
			}
			ip = Number(this.attn_ip_chooser.value);
			res = "Can bunk " + Math.floor(this.bunk_to_target(ip)) + " classes";
			break;
		}

		//console.log(res);
		this.calc_op.innerHTML = "  " + res;
	}
}
