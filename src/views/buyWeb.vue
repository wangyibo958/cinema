<template>
  <div class="container">
    <h1>电影座位选择</h1>
    <div class="w3ls-reg">
      <!-- 输入表单 -->
      <div class="inputForm">
        <h2>在下面填写所需的详细信息并选择您的座位</h2>
        <div class="mr_agilemain">
          <div class="agileits-left">
            <label>姓名<span>*</span></label>
            <input type="text" v-model="username" :disabled="inputDisabled" required>
          </div>
          <div class="agileits-right">
            <label>座位数 <span>*</span></label>
            <input type="number" v-model.number="seatCount" :disabled="inputDisabled" required min="1">
          </div>
        </div>
        <button @click="startSelecting">开始选座</button>
      </div>

      <!-- 座位状态说明 -->
      <ul class="seat_w3ls">
        <li class="smallBox greenBox">所选座位</li>
        <li class="smallBox redBox">售出座位</li>
        <li class="smallBox emptyBox">空座位</li>
      </ul>

      <!-- 座位布局 -->
      <div class="seatStructure txt-center" style="overflow-x:auto;">
        <p id="notification">{{ notification }}</p>
        <table>
          <tr>
            <td v-for="(header, index) in seatHeaders" :key="index">{{ header }}</td>
          </tr>
          <tr v-for="(row, rowIndex) in seats" :key="rowIndex">
            <td>{{ row.label }}</td>
            <td v-for="(seat, seatIndex) in row.seats" :key="seatIndex">
              <input type="checkbox" class="seats" v-model="seat.checked" :value="seat.id"
                :disabled="!seat.available || (selectedCount >= seatCount && !seat.checked)">
            </td>
          </tr>
        </table>

        <div class="screen">
          <h2 class="wthree">俯视图</h2>
        </div>
        <button @click="confirmSelection">确认选座</button>
      </div>

      <!-- 结果显示 -->
      <div class="displayerBoxes txt-center" style="overflow-x:auto;">
        <table class="Displaytable w3ls-table" width="100%">
          <tr>
            <th>姓名</th>
            <th>座位数</th>
            <th>座位</th>
          </tr>
          <tr>
            <td><textarea :value="displayName"></textarea></td>
            <td><textarea :value="displayCount"></textarea></td>
            <td><textarea :value="displaySeats"></textarea></td>
          </tr>
        </table>

      </div>
      <button @click="sendOrder" class="sendorder">提交订单</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      seatCount: 1,
      notification: '',
      inputDisabled: false,
      seats: this.generateSeatMap(),
      seatHeaders: ['', 1, 2, 3, 4, 5, '', 6, 7, 8, 9, 10, 11, 12],
      displayName: '',
      displayCount: '',
      displaySeats: ''
    }
  },
  computed: {
    selectedCount() {
      return this.seats.flatMap(row => row.seats)
        .filter(seat => seat.checked).length
    }
  },
  methods: {
    sendOrder() {
      this.$router.push('/cinemaWeb'),
        this.$message.success('购票成功！')
    },
    generateSeatMap() {
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
      return rows.map(row => ({
        label: row,
        seats: Array.from({ length: 12 }, (_, i) => ({
          id: `${row}${i + 1}`,
          available: Math.random() > 0.2, // 80%座位可用
          checked: false
        }))
      }))
    },
    startSelecting() {
      if (!this.username || !this.seatCount) {
        alert('请输入姓名和座位数')
        return
      }
      this.inputDisabled = true
      this.notification = '请选择您的座位！'
    },
    confirmSelection() {
      if (this.selectedCount !== this.seatCount) {
        alert(`请选择${this.seatCount} 个座位`)
        return
      }

      this.displayName = this.username
      this.displayCount = this.seatCount
      this.displaySeats = this.seats
        .flatMap(row => row.seats)
        .filter(seat => seat.checked)
        .map(seat => seat.id)
        .join(', ')
    }
  },
  mounted() {
    // 初始化禁用状态
    this.inputDisabled = false
  }
}
</script>

<style scoped>
/*
Author: W3layout
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
*/

