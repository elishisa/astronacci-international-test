<template>
  <div class="container-static">
    <section class="col-2 color ss-style-curvedown">
      <div class="column text"></div>
    </section>

    <svg
      id="curveDownColor"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100%"
      height="80"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M0 0 C 50 100 80 100 100 0 Z" />
    </svg>
    <div class="container login-padding">
      <p class="lead">
        <a href="/home" class="btn btn-sm btn-main">Kembali ke halaman awal</a>
      </p>
      <div class="row">
        <div class="col-12">
          <ul>
            <li>Notes:</li>
            <li>(Tipe A) Email : admin123@gmail.com , Password: admin123</li>
            <li>(Tipe B) Email : admin@gmail.com , Password: adminadmin</li>
            <li>(Tipe C) Email : admin345@gmail.com , Password: admin345</li>
          </ul>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
          <div class="row border-login">
            <div class="col-12 mb-3">
              <div class="text-center">
                <h4 class="color-black font-weight-bold p-2" style="line-height: 1.4em">Login</h4>
              </div>
            </div>
            <div class="col-12">
              <div class="formfield text-left mb-3" style="margin: auto;">
                <input
                  v-model="email"
                  @keypress.enter="login"
                  type="text"
                  id="login-form-email"
                  required
                />
                <label for="login-form-email" class="label" style="cursor: text;">Email</label>
              </div>
            </div>

            <div class="col-12">
              <div class="formfield text-left" style="margin: auto;">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="login-form-password"
                  v-model="password"
                  @keypress.enter="login"
                  required
                />
                <label for="login-form-password" class="label" style="cursor: text;">Kata Sandi</label>
                <span
                  v-if="showPassword"
                  @click="showPassword = false"
                  class="fa fa-fw fa-eye fa-eye-slash field-icon"
                />
                <span v-else @click="showPassword = true" class="fa fa-fw fa-eye field-icon" />
              </div>
            </div>
            <div v-if="wrongInput" class="col-12">
              <p class="message-error" style="margin-top: -10px">Email atau kata sandi salah</p>
            </div>
            <div v-if="emptyInput" class="col-12">
              <p
                class="message-error"
                style="margin-top: -10px"
              >Mohon masukkan email dan kata sandi Anda</p>
            </div>
            <div class="col-12">
              <div class="text-center">
                <button :disabled="loading" @click="login" class="btn btn-main">
                  LOGIN
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
          </div>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  middleware: "notAuth",
  head() {
    return {
      title: "Login",
    };
  },
  data() {
    return {
      email: null,
      password: null,
      showPassword: false,
      loading: false,
      wrongInput: false,
      emptyInput: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      let statusEmail, statusPassword;
      if (!this.email) {
        statusEmail = false;
      } else {
        statusEmail = true;
      }
      if (!this.password) {
        statusPassword = false;
      } else {
        statusPassword = true;
      }
      if (statusEmail && statusPassword) {
        this.emptyInput = false;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            this.loading = false;
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.$cookies.set("token", user.uid, {
                  path: "/",
                  maxAge: 60 * 60 * 24 * 7,
                });
                this.$router.push("/");
              } else {
              }
            });
          })
          .catch((error) => {
            this.wrongInput = true;
            this.loading = false;
          });
      } else {
        this.wrongInput = false;
        this.emptyInput = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.message-error {
  font-size: 14px;
  color: #ef4b2d;
}

.field-icon {
  /* float: right; */
  margin-left: -25px;
  /* margin-top: 20px;
  -moz-margin-top: 50px !important; */
  top: -35px;
  left: 100%;
  margin-right: 7px;
  position: relative;
  z-index: 2;
}

/* Curves */
#curveUpColor path,
#curveDownColor path {
  fill: #00d1c7;
  fill-opacity: 5%;

  /* stroke: #00d1c7; */
}

.bg-color {
  background-color: #cdfffd;
  border-radius: 0 0 10px 10px;
  height: 200px;
}
.border-login {
  padding: 30px 25px;
  border-radius: 40px;
  background: #ffffff;
  box-shadow: 23px 23px 46px #fafafa, -23px -23px 46px #f5f5f5;
}

.formfield {
  position: relative;
  box-sizing: border-box;
  /*float: left;*/
  padding: 0px 0px 0px 0px;
  border: 0px;
  font-size: 1em;
}
.formfield * {
  box-sizing: border-box;
}
.formfield-mb {
  margin-bottom: 30px;
}
#firstnamefield,
#lastnamefield {
  width: 52%;
  min-width: 250px;
}
#textfield100 {
  width: 100%;
}
#textfield75 {
  width: 50%;
}
#addressfield {
  width: 50%;
}
#zipcodefield {
  width: 25%;
}
#cityfield {
  width: 75%;
}
.formfield > input,
.formfield > .label {
  padding: 15px 15px 15px 15px;
  height: 50px;
  margin: 0em;
  width: 100%;
  font-weight: normal;
  cursor: text;
}
.formfield > input {
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  outline: none;
}
.formfield > input:focus {
  border: 1px solid #00d1c7;
  outline: none;
}
.formfield > .label {
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  color: #ccc;
}
input:focus + .label,
input:valid + .label {
  color: var(--main-color);
  font-size: 0.8em;
  width: auto;
  height: 1.3em;
  padding: 0px 0.5em 0px 0.5em;
  margin: -0.5em;
  background: white;
  transition: 0.2s ease-in-out;
  top: -0.5em;
  left: 2em;
}
input:focus + .label {
  color: var(--main-color);
  font-size: 0.8em;
  width: auto;
  height: 1.3em;
  padding: 0px 0.5em 0px 0.5em;
  margin: -0.5em;
  /*outline: 1px solid red; /*for debugigng purposes only*/
  background: white;
  transition: 0.2s ease-in-out;
  top: -0.5em;
  left: 2em;
}
</style>