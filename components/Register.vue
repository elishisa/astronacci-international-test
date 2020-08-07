<template>
  <section class="section-member">
    <div class="container">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class="login-box">
            <!-- TITLE: DATA MEMBER -->
            <div class="row">
              <div class="col-md-12">
                <h3 class="mb-5">Register Member</h3>
              </div>
            </div>
            <!-- -->

            <div class="row">
              <div class="col-md-12">
                <!-- FORM INPUT: ALAMAT SESUAI KTP -->
                <div class="formfield text-left mb-4" style="margin: auto;">
                  <input
                    type="text"
                    id="username"
                    class="wizard-required"
                    required
                    @input="changeNewSub($event)"
                    :value="username"
                  />
                  <label for="username" class="label">Nama</label>
                  <span
                    class="text-left color-grey"
                    id="alert-username-format-grey"
                  >*username minimal 5 karakter terdiri dari huruf dan angka.</span>
                  <div
                    class="alert-empty-special"
                    id="alert-username-format-red"
                  >*username minimal 5 karakter terdiri dari huruf dan angka.</div>
                  <div
                    class="alert-empty-green"
                    id="alert-username-format-green"
                  >*Format sudah sesuai.</div>
                  <div
                    class="alert-empty-special"
                    id="alert-hp-format-red3"
                  >*username tidak boleh kosong</div>
                </div>
                <!-- -->
              </div>

              <div class="col-sm-12">
                <div class="formfield text-left mb-4" style="margin: auto;">
                  <input
                    id="noHp"
                    @input="changeNewSub($event)"
                    :value="noHp"
                    @keypress.enter="checkForm"
                    required
                  />
                  <label for="noHp" class="label" style="cursor: text;">Nomor Handphone</label>
                  <span
                    class="text-left color-grey"
                    id="alert-hp-format-grey"
                  >*No Handphone minimal 10 karakter terdiri dari huruf dan angka.</span>
                  <div
                    class="alert-empty-special"
                    id="alert-hp-format-red"
                  >*No Handphone minimal 10 karakter terdiri dari huruf dan angka.</div>
                  <div class="alert-empty-green" id="alert-hp-format-green">*Format sudah sesuai.</div>
                  <div
                    class="alert-empty-special"
                    id="alert-hp-format-red3"
                  >*No Handphone tidak boleh kosong</div>
                </div>
              </div>

              <div class="col-sm-12">
                <div class="formfield text-left mb-4" style="margin: auto;">
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

              <div class="col-sm-12">
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
                  <span
                    v-else
                    @click="showPassword = true"
                    class="fa fa-fw fa-eye-slash field-icon"
                  />
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

              <!-- FORM FILE: FOTO KTP -->
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-12">
                    <!-- <p
                      @click="hapusKtp"
                      class="color-error float-right"
                      style="cursor:pointer"
                    >Hapus</p>-->
                  </div>
                  <div class="col-md-12">
                    <div class="text-left">
                      <!-- <label class="style-upload mb-0">
                        Cari Foto
                        <input type="file" id="upload-foto" @change="chooseFotoKtp" />
                      </label>-->
                      <label class="style-upload mb-0">
                        Attachment
                        <input type="file" id="upload-foto" @change="changeNewSub" />
                      </label>
                      <p>Notes: Attachmen bisa berupa File atau Foto</p>
                      <p>Selected file: {{ namaFile }}</p>

                      <!-- <span style="float: right" class="color-error">
                      <a @click="removeImageToko" style="cursor:pointer">Hapus</a>
                      </span>-->
                    </div>
                    <div class="preview">
                      <img v-if="fotoKtp" :src="fotoKtpUrl" />
                      <div v-else>
                        <!-- <label class="style-upload mb-0">
                          Cari Foto
                          <input type="file" @change="chooseFotoKtp" />
                        </label>-->

                        <!-- <img
                          :src="`${$store.getters.assetsPath}images/icon/ic_upload.png`"
                          alt="icon upload"
                          class="img-upload"
                          style="width: 100%; height: 210px; object-fit: contain;"
                        />-->
                      </div>
                    </div>
                    <div
                      class="alert-empty"
                      id="alert-empty-foto"
                    >Format foto harus berupa .jpg .jpeg .png atau .svg</div>
                    <div
                      class="alert-empty"
                      id="alert-empty-foto"
                    >Format file harus berupa .docs .pdf .xls</div>
                    <div class="alert-empty" id="alert-empty-kapasitas">Ukuran foto maksimum 5MB</div>
                  </div>
                </div>
              </div>
              <!-- -->
            </div>
            <div class="row mt-4 mb-4">
              <div class="col-md-12">
                <hr />
              </div>
            </div>

            <div class="row" style="margin-left: 30px;">
              <recaptcha @error="onError" @success="onSuccess" @expired="onExpired" />
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <!-- FORM SUBMIT BUTTON -->
                <button
                  class="btn btn-main"
                  style="padding: 10px; width: 50%; margin: auto;"
                  :disabled="disableButton || loading"
                  @click="checkForm"
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
                <!-- -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import JQuery from "jquery";
