<template>
<div>
    <div class="col-12 text-right" style="height: 30px; background-color: #00D1C7">
    </div>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main role="main" class="inner cover">
      <h3 class="cover-heading">Test Astronacci International.</h3>
      <p
        class="lead"
      >Hallo, Nama Saya Elisa Eka Shinta Pratiwi. Saat in saya melamar posisi sebagai frontend Developer. Web ini dibuat dengan frameworks <b>nuxt.js</b> dan <b>Firbase</b> sebagai database</p>
      <div class="row" style="margin-top:30px;">
        <div class="col-sm-6">
          <ul>
            <li>1. Membership (membuat akses untuk 3 tipe membership beserta page untuk login)</li>
            <li>-Tipe A hanya bisa mengakses 3 artikel dan 3 video</li>
            <li>-Tipe B bisa mengakses 10 artikel dan 10 video</li>
            <li>-Tipe C bisa mengakses keseluruhan artikel dan video</li>
          </ul>
          <p class="lead">
            <a href="/homepage" class="btn btn-lg btn-main">Login</a>
          </p>
        </div>

        <div class="col-sm-6">
          <ul>
              <li>3. Form validasi Register semua harus input Required: </li>
               <li>- Nama {a-z, tanpa number, character minimal 5)</li>
               <li>- Email {validation berbentuk email}</li>
               <li>- Password {character minimal 8, harus include number & simbol, case sensitive, enkripsi pada database}</li>
               <li>- Phone {harus number, character minimal 10}</li>
               <li>- Attachment {Max size attachment 5Mb}</li>
               <li>- Google Captcha </li>
          </ul>
          <p class="lead">
            <a href="/register" class="btn btn-lg btn-main">Register</a>
          </p>
        </div>
      </div>
    </main>
  </div>
</div>
</template>
<script>
export default {
       middleware: "notAuth",
};
</script>