<template>
    <div class="loginLogin">
        <div class="Login-box">
            <div class="immmg">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>

            <div class="login-input">
                <div class="name">用户名：<el-input placeholder="请输用户名" v-model="form.username" clearable>
                    </el-input></div>
                <div class="name">密码：<el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                </div>
                <div class="over"><el-button type="primary" @click="handleLogin" plain>登&nbsp;录</el-button></div>
            </div>
        </div>
        <!-- 新增 router-view 用于渲染子路由内容 -->
        <router-view></router-view>




    </div>
</template>

<script>
import { login } from '@/api/api/login';
import { setToken } from '@/utils/setToken';
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
        }
    },
    methods: {
        handleLogin() {
            if (!this.form.username) {
                this.$message.error('请输入用户名');
            }
            else if (!this.form.password) {
                this.$message.error('请输入密码');
            }
            else {
                login(this.form)
                    .then(res => {
                        // console.log(res);
                        const { status, data } = res
                        if (status == 0) {
                            const token = 'Bearer' + ' ' + data.access_token
                            setToken(token)
                            localStorage.setItem('refreshToken', data.refresh_token)
                            this.$message.success('登陆成功');
                            this.$router.push('/personalHub');
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },


        // async handleLogin() {
        //     try {
        //         const res = await login(this.form)
        //         if (res.status === 0) {
        //             const token = 'Bearer ' + res.data.access_token
        //             setToken(token)

        //             // 添加用户信息预加载
        //             const userRes = await personal()
        //             this.$store.commit('SET_USER_INFO', userRes.data)

        //             this.$message.success('登录成功')
        //             this.$router.push({
        //                 path: '/personalHub',
        //                 query: {
        //                     _fresh: Date.now() // 防止路由缓存
        //                 }
        //             })
        //         }
        //     } catch (err) {
        //         console.error('登录失败:', err)
        //         this.$message.error(err.message || '登录失败')
        //     }
        // }







        /**
         * handleLogin asys() {
            * try{
                        if (!this.form.username) {
                            this.$message.error('请输入用户名');
                        }
                        else if (!this.form.password) {
                            this.$message.error('请输入密码');
                        }
                        else {

                        const res=await login(this.form)
                        const { status, data } = res
                        if (status == 0) {
                            const token = 'Bearer' + ' ' + data.access_token
                            setToken(token)
                            this.$message.success('登陆成功');
                            this.$router.push('/personalHub');
                        } else {
                            this.$message.error(res.msg)
                        }
            * }catch(err){
            *      log(err)
            * }
                
            }
        }
         */
    }
}
</script>

<style>
.loginLogin {
    width: 100%;
    background-color: rgb(232, 245, 255);
    height: calc(100vh - 90px);
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.Login-box {
    width: 50%;
    height: 500px;
    margin-top: 5%;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 4px 4px rgba(128, 128, 128, 0.595);
    border-radius: 4px;
    align-items: center;
}

.immmg {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5%;
}

.immmg .el-avatar {
    width: 100px;
    height: 100px;
}

.login-input {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 60%;
    /* background-color: aqua; */
    margin-top: 3%;
}

.name {
    color: rgb(105, 105, 105);
    margin-top: 5%;
}

.over {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5%;
}

.over .el-button {
    width: 30%;
}
</style>