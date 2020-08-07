<template>
  <div class="container">
    <div class="col-12 text-right" style="height: 30px; background-color: #00D1C7">
      <div class="logout-container">
        <div @click="logout" style="cursor: pointer; font-size:15">
          Logout
          <i class="fas fa-sign-out-alt logout-icon"></i>
        </div>
      </div>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <h4>You're login as {{userlogin}}</h4>
        <h5>Tipe {{userTipe}}</h5>
      </div>
      <div class="container">
        <div class="row col-mt-20">
          <div class="col-md-4" v-for="(item, index) in b" :key="index">
            <div class="card mb-4 shadow-sm">
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
                aria-label="Placeholder: Thumbnail"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#eceeff" />
                <text x="50%" y="50%" fill="#00D1C7" dy=".3em">{{item.video}}</text>
              </svg>
              <div class="card-body">
                <p class="card-text">{{item.result}}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small class="text-muted">Tipe: {{item.type}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "~/plugins/firebase.js";
import firebase from "firebase";
export default {
  middleware: "auth",
  data() {
    return {
      userlogin: "",
      userTipe: "",
      dataUndian: [],
      tipeUndian: [],
      tipe_undian: [],
      dataUser: [],
      idUser: "",
      b: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      firebase.auth().onAuthStateChanged((user) => {
        this.userlogin = user.email;
      });

      db.collection("login").onSnapshot((querySnapshot) => {
        if (querySnapshot.empty) {
        } else {
          let users = [];
          querySnapshot.forEach((docs, index) => {
            let user = {
              email: docs.data().email,
              tipe: docs.data().tipe,
            };
            this.dataUser.push(user);
          });
        }

        this.dataUser.forEach((item, index) => {
          if (item.email === this.userlogin) {
            return (this.userTipe = item.tipe);
          }
        });
      });

      db.collection("artikel")
        .orderBy("id", "asc")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.empty) {
          } else {
            let data = [];
            let name = [];
            let pemenang = [];

            querySnapshot.forEach((doc) => {
              let name = {
                fileId: doc.data().id,
                result: doc.data().article_name,
                type: doc.data().article_type,
                video: doc.data().video,
              };
              this.dataUndian.push(name);
            });

            let a = this.dataUndian;
            a.forEach((item, index) => {
              const tipe_undian = {
                tipe: item.type,
              };
              this.tipeUndian.push(tipe_undian);
            });

            this.tipeUndian.forEach((item, index) => {
              var str = item.tipe;
              var arr = str.split(",");
              this.tipe_undian.push(arr);
            });

            if (this.userTipe === "C") {
              this.dataUndian.forEach((item, index) => {
                this.b.push(item);
              });
            } else {
              this.tipe_undian.forEach((item, index) => {
                for (let i = 0; i <= length; i++) {
                  for (let j = 0; j <= i; j++)
                    if (this.userTipe === item[j]) {
                      this.b.push(this.dataUndian[index]);
                    } else {
                    }
                }
              });
            }
          }
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$cookies.remove("token");
          this.$router.push("homepage");
        })
        .catch((error) => {
          alert("terjadi kesalahan mohon muat ulang browser anda");
        });
    },
  },
};
</script>

