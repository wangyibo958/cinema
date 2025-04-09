<template>
    <div class="login-web">
        <div class="login-logo">
            <div class="logo-img"><img src="../assets/W_电影.png" alt=""></div>
            <div class="logo-tit">电影</div>
        </div>

        <div class="login-box">
            <div class="immg">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="login-contral">
                <!-- <div class="login"> 
                    <el-button 
                        v-for="(item, index) in loginItems"
                        :key="index"
                        class="login-item"
                        :data-link="item.path"
                        @click="handleLoginClick(item.path)"
                    >{{ item.title }}</el-button>
                </div> -->
                <div class="register">
                    <el-button @click="goToLogin">登录</el-button>
                    <el-button @click="goToRegister">注册</el-button>
                </div>
            </div>
        </div>
        <!-- 新增 router-view 用于渲染子路由内容 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {
        goToLogin() {
            this.$router.push('/loginLogin');
        },
        goToRegister() {
            this.$router.push('/loginRegister');
        }
    }
}
</script>

<style>
.login-web {
    width: 100%;
    background-color: rgb(232, 245, 255);
    height: calc(100vh - 90px);
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 20%;
    /* background-color: aquamarine; */
}

.logo-tit {
    font-size: 6vh;
    font-weight: bolder;
    margin-top: 23%;
    text-shadow: 2px 4px rgba(255, 89, 0, 0.552);
    color: rgb(255, 255, 255);
}

.login-logo img {
    /* margin-left: -20%; */
    width: 80%;
}

.login-box {
    width: 50%;
    height: 400px;
    margin-top: 2%;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 4px 4px rgba(128, 128, 128, 0.595);
    border-radius: 4px;
    align-items: center;
}

.immg {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 9%;
}

.immg .el-avatar {
    width: 200px;
    height: 200px;
}

.register {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-top: 4%;
}

.login-contral .el-button {
    height: 50px;
    width: 150px;
    font-size: 2vh;
    color: white;
    background-color: #007bffa8;
}

.login-contral .el-button:hover {
    color: #53cefff4;
    background-color: white;
}
</style>