/*--reset--*/

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

.sendorder {
  margin-top: 5%;
  margin-left: 40%;
}

ol,
ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  display: table;
  border-collapse: separate;
  border-spacing: 2px;
  border-color: grey;
}

td {
  width: 40px;
  font-weight: 600;
  font-size: 1em;
  padding-top: 7px;
  height: 24px;
  color: #fff;
}

/*--start editing from here--*/

a {
  text-decoration: none;
}

.txt-rt {
  text-align: right;
}

/* text align right */

.txt-lt {
  text-align: left;
}

/* text align left */

.txt-center {
  text-align: center;
}

/* text align center */

.float-rt {
  float: right;
}

/* float right */

.float-lt {
  float: left;
}

/* float left */

.clearfix {
  clear: both;
}

/* clear float */

.pos-relative {
  position: relative;
}

/* Position Relative */

.pos-absolute {
  position: absolute;
}

/* Position Absolute */

.vertical-base {
  vertical-align: baseline;
}

/* vertical align baseline */

.vertical-top {
  vertical-align: top;
}

/* vertical align top */

nav.vertical ul li {
  display: block;
}

/* vertical menu */

nav.horizontal ul li {
  display: inline-block;
}

/* horizontal menu */

img {
  max-width: 100%;
}

/*--end reset--*/

button.w3l-cart {
  transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
  -ms-transition: 0.5s all;
  text-decoration: none;
  outline: none;
}

.container a:hover {
  text-decoration: none;
}

.clearfix {
  clear: both;
}

/* content */

.container {
  background: url(../assets/banner.jpg) no-repeat center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -ms-background-size: cover;
  background-attachment: fixed;
  font-family: 'Source Sans Pro', sans-serif;
}

.mr_agilemain span {
  color: #f00;
}

.w3ls-reg {
  width: 700px;
  margin: 0 5vw;
  background: rgba(128, 128, 128, 0.34);
  padding: 3.5vw;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}

.container {
  display: -webkit-flex;
  display: -webkit-box;
  display: -moz-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}

h1 {
  font-size: 2.9em;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  text-shadow: 4px 3px 1px rgba(0, 0, 0, 0.22);
  letter-spacing: 2px;
  text-align: center;
  margin: 0.8em 1vw .9em;
  font-family: 'Source Sans Pro', sans-serif;
}

h2 {
  color: #ff9800;
  text-transform: capitalize;
  margin-bottom: 25px;
  font-size: 1em;
  letter-spacing: 0.5px;
  line-height: 1.7;
}

