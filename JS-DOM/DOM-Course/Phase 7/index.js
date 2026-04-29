// console.log("I am working ");
// const form = document.querySelector("#signup-form");
// const output = document.getElementById("output");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = document.querySelector("#email").value;
//   const pass = document.querySelector("#password").value;

//   console.log("Manual system: ", email, pass);

//   // Method 2: FormData (form)

//   console.log("I am form", form);
//   const data = new FormData(form);
//   console.log("I am Data(from form):", data);

//   const emailFD = data.get("email");
//   console.log("I am emailFD", emailFD);
//   const interests = data.getAll("interests");
//   console.log("I am interest", interests);
//   const hasNewslatters = data.has("newsletter");
//   console.log("I am hasNewslatters", hasNewslatters);

//   const playload = Object.fromEntries(data);

//   console.log("I am playload", playload);

//   const emailEl = form.elements.email;
//   console.log("I am emailEl", emailEl);
//   const passEl = form.elements.password;
//   console.log("I am passEl", passEl);
//   const termsEl = form.elements.terms;
//   console.log("I am termsEl", termsEl);
//   const planEl = form.elements.plan;
//   console.log("I am planEl", planEl);

//   const EmailEE = form.elements["email"].value;
//   console.log("I am EmailEE", EmailEE);
//   const passEE = form.elements["password"].value;
//   console.log("I am passEE", passEE);
//   const termsEE = form.elements["terms"];
//   console.log("I am termsEE", termsEE);
//   const planEE = form.elements["plan"];
//   console.log("I am planEE", planEE);

//   output.textContent = JSON.stringify(
//     {
//       manual: { email, pass },
//       formData: playload,
//       extra: { termsChecked, planValue },
//     },
//     null,
//     2,
//   );
// });

// const form = document.querySelector("#signup-form");
// const output = document.getElementById("output");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Method 1
//   const email = document.querySelector("#email").value;
//   const pass = document.querySelector("#password").value;

//   // Method 2
//   const data = new FormData(form);
//   const payload = Object.fromEntries(data);

//   // Method 3
//   const termsChecked = form.elements["terms"].checked;
//   const planValue = form.elements["plan"].value;

//   output.textContent = JSON.stringify(
//     {
//       manual: { email, pass },
//       formData: payload,
//       extra: { termsChecked, planValue },
//     },
//     null,
//     2,
//   );
// });

// const validators = {
//   required: (v = "") => v.trim().length > 0 || "This field is required",

//   email: (v) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ||
//     "Enter a valid email address",

//   minLength: (n) => (v) => v.length >= n || `Must be at least ${n} characters`,

//   matches: (otherId, label) => (v) => {
//     const other = document.getElementById(otherId).value;
//     return v === other || `Must match ${lebel}`;
//   },
// };

// function validate(field, rules) {
//   if (!rules) return null; // 🚨 prevent crash

//   for (const rule of rules) {
//     const result = rule(field.value);
//     if (result !== true) return result;
//   }

//   return null;
// }

// const rules = {
//   email: [validators.required, validators.email],
//   password: [validators.required, validators.minLength(6)],
//   confirm: [validators.required, validators.matches("password", "Password")],
// };

// function validateField(input) {
//   const field = input.closest(".field");
//   const errorEl = field.querySelector(".error");

//   const rulesForField = rules[input.id];

//   if (!rulesForField) return true; // skip unknown fields

//   const error = validate(input.value, rules[input.id]);

//   console.log(error);

//   field.classList.remove("is-valid", "is-invalid");

//   if (error) {
//     field.classList.add("is-invalid");
//     errorEl.textContent = error;
//   } else {
//     field.classList.add("is-valid");
//     errorEl.textContent = "";
//   }

//   return !error;
// }

// document.querySelectorAll("input").forEach((input) => {
//   input.addEventListener("blur", () => validateField(input));

//   input.addEventListener("input", () => {
//     if (input.closest(".field").classList.contains("is-invalid")) {
//       validateField(input);
//     }
//   });
// });

// document.getElementById("form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   let valid = true;