import SHA2 from "sha2";
let $ = JQuery;

export default {
  middleware: "auth",

  head() {
    return {
      title: "Register",
    };
  },

  data() {
    return {
      noHp: null,
      noHpRegex: /[0-9]+$/,
      noHpMessage: null,
      noHpCount: 0,
      username: null,
      usernameRegex: /^[A-Za-z0-9]+[A-Za-z0-9,. ]*$/,
      usernameMessage: null,
      fotoKtp: null,
      fotoKtpMessage: null,
      fotoNpwp: null,
      fotoNpwpMessage: null,
      error: false,
      loading: false,
      email: null,
      password: null,
      responseData: null,
      showPassword: false,
      counter: 0,
      namaFile: "",
      usernamePattern: /^[a-z]+$/,
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      passPattern: /^[A-Za-z0-9]+[A-Za-z0-9]{1,50}$/,
      stringData: "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm",
      numberData: "1234567890",
      errorPassword: null,
      errorMessage: null,
      loading: false,
      loadingx: false,
      noHpCheck: false,
      emailCheck: false,
      passwordCheck: false,
      usernameCheck: false,
      fotoKtpCheck: false,
    };
  },

  watch: {
    /** CHECK IF THERE IS AN ERROR */
    error(newValue, oldValue) {
      if (newValue) {
        // alert("Terjadi kesalahan, mohon muat ulang browser anda");
      }
    },

    /** SET ERROR MESSAGE TO NULL WHEN USER CHANGE THEIR INPUT */
    noHp(newValue, oldValue) {
      this.noHpMessage = null;
    },
    tempatLahir(newValue, oldValue) {
      this.tempatLahirMessage = null;
    },
    username(newValue, oldValue) {
      this.usernameMessage = null;
    },
    agama(newValue, oldValue) {
      this.agamaMessage = null;
    },
    fotoKtp(newValue, oldValue) {
      this.fotoKtpMessage = null;
    },
    statusPajak(newValue, oldValue) {
      this.statusPajakMessage = null;
      this.npwpMessage = null;
      this.fotoNpwpMessage = null;
    },
    npwp(newValue, oldValue) {
      this.npwpMessage = null;
    },
    fotoNpwp(newValue, oldValue) {
      this.fotoNpwpMessage = null;
    },
  },

  computed: {
    /** DISABLE BUTTON JIKA ADA ERROR */
    disableButton() {
      if (this.error) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    onError(error) {
      console.log("Error happened:", error);
    },
    async checkForm() {
      try {
        const token = await this.$recaptcha.getResponse();
        console.log("ReCaptcha token:", token);
        await this.$recaptcha.reset();
      } catch (error) {
        console.log("Login error:", error);
      }
    },
    onSuccess(token) {
      console.log("Succeeded:", token);
    },
    onExpired() {
      console.log("Expired");
    },
    changeNewSub(event) {
      this.errorPassword = null;
      $("alert-pass-format-red3").hide();
      $("alert-hp-format-red3").hide();
      $("alert-username-format-red3").hide();
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
      } else if (event.target.id === "noHp") {
        let inputHp = event.target.value.split("");
        let anyNum = false;
        number.forEach((num) => {
          inputHp.forEach((input) => {
            if (num === input) {
              anyNum = true;
            }
          });
        });
        let testPattern = this.noHpRegex.test(event.target.value);
        if (testPattern && anyNum && inputHp.length >= 10) {
          this.noHp = event.target.value;
          status = 1;
          $("#alert-hp-format-red").hide();
          $("#alert-hp-format-grey").hide();
          $("#alert-hp-format-green").show();
        } else {
          this.noHp = event.target.value;
          status = 0;
          $("#alert-hp-format-red").show();
          $("#alert-hp-format-green").hide();
          $("#alert-hp-format-grey").hide();
          $("alert-hp-format-red3").show();
        }
      } else if (event.target.id === "username") {
        let inputUsername = event.target.value.split("");
        let anyLetter = false;
        char.forEach((letter) => {
          inputUsername.forEach((input) => {
            if (letter === input) {
              anyLetter = true;
            }
          });
        });
        let testPattern = this.usernamePattern.test(event.target.value);
        if (testPattern && anyLetter && inputUsername.length >= 5) {
          console.log(testPattern, inputUsername.length);
          this.username = event.target.value;
          status = 1;
          $("#alert-username-format-red").hide();
          $("#alert-username-format-grey").hide();
          $("#alert-username-format-green").show();
        } else {
          console.log(testPattern, inputUsername.length);
          this.username = event.target.value;
          status = 0;
          $("#alert-username-format-red").show();
          $("#alert-username-format-green").hide();
          $("#alert-username-format-grey").hide();
          $("alert-username-format-red3").show();
        }
      } else if (event.target.id === "upload-foto") {
        this.fotoKtp = event.target.files[0];
        this.namaFile = event.target.files[0].name;
        this.fotoKtpUrl = URL.createObjectURL(this.fotoKtp);
        if (this.fotoKtp) {
          if (this.fotoKtp.name) {
            console.log(this.fotoKtp.name, this.fotoKtp);
            const namaFile = this.fotoKtp.name.split(".");
            const ekstensiFile = [
              "jpg",
              "jpeg",
              "png",
              "svg",
              "docx",
              "pdf",
              "xls",
            ];
            console.log(namaFile, ekstensiFile);
            if (!ekstensiFile.includes(namaFile[namaFile.length - 1])) {
              $("#alert-empty-foto").show();
              $("#alert-empty-kapasitas").hide();
            } else if (this.fotoKtp.size > 5242880) {
              $("#alert-empty-kapasitas").show();
              $("#alert-empty-foto").hide();
            } else {
              this.fotoKtpCheck = true;
            }
          } else {
          }
        } else {
          this.fotoKtpMessage = "Foto atau File harus diisi";
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

    /** CHECK FORM BEFORE SUBMIT */
    checkForm() {
      /** CHECK NOMOR HANDPHONE */
      if (!this.noHp) {
        this.noHpMessage = "Nomor HP harus diisi";
      } else {
        this.noHpCheck = true;
      }

      /** CHECK USERNAME */
      if (!this.username) {
        this.usernameMessage = "Usernmae harus diisi";
      } else {
        this.usernameCheck = true;
      }

      /** CHECK FOTO KTP */
      if (!this.fotoKtp) {
        this.usernameMessage = "Usernmae harus diisi";
      } else {
        this.fotoKtpCheck = true;
      }

      if (!this.email) {
        this.emailMessage = "Nomor HP harus diisi";
      } else {
        this.emailCheck = true;
      }

      if (!this.password) {
        this.emailMessage = "Nomor HP harus diisi";
      } else {
        this.passwordCheck = true;
      }

      /** CHECK IF THERE IS ANY ERROR */
      if (
        this.noHpCheck &&
        this.emailCheck &&
        this.usernameCheck &&
        this.passwordCheck &&
        this.fotoKtpCheck
      ) {
        this.postRegist();
        alert("bisa");
      } else {
        alert("gagal melakukan registrasi");
        this.loading = false;
      }
    },

    /** UPLOAD FOTO SEBELUM POST USER INFO */
    uploadFoto() {},

    /** POST USER INFO */
    async postRegist() {
      if (this.password) {
        const dataEncode = SHA2.SHA256(this.password)
          .toString("hex")
          .toUpperCase();
        let data = {
          user_id: "",
          username: this.username,
          email: this.email,
          password: dataEncode,
          foto: this.fotoKtp,
        };

        alert(data.password);
      } else {
        this.errorMessagePass =
          "Terjadi kesalahan, silakan cek password yang Anda masukkan";
        this.isLoadingPass = false;
      }
    },
  },
};
</script>

<style scoped>
.cari-foto-content {
  position: absolute;
  left: 40%;
  top: 35%;
  opacity: 0;
}

.alert-empty-1 {
  color: rgb(218, 52, 52);
  font-size: 12px;
}
.img-upload {
  width: 100%;
}
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview img {
  max-width: 100%;
  max-height: 500px;
}
.style-upload {
  padding: 10px;
  background: #00d1c7;
  display: table;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
input[type="file"] {
  display: none;
}
.alert-empty {
  color: rgb(218, 52, 52);
  font-size: 12px;
  display: none;
}
.alert-empty-special {
  color: rgb(218, 52, 52);
  font-size: 12px;
  margin-top: 0px;
  display: none;
}
.alert-empty-green {
  color: rgb(79, 235, 131);
  font-size: 12px;
  margin-top: -20px;
  display: none;
}
</style>
