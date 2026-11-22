
const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");
const formFeedback = document.querySelector("#form-feedback");

const fields = ["nama", "email", "telepon", "paket", "pesan", "setuju"]
  .map((id) => document.querySelector(`#${id}`));

const topikInputs = document.querySelectorAll('input[name="topik"]');

function getFieldError(field) {
  const validity = field.validity;

  if (validity.valueMissing) return "Bagian ini wajib diisi.";
  if (validity.typeMismatch) return "Format email belum sesuai.";
  if (validity.tooShort) return `Isi minimal ${field.minLength} karakter.`;
  if (validity.patternMismatch) return "Format nomor harus 10-14 digit.";

  return "";
}

function tampilkanError(field, pesan) {
  const error = document.querySelector(`#${field.id}-error`);

  field.setCustomValidity(pesan);
  field.setAttribute("aria-invalid", pesan ? "true" : "false");

  if (error) error.textContent = pesan;
}

function validasiField(field) {
  field.setCustomValidity("");
  const pesan = getFieldError(field);
  tampilkanError(field, pesan);
  return pesan === "";
}

fields.forEach((field) => {
  field.addEventListener("input", () => {
    validasiField(field);
  });

  field.addEventListener("blur", () => {
    validasiField(field);
  });
});

function tampilkanPreview() {
  const data = new FormData(form);

  preview.textContent = [
    `Nama: ${data.get("nama")}`,
    `Email: ${data.get("email")}`,
    `WhatsApp: ${data.get("telepon")}`,
    `Paket: ${data.get("paket")}`,
    `Topik: ${data.get("topik")}`,
    `Waktu Kontak: ${data.get("waktu_kontak")}`,
    `Pesan: ${data.get("pesan")}`,
  ].join("\n");

  formFeedback.textContent = "Form valid. Preview berhasil dibuat.";
  formFeedback.classList.add("success");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const semuaValid = fields.every((field) => validasiField(field));
  const topikValid = Array.from(topikInputs).some((input) => input.checked);

  const topikError = document.querySelector("#topik-error");
  if (topikError) {
    topikError.textContent = topikValid ? "" : "Pilih salah satu topik.";
  }

  if (!semuaValid || !topikValid || !form.checkValidity()) {
    formFeedback.textContent = "Periksa kembali bagian yang ditandai.";
    formFeedback.classList.remove("success");

    form.querySelector(":invalid")?.focus();
    return;
  }

  tampilkanPreview();
});
