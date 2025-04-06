<template>
    <div class="loginRegister">
        <div class="Register-box">
            <div class="immmgg">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>

            <div class="register-input">
                <div class="register-name">设置用户名（不少于5位）：<el-input placeholder="请输用户名" v-model="form.username"
                        clearable></el-input></div>
                <div class="register-name">设置密码（不少于5位）：<el-input placeholder="请输入密码" v-model="form.password"
                        show-password></el-input></div>
                <div class="register-name">确认密码：<el-input placeholder="请再次输入密码" v-model="form.confirmPassword"
                        show-password></el-input></div>
                <div class="register-name">电话：<el-input placeholder="请输入电话号码" v-model="form.phone" clearable></el-input>
                </div>
                <div class="register-over"><el-button type="primary" @click="handleLogin" plain>注&nbsp;册</el-button>
                </div>
            </div>
        </div>
        <!-- 新增 router-view 用于渲染子路由内容 -->
        <router-view></router-view>
    </div>
</template>

<script>
import { register } from '@/api/api/login.js';
import axios from 'axios';
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confirmPassword: '',
                phone: ''
            }

        };
    },
    methods: {
        // checkusername(){
        //     if (!this.form.username) {
        //         this.$message.error('请输入用户名')
        //         return false
        //     }
        //     return true
        // },
        handleLogin() {
            if (!this.form.username) {
                this.$message.error('请输入用户名');
            } else if (!this.form.password) {
                this.$message.error('请输入密码');
            } else if (!this.form.confirmPassword) {
                this.$message.error('请确认密码');
            } else if (this.form.password !== this.form.confirmPassword) {
                this.$message.error('两次输入的密码不一致');
            } else if (!this.form.phone) {
                this.$message.error('请输入电话号码');
            } else if (!/^\d+$/.test(this.form.phone)) {
                this.$message.error('请输入正确电话号码');
            } else if (this.form.password.length<5){
                this.$message.error('密码不能小于五位');
            }else if (this.form.username.length<5){
                this.$message.error('用户名不能小于五位');
            }
            else {
                register(this.form)
                .then(res =>{
                    // console.log(res);
                    this.$message.success("注册成功，请登录")
                    this.$router.push('/loginLogin');
                })
                .catch(err=>{
                    console.log(err)
                })
                
            }
        }
    }
};
</script>

<style>
.loginRegister {
    width: 100%;
    background-color: rgb(232, 245, 255);
    height: calc(100vh - 90px);
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.Register-box {
    width: 50%;
    min-height: 560px;
    margin-top: 3%;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 4px 4px rgba(128, 128, 128, 0.595);
    border-radius: 4px;
    align-items: center;
}

.immmgg {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 3%;
}

.immmgg .el-avatar {
    width: 80px;
    height: 80px;
}

.register-input {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 60%;
    /* background-color: aqua; */
    margin-top: 0;
}

.register-name {
    color: rgb(105, 105, 105);
    margin-top: 5%;
}

.register-over {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5%;
}

.register-over .el-button {
    width: 30%;
}
</style>