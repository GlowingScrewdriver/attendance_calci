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
   * .chained_Attendance: A new Attendance object, reflecting future attendance after a single operation. (Not declared during construction)
   * .chain_btn, .chain_reset_btn: A button to update parameters and accordingly add a new link to the chain, reflecting a future attendance state; and a button to reset the chain
*/

	constructor (tr, parent) {
		this.tr = tr; // The <tr> associated with the subject. Used as distinction mechanism.
		this.td = document.createElement("td");

		this.parent = parent || tr;
		this.parent.append(this.td);

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

		this.chained_Attendance = null;

		this.chain_btn = document.createElement("button");
		this.chain_btn.innerHTML = "Chain"
		this.chain_btn.onclick = () => {
			this.chain(35, 40); }
		this.td.append(this.chain_btn);

		this.chain_reset_btn = document.createElement("button");
		this.chain_reset_btn.innerHTML = "Reset Chain";
		this.chain_reset_btn.onclick = () => {
			this.chain_btn.style.display = "initial";
			this.chained_Attendance.td.remove();
			delete this.chained_Attendance;
		};
		this.td.append(this.chain_reset_btn);

		this.eval();
	}

	attendance () { // Current attendance as percentage
		return this.attended*100/this.conducted; }

	target (x) { // How many classes more to reach a target of x% attendance?
		if ((x > 99) || x < this.attendance())
			return "oops";
		x = x/100;

		let res = 0;
		while ( ((this.attended + res) / (this.conducted + res)) < x)
			res += 1;

		return res;
	}

	bunk (x) { // What will be attendance after bunking x classes?
		return this.attended*100 / (this.conducted + x);
	}

	bunk_to_target (x) { // How many classes can I bunk while targetting x% attendance?
		if ( (x > this.attendance()) || (x < 1) )
			return "oops";

		x = x/100;
		let res = 0;

		while ( ((this.attended) / (this.conducted + res)) > x ) {
			res += 1;
		}

		return res - 1;
	}


	eval (set_default) { // Run the entire calculation + display routine for given user inputs. Set default values if set_default is not null.
		let ip;
		let res;
		let res_num;
		let new_attended;
		let new_conducted;

		switch (this.attn_fn_chooser.value) {
		case "bunk":
			if (!set_default)
				this.attn_ip_chooser.value = 1;

			ip = Number(this.attn_ip_chooser.value);
			res = "Will have " + this.bunk(ip).toFixed(2) + "%";

			new_attended = this.attended;
			new_conducted = this.conducted + ip;

			break;

		case "target":
			if (!set_default) {
				this.attn_ip_chooser.min = this.attendance().toFixed(2);
				this.attn_ip_chooser.max = 100;
				this.attn_ip_chooser.value = Number(this.attn_ip_chooser.min) + 5;
			}

			ip = Number(this.attn_ip_chooser.value);
			res_num = this.target(ip);
			res = "Attend " + res_num + " classes";

			new_attended = this.attended + res_num;
			new_conducted = this.conducted + res_num;

			break;

		case "bunk_to_target":
			if (!set_default) {
				this.attn_ip_chooser.max = this.attendance().toFixed(2);
				this.attn_ip_chooser.min = 0;
				this.attn_ip_chooser.value = Number(this.attn_ip_chooser.max) - 5;
			}

			ip = Number(this.attn_ip_chooser.value);
			res_num = 	this.bunk_to_target(ip);
			res = "Can bunk " + res_num + " classes";

			new_attended = this.attended;
			new_conducted = this.conducted + res_num;
			break;
		}

		this.chain_btn.onclick = () => {
			this.chain(new_attended, new_conducted); };
		this.chain_update(new_attended, new_conducted)
		this.calc_op.innerHTML = "  " + res;
	}

	chain (attended, conducted) {
		this.chained_Attendance = new Attendance(this.tr, this.td);
		this.chained_Attendance.attended = attended;
		this.chained_Attendance.conducted = conducted;
		this.chained_Attendance.eval();
		this.chain_btn.style.display = "none";
		this.chained_Attendance.chain_reset_btn.style.display = "none";
	}

	chain_reset () { // Reset the chain -- retain only `this` object.
		this.chained_Attendance = null;
	}

	chain_update (new_attended, new_conducted) { // Propagate changes through the chain
		if (!this.chained_Attendance)
			return;

		this.chained_Attendance.attended = new_attended;
		this.chained_Attendance.conducted = new_conducted;
		this.chained_Attendance.eval("Don't set defaults");
		this.chained_Attendance.chain_update();

	}
}
