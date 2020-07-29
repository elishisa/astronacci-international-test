<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <p class="fs-20-b" style="margin-bottom: 20px;">Login ke akun anda</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10 text-center">
        <div class="formfield text-left mb-3" style="margin: auto;">
          <input
            type="text"
            id="login-form-email"
            @input="changeNewSub($event)"
            :value="email"
            @keypress.enter="checkForm"
            :disabled="loadingx"
            required
          />
          <label for="login-form-email" class="label" style="cursor: text;">Email</label>
          <div class="alert-empty" id="alert-empty-email">Alamat email tidak boleh kosong</div>
          <div class="alert-empty" id="alert-empty-email-format">Format email tidak sesuai</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="formfield text-left" style="margin: auto;">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="login-form-password"
            @input="changeNewSub($event)"
            :value="password"
            :disabled="loadingx"
            @keypress.enter="checkForm"
            required
          />
          <label for="login-form-password" class="label" style="cursor: text;">Kata Sandi</label>
          <span
            v-if="showPassword"
            @click="showPassword = false"
            class="fa fa-fw fa-eye fa-eye field-icon"
          />
          <span v-else @click="showPassword = true" class="fa fa-fw fa-eye-slash field-icon" />
          <span
            class="text-left color-grey"
            id="alert-pass-format-grey"
          >*Kata sandi minimal 8 karakter terdiri dari huruf dan angka.</span>
          <div
            class="alert-empty-special"
            id="alert-pass-format-red"
          >*Kata sandi minimal 8 karakter terdiri dari huruf dan angka.</div>
          <div class="alert-empty-green" id="alert-pass-format-green">*Format sudah sesuai.</div>
          <div
            class="alert-empty-special"
            id="alert-pass-format-red3"
          >*Kata sandi tidak boleh kosong</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">recaptcha</div>
    </div>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <button
          class="btn btn-main"
          style="padding: 10px 10px 10px 10px; width: 100%; margin: auto;"
          @click="checkForm"
          :disabled="loadingx"
        >
          Konfirmasi
          <svg
            v-if="loading"
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 50 50"
            style="enable-background:new 0 0 50 50;"
            xml:space="preserve"
          >
            <path
              fill="#000"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center" style="margin-top: 10px;">
        <p class="text-center" style="color: red; margin-top: 5px;">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import JQuery from "jquery";
let $ = JQuery;
export default {
  data() {
    return {
      email: null,
      password: null,
      responseData: null,
      showPassword: false,
      counter: 0,
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      passPattern: /^[A-Za-z0-9]+[A-Za-z0-9]{1,50}$/,
      stringData: "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm",
      numberData: "1234567890",
      errorPassword: null,
      errorMessage: null,
      loading: false,
      loadingx: false,
    };
  },

  methods: {
    changeNewSub(event) {
      this.errorPassword = null;
      $("alert-pass-format-red3").hide();
      const char = this.stringData.split("");
      const number = this.numberData.split("");
      let status = 1;
      if (event.target.id === "login-form-password") {
        let inputPass = event.target.value.split("");
        let anyNum = false;
        let anyLetter = false;
        char.forEach((letter) => {
          inputPass.forEach((input) => {
            if (letter === input) {
              anyLetter = true;
            }
          });
        });
        number.forEach((num) => {
          inputPass.forEach((input) => {
            if (num === input) {
              anyNum = true;
            }
          });
        });
        let testPattern = this.passPattern.test(event.target.value);
        if (testPattern && anyNum && anyLetter && inputPass.length >= 8) {
          this.password = event.target.value;
          status = 1;
          $("#alert-pass-format-red").hide();
          $("#alert-pass-format-grey").hide();
          $("#alert-pass-format-green").show();
        } else {
          this.password = event.target.value;
          status = 0;
          $("#alert-pass-format-red").show();
          $("#alert-pass-format-green").hide();
          $("#alert-pass-format-grey").hide();
          $("alert-pass-format-red3").show();
        }
      } else {
        if (event.target.value === "") {
          $("#alert-empty-email-format").hide();
          $("#alert-empty-email").show();
          this.email = event.target.value;
        } else {
          $("#alert-empty-email").hide();
          let status = this.pattern.test(event.target.value);
          if (status) {
            $("#alert-empty-email-format").hide();
            this.email = event.target.value;
            this.errorStatus = 0;
          } else {
            $("#alert-empty-email-format").show();
            this.email = event.target.value;
            this.errorStatus += 1;
          }
        }
      }
    },
    onError(error) {
      console.log("Error happened:", error);
    },
    onSuccess(token) {
      console.log("Succeeded:", token);
      // here you submit the form
      this.$refs.form.submit();
    },
    onExpired() {
      console.log("Expired");
    },

    checkForm() {
      if (!this.loading) {
        this.loading = true;
        let checkMail = this.email * 1;
        let checkSandi = this.password * 1;
        if (checkMail === 0 && checkSandi === 0) {
          this.errorMessage = "Username/email dan kata sandi harus diisi";
          this.loading = false;
        } else if (checkMail !== 0 && checkSandi !== 0) {
          if (this.password !== "Abcd12345") {
            this.errorMessage = "password anda salah";
            let count = ++this.counter;
            this.loading = false;
            if (count > 3) {
              this.errorMessage = "Akun anda sudah di block";
              this.password = "";
              this.email = "";
              this.loading = false;
              this.loadingx = true;
            }
            console.log(count);
          } else {
            this.errorMessage = "Anda berhasil login";
            this.$router.push("/homepage");
            this.loading = false;
          }
        } else {
          if (checkMail === 0) {
            this.errorMessage = "Username/email harus diisi";
            this.loading = false;
          } else {
            this.errorMessage = "Kata Sandi harus diisi";
            this.loading = false;
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.alert-empty {
  color: rgb(218, 52, 52);
  font-size: 12px;
  display: none;
}
.alert-empty-special {
  color: rgb(218, 52, 52);
  font-size: 12px;
  margin-top: -20px;
  display: none;
}
.alert-empty-green {
  color: rgb(79, 235, 131);
  font-size: 12px;
  margin-top: -20px;
  display: none;
}
</style>

