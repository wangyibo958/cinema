<template>
  <div>
    <div class="head">
      <div class="logo">
        <img src="../assets/W_电影.png" alt="">电影
      </div>

      <div class="opt">
        <div v-for="(item, index) in navItems" :key="index" class="nav-item" :data-link="item.path"
          @click="handleNavClick">
          {{ item.title }}
        </div>
      </div>
      <div class="search-box">
        <input type="search" placeholder="搜索电影，演员..." />
        <button type="submit" class="search-btn"><i class="el-icon-search"></i></button>
      </div>
      <!-- 头像容器 -->
      <div class="hand" @mouseenter="flag=1" @mouseleave="flag=0" @click="goTologinPage">
        <img src="../assets/白底头像.jpg" alt="用户头像">
        <!-- 下拉菜单（独立定位） -->
      </div>
      <div v-show="flag == 1" class="dropdown-menu" @mouseenter="flag=1" @mouseleave="flag=0">
        <div class="menu-item" @click="handleMenuClick">基本信息</div>
        <div class="menu-item" @click="handleMenuClick">历史订单</div>
        <div class="menu-item" @click="returnClick">退出登录</div>
      </div>
    </div>

    <footer>
      <a href="https://codepen.io/juliepark"></a>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
      menuTimer: null,
      flag: 0,
      navItems: [
        { title: '首页', path: '/' },
        { title: '影片', path: '/moviesWeb' },
        { title: '影院', path: '/cinemaWeb' },
        { title: '推荐', path: '/recommendWeb' }
      ]
    }
  },
  methods: {
    handleNavClick(event) {
      const path = event.currentTarget.dataset.link
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    },
    fun1() {
      this.flag = 1
      console.log(this.flag);

    },
    fun2() {
      this.flag = 0
      console.log(this.flag);

    },
    handleAvatarClick() {
      this.showMenu = !this.showMenu
    },

    handleMenuClick() {
      // 示例：退出登录处理
      if (this.$route.path !== '/loginWeb') {
        this.$router.push('/loginWeb')
      }
      this.showMenu = false
    },
    goTologinPage(){
      this.$router.push('/loginPage');
    },
    returnClick(){
      this.$message.success('用户已成功退出')
    }
  }

}
</script>

<style scoped>
/* 样式部分保持不变 */
.head {
  top: 0;
  width: 100%;
  height: 100px;
  background-color: rgb(36, 49, 80);
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  /* float: left; */
  justify-content: space-between;
  position: fixed;
  left: 0;
  bottom: 0;
}

.logo {
  width: 7%;
  margin-left: 50px;
  font-size: 4vh;
  font-weight: bolder;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row !important;
  align-items: center !important;
  white-space: nowrap;
}

.logo img {
  width: 80px;
  margin-right: 10px;
}

.opt {

  /* 横向排列 */
  display: flex;
  gap: 1rem;
  /* 选项间距 */
  margin-left: 5%;
  /* 根据实际情况调整 */
  flex-direction: row;
  width: 35%;
  font-size: 2vh;
  white-space: nowrap;
}

/* 通用导航项样式 */
.opt>div {
  padding: 1.5rem 1.5rem;
  color: #ffffff;
  /* 初始文字颜色 */
  cursor: pointer;
  transition: all 0.3s ease;
  /* 平滑过渡 */
  border-radius: 4px;
  /* 可选圆角 */
}

/* 鼠标悬停变色 */
.opt>div:hover {
  background-color: rgba(255, 255, 255, 0.2);
  /* 半透明白色背景 */
  color: #45aeff;
  /* 文字高亮色 */
  transform: translateY(-2px);
  /* 轻微上移 */
}

/* headWeb.vue 添加激活状态指示 */
.opt>div.router-link-active {
  border-bottom: 2px solid #45aeff;
  color: #45aeff !important;
}


.hand {
  position: relative;
  cursor: pointer;
  margin-right: 5%;
}

.dropdown-menu {
  position: absolute;
  top: 80px;
  /* 增加间距 */
  right: 0;
  min-width: 160px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: opacity 0.2s, transform 0.2s;

/* 三角伪元素 */
  &::before {
    content: '';
    position: absolute;
    left: 20px; /* 调整三角水平位置 */
    top: -10px; /* 移动到菜单上方 */
    border: 5px solid transparent;
    border-bottom-color: #fff; /* 匹配菜单背景色 */
    filter: drop-shadow(0 -2px 1px rgba(0,0,0,0.1)); /* 添加阴影 */
  }
  &::after {
    content: '';
    position: absolute;
    left: 21px; /* 微调边框位置 */
    top: -11px;
    border: 6px solid transparent;
    border-bottom-color: #ccc; /* 匹配菜单边框色 */
    z-index: -1;
  }
}


/* 菜单动画效果 */
.dropdown-menu[show] {
  opacity: 1;
  transform: translateY(0);
}

.menu-item {
  padding: 12px 20px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-item:hover {
  background: #f8f9fa;
  padding-left: 24px;
  border-radius: 8px;
}

/* 头像交互优化 */
.hand img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: transform 0.3s, box-shadow 0.3s;
}

.hand:hover img {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}


.search-box {
  display: flex;
  align-items: center;
  margin-left: 20%;
  margin-right: 3%;
}

input[type="search"] {
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.4);
  background: #ffffff;
  border: 2px solid #e7693b;
  outline: none;
  width: 250px;
  height: 50px;
  border-radius: 15px 0 0 15px;
  font-size: 1.4rem;
  font-weight: 300;
  padding: 0 10px;
  font-family: 'Lato', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #e7693b;
}

input[type="search"]::placeholder {
  color: #649fb5;
  font-size: 0.8em;
  opacity: 0.8;
}

.search-btn {
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.4);
  height: 50px;
  width: 55px;
  outline: none;
  border-radius: 0 15px 15px 0;
  background: #e7693b;
  color: #ffffff;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-btn:hover {
  transform: translateY(-2px);
}

.search-btn svg {
  width: 28px;
  height: 28px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.search-btn:hover svg {
  transform: rotate(10deg) scale(1.1);
}

footer {
  position: absolute;
  bottom: 0;
  right: 0;
  text-transform: uppercase;
  padding: 10px;
  font-family: 'Lato', sans-serif;
  color: #e73b3b;
}

footer p {
  letter-spacing: 3px;
  font-size: 10px;
  color: #ffffff;
  margin: 0;
}

footer a {
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 3px;
}

footer a:hover {
  background: #e7693b;
  color: #ffffff;
}
</style>