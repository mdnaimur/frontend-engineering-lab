/* ----------------------------
   Validators
---------------------------- */
const validators = {
  required: (v = "") => v.trim().length > 0 || "Required",
  email: (v = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email",
  minLength:
    (n) =>
    (v = "") =>
      v.length >= n || `Min ${n} chars`,
};

function validate(value, rules) {
  for (const rule of rules) {
    const r = rule(value);
    if (r !== true) return r;
  }
  return null;
}

/* ----------------------------
   Field State
---------------------------- */
const fieldState = {
  email: { touched: false, valid: false, runValidation: null },
  password: { touched: false, valid: false, runValidation: null },
};

/* ----------------------------
   Setup Field
---------------------------- */
function setupField(input, rules) {
  const name = input.name;
  const hint = document.querySelector(`[data-hint="${name}"]`);

  function runValidation() {
    const error = validate(input.value, rules);
    fieldState[name].valid = !error;

    input.classList.remove("valid", "invalid");

    if (error && fieldState[name].touched) {
      input.classList.add("invalid");
      hint.textContent = error;
    } else if (!error) {
      input.classList.add("valid");
      hint.textContent = "";
    }
  }

  fieldState[name].runValidation = runValidation;

  input.addEventListener("blur", () => {
    fieldState[name].touched = true;
    runValidation();
  });

  input.addEventListener("input", () => {
    if (fieldState[name].touched) runValidation();
  });
}

/* ----------------------------
   MultiStepForm (your class)
---------------------------- */
class MultiStepForm {
  constructor(formEl) {
    this.form = formEl;
    this.steps = [...formEl.querySelectorAll("[data-step]")];
    this.current = 0;
    this.data = {};

    this.render();
  }

  render() {
    this.steps.forEach((step, i) => {
      step.hidden = i !== this.current;
    });

    document.getElementById("back").style.display =
      this.current === 0 ? "none" : "inline-block";

    document.getElementById("next").style.display =
      this.current === this.steps.length - 1 ? "none" : "inline-block";

    document.getElementById("submit").hidden =
      this.current !== this.steps.length - 1;

    this.updateProgress();
  }

  updateProgress() {
    const pct = (this.current / (this.steps.length - 1)) * 100;
    this.form.querySelector(".progress-bar").style.width = pct + "%";
    this.form.querySelector(".step-count").textContent =
      `Step ${this.current + 1} of ${this.steps.length}`;
  }

  next() {
    if (!this.validateCurrentStep()) return;

    const inputs = this.steps[this.current].querySelectorAll("[name]");
    inputs.forEach((input) => (this.data[input.name] = input.value));

    this.current++;
    this.render();
  }

  back() {
    this.current--;
    this.render();
  }

  validateCurrentStep() {
    const inputs = this.steps[this.current].querySelectorAll("[name]");
    let ok = true;

    inputs.forEach((input) => {
      fieldState[input.name].touched = true;
      fieldState[input.name].runValidation();

      if (!fieldState[input.name].valid) ok = false;
    });

    return ok;
  }

  async submit() {
    const inputs = this.steps[this.current].querySelectorAll("[name]");
    inputs.forEach((input) => (this.data[input.name] = input.value));

    console.log("Submitting:", this.data);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Signup complete!");
  }
}

/* ----------------------------
   Init
---------------------------- */
const form = document.getElementById("form");

setupField(form.email, [validators.required, validators.email]);
setupField(form.password, [validators.required, validators.minLength(6)]);

const wizard = new MultiStepForm(form);

document.getElementById("next").onclick = () => wizard.next();
document.getElementById("back").onclick = () => wizard.back();
document.getElementById("submit").onclick = () => wizard.submit();
