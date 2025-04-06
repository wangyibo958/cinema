<template>
    <div class="loginRegister">
        <div class="Register-box">


            <div class="register-input">
                <div class="register-name">设置用户名：<el-input placeholder="请输用户名" v-model="input" clearable></el-input></div>
                <div class="register-name">输入旧密码：<el-input placeholder="请输入旧密码" v-model="password" show-password></el-input></div>
                <div class="register-name">输入新密码：<el-input placeholder="请输入新密码" v-model="newPassword" show-password></el-input></div>
                <div class="register-name">确认新密码：<el-input placeholder="请再次输入新密码" v-model="confirmPassword" show-password></el-input></div>
                <div class="register-name">电话：<el-input placeholder="请输入电话号码" v-model="phonenum" clearable></el-input></div>
                <div class="register-over"><el-button type="primary" @click="handleLogin" plain>完&nbsp;成</el-button></div>
            </div>
        </div>
        <!-- 新增 router-view 用于渲染子路由内容 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            password: '',
            newPassword:'',
            confirmPassword: '',
            phonenum: ''
        };
    },
    methods: {
        handleLogin() {
            if (!this.input) {
                this.$message.error('请输入用户名');
            } else if (!this.password) {
                this.$message.error('请输入密码');
            } else if (!this.confirmPassword) {
                this.$message.error('请确认密码');
            } else if (this.newPassword!= this.confirmPassword) {
                this.$message.error('两次输入的密码不一致');
            } else if (!this.phonenum) {
                this.$message.error('请输入电话号码');
            } else if (!/^\d+$/.test(this.phonenum)) {
                this.$message.error('请输入正确电话号码');
            } else {
                this.$message.success('注册成功！请登录');
                this.$router.push('/loginLogin');
            }
        }
    }
};
</script>

<style>
.loginRegister{
    width: 100%;
    background-color: rgb(232, 245, 255);
    height: calc(100vh - 90px);
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.Register-box{
    width: 50%;
    max-height: 95%;
    margin-top: 5%;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 4px 4px rgba(128, 128, 128, 0.595);
    border-radius: 4px;
    align-items: center;
}

.register-input{
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 60%;
    /* background-color: aqua; */
    margin-top: 0;
}
.register-name{
    color: rgb(105, 105, 105);
    margin-top: 5%;  
}
.register-over {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 3%;
}
.register-over .el-button{
    width: 30%;
}
</style>    