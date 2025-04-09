<!-- 修改信息页面 -->
<template>
    <div class="whoweb">
        <div class="change-box">
            <div class="change-input">
                <div class="change-name">用户名：<el-input placeholder="请输用户名" v-model="input" clearable></el-input></div>
                <div class="change-name">旧密码：<el-input placeholder="请输入旧密码" v-model="oldpassword" show-password
                        @input="logInput('oldpassword')"></el-input></div>
                <div class="change-name">新密码：<el-input placeholder="请输入新密码" v-model="newpassword" show-password
                        @input="logInput('newpassword')"></el-input></div>
                <div class="change-name">电话：<el-input placeholder="请输入电话号码" v-model="phonenum" clearable></el-input>
                </div>
                <div class="change-over"><el-button type="primary" @click="handleLogin" plain>修改完成</el-button></div>
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
            oldpassword: '',
            newpassword: '',
            phonenum: ''
        };
    },
    methods: {
        handleLogin() {
            if (!this.input) {
                this.$message.error('请输入用户名');
            } else if (!this.oldpassword) {
                this.$message.error('请输入旧密码');
            } else if (!this.newpassword) {
                this.$message.error('请输入新密码');
            } else if (!this.phonenum) {
                this.$message.error('请输入电话号码');
            } else if (!/^\d+$/.test(this.phonenum)) {
                this.$message.error('请输入正确电话号码');
            } else {
                this.$message.success('用户信息更新成功');
                this.$router.push('/loginLogin');
            }
        },
        logInput(field) {
            console.log(`${field}:`, this[field]);
        }
    }
};
</script>

<style>
.whoweb {
    width: 100%;
    background-color: rgb(232, 245, 255);
    height: calc(100vh - 90px);
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.change-box {
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

.change-input {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 60%;
    /* background-color: aqua; */
    margin-top: 3%;
}

.change-name {
    color: rgb(105, 105, 105);
    margin-top: 5%;
}

.change-over {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5%;
}

.change-over .el-button {
    width: 30%;
}
</style>