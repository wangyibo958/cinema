<template>
    <div class="t3">
        <div class="user-profile">
            <!-- 头部 -->
            <div class="header">
                <div class="back-button" @click="goBack">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <div class="title">个人中心</div>
                <div class="avatar-small">

                </div>
            </div>

            <!-- 用户信息卡片 -->
            <div class="user-card">
                <div class="user-info">
                    <div class="avatar-section">
                        <div class="avatar-placeholder"></div>
                    </div>
                    <div class="info-section">
                        <div class="name">{{ userInfo.name }}</div>
                        <div class="register-date">注册时间：{{ userInfo.registerDate }}</div>
                        <div class="phone">手机号码：{{ userInfo.phone }}</div>
                    </div>
                    <div class="edit-button">
                        <el-button type="primary" size="small" @click="goTochange">修改信息</el-button>
                    </div>
                </div>
            </div>

            <!-- 订单详情 -->
            <div class="order-section">
                <div class="section-title">订单详情</div>
                <div class="order-list">
                    <div v-for="order in orders" :key="order.id" class="order-item">
                        <div class="order-header">
                            <div class="user-name">{{ order.userName }}</div>
                        </div>



                        <div class="order-content">
                            <div class="cont1">
                                <div class="cinema-info">
                                <div>影院：{{ order.cinema }}</div>
                                <div class="order-number">订单号：{{ order.orderNumber }}</div>
                                <div class="order-time">订单时间：{{ order.orderTime }}</div>
                            </div>
                            <div class="movie-info">
                                <div class="movie-name">{{ order.movieName }}</div>
                                <div class="seat-info">座位：{{ order.seats }}</div>
                                <div class="movie-type">{{ order.movieType }}</div>
                            </div>
                            
                            </div>
                            
                            <!-- 电影海报 -->
                            <div class="film-picture">
                                <img :src="order.picture" :alt="order.movieName" class="picture"
                                    :style="{ transform: hoverEffect === order.id ? 'scale(1.05)' : 'none' }">
                            </div>

                        </div>
                        <div class="price-info">
                                <div class="price">票价：<span class="amount">¥{{ order.price }}</span></div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'UserProfile',
    data() {
        return {
            userInfo: {
                name: '陈思远',
                registerDate: '2023-05-15',
                phone: '138 **** 5678'
            },
            orders: [
                {
                    id: 1,
                    userName: '陈思远',
                    cinema: '万达影城 (北京朝阳大悦城店)',
                    orderNumber: 'ORDER202401150001',
                    orderTime: '2024-01-15 14:30',
                    movieName: '流浪地球3',
                    seats: '7排9座、7排10座',
                    movieType: 'IMAX 3D',
                    price: '156.00',
                    picture: ''
                },
                {
                    id: 2,
                    userName: '陈思远',
                    cinema: '金逸影城 (北京望京店)',
                    orderNumber: 'ORDER202401100002',
                    orderTime: '2024-01-10 19:45',
                    movieName: '我们的岁月',
                    seats: '5排12座',
                    movieType: '杜比全景声',
                    price: '68.00',
                    picture: ''
                },
                {
                    id: 3,
                    userName: '陈思远',
                    cinema: '首都电影院 (西单店)',
                    orderNumber: 'ORDER202401050003',
                    orderTime: '2024-01-05 20:15',
                    movieName: '热带往事',
                    seats: '8排15座、8排16座',
                    movieType: 'IMAX 2D',
                    price: '138.00',
                    picture: ''
                }
            ]
        }
    },
    methods: {
        goBack() {
            this.$router.go(-3)
        },
        goTochange() {
            this.$router.push('/changeWeb')
        }
    }
}
</script>

<style scoped>
.t3 {
    width: 100%;
    min-height: 100vh;
    background-color: rgb(232, 245, 255);
}

.user-profile {
    background-color: rgb(232, 245, 255);
    min-height: 100vh;
    width: 80%;
    padding-left: 10%;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
    width: 96%;
    margin-left: 0.5%;
    border-radius: 5px;
}

.back-button {
    padding: 8px;
    cursor: pointer;
}

.back-button i {
    font-size: 20px;
    color: #333;
}

.title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.avatar-small {
    width: 32px;
    height: 32px;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    background-image: url('/src/assets/delicious.jpg');
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
}

.user-card {
    margin: 15px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.user-info {
    display: flex;
    align-items: center;
}

.avatar-section {
    width: 60px;
    height: 60px;
    margin-right: 15px;
}

.info-section {
    flex: 1;
}

.name {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 5px;
}

.register-date,
.phone {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}

.edit-button {
    margin-left: 15px;
}

.order-section {
    margin: 15px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 15px;
}

.order-item {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
}

.order-item:last-child {
    border-bottom: none;
}

.order-header {
    margin-bottom: 10px;
}

.user-name {
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.order-content {
    font-size: 14px;
    color: #666;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

}
.cont1{
    
}

/* 电影海报 */
.film-picture {
    background-color: #898989;
    margin-right: 5%;
    border-radius: 5px;
    width: 8%;
    /* height: 10%; */
    /* margin-bottom: ; */
    box-shadow: 4px 4px 10px rgb(133, 133, 133);
}
.picture{
    width: 100%;
    height: 100%;
    object-fit: cover;
    
}


.cinema-info {
    margin-bottom: 10px;
}

.order-number,
.order-time {
    margin-top: 5px;
    color: #999;
}

.movie-info {
    margin: 10px 0;
}

.movie-name {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
}

.seat-info,
.movie-type {
    color: #999;
    margin-top: 5px;
}

.price-info {
    text-align: right;
    margin-top: 10px;
    margin-right: 5.5%;
}

.price {
    color: #666;
}


.amount {
    color: #409EFF;
    font-size: 16px;
    font-weight: 500;
}
</style>