.mr_agilemain {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.agileits-left {
  flex-basis: 60%;
  margin-bottom: 1.5em;
}

li.smallBox {
  text-align: left;
  display: inline-block;
  margin-right: 1em;
  color: #fff;
}

.agileits-right {
  flex-basis: 40%;
  margin-bottom: 1.5em;
}

.tw {
  width: 50%;
}

label {
  font-size: 1em;
  color: #fff;
  font-weight: 600;
}

input[type="text"],
input[type="number"] {
  padding: 1em;
  width: 80%;
  background: transparent;
  border: 1px solid #888686;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1em;
  margin-top: 10px;
  color: #fff;
}

button {
  background: #f5f5f5;
  border: none;
  color: #000;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 1em;
  letter-spacing: 1px;
  font-family: 'Source Sans Pro', sans-serif;
  cursor: pointer;
}

ul.seat_w3ls {
  margin: 2em 0;
}

.screen {
  width: 100%;
  background: #ff9800;
  margin: 2em 0;
}

h2.wthree {
  padding: 0.8em;
  font-size: 1.2em;
  color: #000;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 7px;
  word-spacing: 10px;
}

.smallBox::before {
  content: "";
  width: 15px;
  height: 15px;
  display: inline-block;
  margin-right: 10px;
}

.greenBox::before {
  content: "";
  background: Green;
}

.redBox::before {
  content: "";
  background: Red;
}

.emptyBox::before {
  content: "";
  box-shadow: inset 0px 2px 3px 0px rgb(255, 152, 0), 0px 1px 0px 0px rgba(255, 255, 255, .8);
  -moz-box-shadow: inset 0px 2px 3px 0px rgb(255, 152, 0), 0px 1px 0px 0px rgba(255, 255, 255, .8);
  -webkit-box-shadow: inset 0px 2px 3px 0px rgb(255, 152, 0), 0px 1px 0px 0px rgba(255, 255, 255, .8);
  background-color: #fff;
}

.seats {
  border: 1px solid red;
  background: yellow;
}

.seatGap {
  width: 40px;
}

.seatVGap {
  height: 40px;
}

table {
  text-align: center;
}

.Displaytable {
  text-align: center;
}

.Displaytable td,
.Displaytable th {
  width: 100%;
  padding: 7px 10px;
  color: #000;
  font-weight: 600;
}

table.Displaytable tr {
  background: #fff;
  color: #fff;
}

textarea {
  border: none;
  background: transparent;
  resize: none;
}

input[type=checkbox] {
  width: 13px;
  margin-right: 14px;
  cursor: pointer;
}

input[type=checkbox]:before {
  content: "";
  width: 25px;
  height: 18px;
  border-radius: 5px;
  /* Safari 3-4, iOS 1-3.2, Android 1.6- */
  -webkit-border-radius: 5px;
  /* Firefox 1-3.6 */
  -moz-border-radius: 5px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  border: 3px solid #ff9800;
  box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, .3), 0px 1px 0px 0px rgba(255, 255, 255, .8);
  -moz-box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, .3), 0px 1px 0px 0px rgba(255, 255, 255, .8);
  -webkit-box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, .3), 0px 1px 0px 0px rgba(255, 255, 255, .8);
  background-color: #ffffff;
}

input[type=checkbox]:checked:before {
  background-color: Green;
  font-size: 15px;
}

.copy-wthree p {
  color: #fff;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 600;
  line-height: 1.7;
  padding: 0 1em;
}

.copy-wthree p a {
  color: #fff;
}

.copy-wthree {
  margin: 3em 0em;
  text-align: center;
}

.displayerBoxes {
  margin-top: 2em;
}

/*--responsive--*/

@media(max-width:1920px) {
  h1 {
    font-size: 3.5vw;
  }
}

@media(max-width:1024px) {
  h1 {
    font-size: 4.5vw;
  }
}

@media(max-width:800px) {
  h1 {
    font-size: 5vw;
  }
}

@media(max-width:667px) {
  h2.wthree {
    padding: 0.7em;
    font-size: 1em;
  }
}

@media(max-width:600px) {
  .w3ls-reg {
    width: 500px;
  }
}

@media(max-width:568px) {
  .mr_agilemain {
    display: block;
  }

  input[type="text"],
  input[type="number"] {
    padding: 10px 15px;
    width: 100%;
  }
}

@media(max-width:480px) {
  .w3ls-reg {
    width: 450px;
  }

  h1 {
    font-size: 2.5em;
  }

  .w3ls-login form {
    padding: 7.5vw;
  }
}

@media(max-width:440px) {
  h1 {
    font-size: 2.3em;
  }
}

@media(max-width:414px) {
  h1 {
    font-size: 2em;
  }

  .w3ls-reg {
    width: 370px;
  }

  input[type="text"],
  input[type="number"] {
    width: 92%;
  }

  li.smallBox {
    margin: 1em 0 0;
    display: block;
  }
}

@media(max-width:384px) {
  h1 {
    font-size: 1.9em;
  }

  .w3ls-reg {
    width: 350px;
  }

  h2.wthree {
    padding: 0.5em;
  }
}

@media(max-width:320px) {
  h1 {
    font-size: 1.5em;
  }

  .w3ls-reg {
    width: 280px;

  }

  input[type="text"],
  input[type="number"] {
    width: 88%;
  }

  h2.wthree {
    font-size: 0.95em;
    letter-spacing: 5px;
  }

  .copy-wthree p {
    padding: 0 0.5em;
  }
}

/*--//responsive--*/
</style>