//   document.querySelectorAll("input").forEach((input) => {
//     if (!validateField(input)) valid = false;
//   });

//   if (valid) {
//     alert("Form submitted successfully!");
//   }
// });

// const email = document.querySelector('[name = "email"]');
// const password = document.querySelector('[name = "password"]');

// console.log("Email is : ", email);
// console.log("password is :", password);

// setupField(email, []);
// setupField(password, []);

// function setupField(input, rules) {
//   if (!input) return;

//   const name = input.name;
//   const hint = document.querySelector(`[data-hint="${name}"]`);
//   const wrap = input.closest(".field");

//   console.log("name is : ", name);
//   console.log("hint is : ", hint);
//   console.log("wrap is : ", wrap);

//   function runValidation() {
//     const error = validate(input.value, rules);
//     console.log("error is : ", error);
//     fieldState[name].valid = !error;

//     if (error && fieldState[name].touched) {
//       input.classList.remove("valid");
//       input.classList.add("invalid");

//       hint.textContent = error;
//       hint.classList.add("error");

//       wrap.classList.add("has-error");
//     } else if (!error) {
//       input.classList.remove("invalid");
//       input.classList.add("valid");

//       hint.textContent = "";
//       hint.classList.remove("error");

//       wrap.classList.remove("has-error");
//     }
//   }

//   input.addEventListener("blur", () => {
//     fieldState[name].touched = true;
//     runValidation();
//   });

//   input.addEventListener("input", () => {
//     fieldState[name].dirty = true;
//     runValidation();
//   });
// }

// function validate(value, rules) {
//   if (value.length < 3) return "Too short";
//   return null;
// }

// const fieldState = {
//   email: {
//     touched: false,
//     dirty: false,
//     valid: false,
//   },
//   password: {
//     touched: false,
//     dirty: false,
//     valid: false,
//   },
// };

// document.getElementById("signup").addEventListener("submit", (e) => {
//   e.preventDefault();
//   let valid = true;

//   document.querySelectorAll("input").forEach((input) => {
//     const error = validate(input.value, []);
//     if (error) valid = false;
//   });

//   if (valid) {
//     alert("Form submitted successfully!");
//   }
// });

// ----------------------------
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



function isRequired(value) {
  return value.trim() !== "";
}

function isEmail(value) {
  return value.includes("@");
}

function minLength(value, n) {
  return value.length >= n;
}


function validateEmail(value) {
  if (!isRequired(value)) return "Email required";
  if (!isEmail(value)) return "Invalid email";
  return null;
}

function validatePassword(value) {
  if (!isRequired(value)) return "Password required";
  if (!minLength(value, 6)) return "Min 6 chars";
  return null;
}

function setupField(input, validateFn) {
  const hint = document.querySelector(`[data-hint="${input.name}"]`);

  input.addEventListener("blur", () => {
    const error = validateFn(input.value);

    if (error) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      hint.textContent = error;
    } else {
      input.classList.add("valid");
      input.classList.remove("invalid");
      hint.textContent = "";
    }
  });
}

let currentStep = 0;
const steps = document.querySelectorAll("[data-step]");

function showStep(index) {
  steps.forEach((step, i) => {
    step.hidden = i !== index;
  });
}

function nextStep() {
  if (currentStep === 0) {
    const email = document.querySelector('[name="email"]');
    const error = validateEmail(email.value);

    if (error) {
      alert(error);
      return;
    }
  }

  if (currentStep === 1) {
    const pass = document.querySelector('[name="password"]');
    const error = validatePassword(pass.value);

    if (error) {
      alert(error);
      return;
    }
  }

  currentStep++;
  showStep(currentStep);
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function submitForm() {
  const email = document.querySelector('[name="email"]').value;
  const password = document.querySelector('[name="password"]').value;

  console.log({
    email: email,
    password: password
  });

  alert("Form submitted!");
}

const form = document.getElementById("form");

setupField(form.email, validateEmail);
setupField(form.password, validatePassword);

showStep(currentStep);

document.getElementById("next").onclick = nextStep;
document.getElementById("back").onclick = prevStep;
document.getElementById("submit").onclick = submitForm;