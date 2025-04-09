<!-- 电影院选择页面 -->
<template>
    <div class="cinema-detail">
        <!-- 头部搜索框 -->
        <div class="header">
            <div class="search-bar">
                <input type="text" placeholder="搜索影院" />
                <el-button icon="el-icon-search" circle></el-button>
            </div>
        </div>
        <!-- 影院部分 -->
        <div class="content">
            <div v-for="(cinema, cinemaIndex) in cinemas" :key="cinema.id" class="cinema-item">
                <!-- 影院信息 -->
                <div class="cinema-info">
                    <!-- 影院名称＋评分 -->
                    <div class="cinema-title">
                        <h2>{{ cinema.name }}</h2>
                        <div class="rating">
                            <div class="stars">
                                <span v-for="i in 5" :key="i" class="star" :class="{
                                    'filled': i <= Math.floor(cinema.rating),
                                    'half-filled': (cinema.rating % 1) >= 0.5 && i === Math.ceil(cinema.rating)
                                }">
                                </span>
                            </div>
                            <span class="rating-text">{{ cinema.rating }}/5</span>
                        </div>
                    </div>
                    <!-- 影院地址＋电话＋营业时间 -->
                    <div class="cinema-details">
                        <div class="detail-item location">
                            <div class="el-icon-position"></div>
                            <span>{{ cinema.address }}</span>
                        </div>
                        <div class="detail-item phone">
                            <div class="el-icon-phone-outline"></div>
                            <span>{{ cinema.phone }}</span>
                        </div>
                        <div class="detail-item time">
                            <div class="el-icon-time"></div>
                            <span>{{ cinema.openingHours }}</span>
                        </div>
                    </div>
                </div>
                <!-- 放映电影信息 -->
                <div class="showtimes">
                    <div class="showtimes-header">
                        <div class="movie-col">电影</div>
                        <div class="time-col">时间</div>
                        <div class="price-col">价格</div>
                        <div class="hall-col">影厅</div>
                    </div>
                    <div v-for="showtime in cinema.showtimes" :key="showtime.id" class="showtime-item">
                        <div class="movie-col">{{ showtime.movie }}</div>
                        <div class="time-col">{{ showtime.time }}</div>
                        <div class="price-col">¥{{ showtime.price }}</div>
                        <div class="hall-col">{{ showtime.hall }}</div>
                        <el-button type="primary" @click="goToBuy">购票</el-button>
                    </div>
                </div>
                <!-- 操作按钮 -->
                <div class="action-buttons">
                    <button class="action-btn check-btn" @click="toggleReviews(cinemaIndex)">
                        {{ cinema.showReviews ? '收起评价' : '查看评价 (' + cinema.reviews.length + ')' }}
                    </button>
                    <button class="action-btn buy-btn" @click="toggleWriteReview(cinemaIndex)">
                        {{ cinema.showWriteReview ? '取消评价' : '撰写评价' }}
                    </button>
                </div>
                <!-- 评价列表 -->
                <div class="reviews-section" v-if="cinema.showReviews">
                    <div class="reviews-header">
                        <h3>用户评价 ({{ cinema.reviews.length }})</h3>
                        <div class="reviews-sort">

                        </div>
                    </div>

                    <div class="reviews-list">
                        <div v-for="review in cinema.reviews" :key="review.id" class="review-item">
                            <div class="review-header">
                                <div class="reviewer-info">
                                    <div class="avatar"></div>
                                    <div class="reviewer-detail">
                                        <div class="reviewer-name">{{ review.userName }}</div>
                                        <div class="review-rating">
                                            <div class="stars">
                                                <span v-for="i in 5" :key="i" class="star small"
                                                    :class="{ 'filled': i <= review.rating }">
                                                </span>
                                            </div>
                                            <span class="review-date">{{ formatDate(review.date) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="review-content">
                                {{ review.content }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 写评价区域 -->

                <!-- 模版分组渲染v-if -->
                <div class="write-review-section" v-if="cinema.showWriteReview">
                    <h3>撰写您的评价</h3>
                    <div class="rating-input">
                        <span class="rating-label">您的评分: </span>
                        <div class="rating-stars">
                            <span v-for="i in 5" :key="i" class="rating-star"
                                :class="{ 'active': i <= cinema.draftReview.rating }"
                                @click="setRating(cinemaIndex, i)">
                            </span>
                        </div>
                    </div>
                    <div class="review-textarea">
                        <textarea placeholder="请分享您对这家影院的体验和建议..." v-model="cinema.draftReview.content" rows="4">
            </textarea>
                    </div>
                    <div class="review-submit">
                        <!-- 点击时触发提交方法，并传递影院索引 -->
                        <button class="submit-btn" @click="submitReview(cinemaIndex)"
                            :disabled="!isReviewValid(cinemaIndex)">
                            {{ submitting ? '提交中...' : '提交评价' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CinemaDetail',
    data() {
        return {
            submitting: false,
            cinemas: [
                {
                    id: 1,
                    name: '星光国际影城',
                    rating: 4.8,
                    address: '北京市朝阳区三里屯路19号太古里北区N8号楼',
                    phone: '010-64516888',
                    openingHours: '10:00 - 22:00',
                    showtimes: [
                        { id: 101, movie: '流浪地球3', time: '14:30', price: '43', hall: 'IMAX厅' },
                        { id: 102, movie: '热辣滚烫', time: '16:45', price: '38', hall: '2号厅' },
                        { id: 103, movie: '飞驰人生2', time: '19:00', price: '45', hall: '全景声厅' }
                    ],
                    showReviews: false,
                    showWriteReview: false,
                    draftReview: { rating: 0, content: '' },
                    reviews: [
                        {
                            id: 1001,
                            userName: '电影爱好者',
                            rating: 5,
                            date: '2024-02-15T10:30:00',
                            content: '设施非常现代化，IMAX厅体验极佳，座椅舒适，整体环境也很干净。服务人员态度友好，整体观影体验超出预期！'
                        }
                    ]
                },
                {
                    id: 1,
                    name: '星光国际影城',
                    rating: 4.8,
                    address: '北京市朝阳区三里屯路19号太古里北区N8号楼',
                    phone: '010-64516888',
                    openingHours: '10:00 - 22:00',
                    showtimes: [
                        { id: 101, movie: '流浪地球3', time: '14:30', price: '43', hall: 'IMAX厅' },
                        { id: 102, movie: '热辣滚烫', time: '16:45', price: '38', hall: '2号厅' },
                        { id: 103, movie: '飞驰人生2', time: '19:00', price: '45', hall: '全景声厅' }
                    ],
                    showReviews: false,
                    showWriteReview: false,
                    draftReview: { rating: 0, content: '' },
                    reviews: [
                        {
                            id: 1001,
                            userName: '电影爱好者',
                            rating: 5,
                            date: '2024-02-15T10:30:00',
                            content: '设施非常现代化，IMAX厅体验极佳，座椅舒适，整体环境也很干净。服务人员态度友好，整体观影体验超出预期！'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        // 响应式切换方法
        toggleReviews(index) {
            this.$set(this.cinemas[index], 'showReviews', !this.cinemas[index].showReviews)
            if (this.cinemas[index].showReviews) {
                this.$set(this.cinemas[index], 'showWriteReview', false)
            }
        },
        toggleWriteReview(index) {
            this.$set(this.cinemas[index], 'showWriteReview', !this.cinemas[index].showWriteReview)
            if (this.cinemas[index].showWriteReview) {
                this.$set(this.cinemas[index], 'showReviews', false)
                this.$set(this.cinemas[index], 'draftReview', { rating: 0, content: '' })
            }
        },
        // 评分设置
        setRating(index, rating) {
            this.$set(this.cinemas[index].draftReview, 'rating', rating)
        },
        // 表单验证
        isReviewValid(index) {
            const draft = this.cinemas[index].draftReview
            return draft.rating > 0 && draft.content.trim().length >= 10
        },
        // 提交评价
        async submitReview(index) {
            if (this.submitting) return

            try {
                this.submitting = true
                const cinema = this.cinemas[index]
                const newReview = {
                    id: Date.now(),
                    userName: `用户${Math.floor(Math.random() * 10000)}`,
                    rating: cinema.draftReview.rating,
                    date: new Date().toISOString(),
                    content: cinema.draftReview.content.trim()
                }
                // 更新评价列表
                this.$set(cinema, 'reviews', [newReview, ...cinema.reviews])
                // 计算新评分
                const total = cinema.reviews.reduce((sum, r) => sum + r.rating, 0)
                this.$set(cinema, 'rating', (total / cinema.reviews.length).toFixed(1))
                // 重置状态
                this.$set(cinema, 'showWriteReview', false)
                this.$set(cinema, 'showReviews', true)
                this.$set(cinema, 'draftReview', { rating: 0, content: '' })
                this.$message.success('评价提交成功！')
            } catch (error) {
                this.$message.error('提交失败，请重试')
            } finally {
                this.submitting = false
            }
        },
        // 辅助方法
        formatDate(isoString) {
            return new Date(isoString).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
        },

        //去购票
        goToBuy() {
            this.$router.push('/buyWeb')
        }
    }
}
</script>


<style scoped>
.cinema-detail {
    max-width: 100%;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: rgb(232, 245, 255);
    padding: 20px 10%;
}

.header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    /* background-color: #f0f8ff; */
}

.back-button {
    margin-right: 15px;
}

.back-icon {
    width: 24px;
    height: 24px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;

}

.search-bar {
    flex: 1;
    position: relative;

}

.search-bar input {
    width: 93%;
    padding: 10px 20px 10px 50px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    font-size: 14px;
    outline: none;

}

.search-bar .el-button {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    border-radius: 50%;
}

.content {
    padding: 0 15px;
}

.cinema-item {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.cinema-info {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.cinema-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.cinema-title h2 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
}

.rating {
    display: flex;
    align-items: center;
}

.stars {
    display: flex;
    margin-right: 5px;
}

.star {
    width: 16px;
    height: 16px;
    margin-right: 2px;
    background-color: #ddd;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.star.filled {
    background-color: #ffb400;
}

.rating-text {
    font-size: 14px;
    color: #ffb400;
    font-weight: bold;
}

.cinema-details {
    padding-top: 10px;
}

.detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    color: #666;
}

.detail-item span {
    margin-left: 10px;
}

.el-icon-position {
    color: rgb(50, 176, 255);
}

.el-icon-phone-outline {
    color: rgb(50, 176, 255);
}

.el-icon-time {
    color: rgb(50, 176, 255);
}

.icon {
    width: 16px;
    height: 16px;
    background-color: #ccc;
    margin-right: 8px;
    border-radius: 2px;
}

.showtimes {
    padding: 0 15px;
}

.showtimes-header {
    display: flex;
    padding: 15px 80px 15px 20px;
    border-bottom: 1px solid #f0f0f0;
    font-weight: bold;
    color: #555;
    font-size: 14px;


}

.showtime-item {
    display: flex;
    padding: 15px 15px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    flex-direction: row;
    align-items: center;
}

.showtime-item button {
    width: 60px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.movie-col {
    flex: 2;
}

.time-col {
    flex: 1;
    text-align: center;
}

.price-col {
    flex: 1;
    text-align: center;
    color: #f76260;
    font-weight: bold;
}

.hall-col {
    flex: 1;
    text-align: center;
}

.action-buttons {
    display: flex;
    padding: 15px;
}

.action-btn {
    flex: 1;
    padding: 12px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    color: white;
    cursor: pointer;
}

.check-btn {
    background-color: #4a90e2;
}

.buy-btn {
    background-color: #4a90e2;
}

.check-btn:hover,
.buy-btn:hover {
    opacity: 0.9;
}

.rating-star {
    transition: transform 0.2s;
}

.rating-star:hover {
    transform: scale(1.2);
}

.submit-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.half-filled {
    background: linear-gradient(90deg, #ffb400 50%, #ddd 50%);
}


/* 评价区域样式 */
.reviews-section {
    padding: 20px;
    border-top: 1px solid #eaeaea;
    background-color: #f9f9f9;
}

.reviews-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.reviews-header h3 {
    font-size: 16px;
    color: #333;
}

.reviews-sort {
    font-size: 14px;
    color: #666;
}

.sort-label {
    margin-right: 5px;
}

.sort-option {
    margin: 0 5px;
    cursor: pointer;
}

.sort-option.active {
    color: #4a90e2;
    font-weight: bold;
}

.reviews-list {
    margin-bottom: 20px;
}

.review-item {
    padding: 15px;
    border-bottom: 1px solid #eaeaea;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 15px;
}

.review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.reviewer-info {
    display: flex;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 10px;
}

.reviewer-name {
    font-weight: bold;
    margin-bottom: 5px;
}

.review-rating {
    display: flex;
    align-items: center;
}

.review-date {
    font-size: 12px;
    color: #999;
    margin-left: 10px;
}

.review-content {
    font-size: 14px;
    line-height: 1.5;
    color: #555;
}

/* 写评价区域样式 */
.write-review-section {
    padding: 20px;
    border-top: 1px solid #eaeaea;
    background-color: #f9f9f9;
}

.write-review-section h3 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #333;
}

.rating-input {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.rating-label {
    margin-right: 10px;
    font-size: 14px;
}

.rating-stars {
    display: flex;
}

.rating-star {
    width: 24px;
    height: 24px;
    margin-right: 5px;
    background-color: #ddd;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    cursor: pointer;
}

.rating-star.active {
    background-color: #ffb400;
}

.review-textarea {
    margin-bottom: 15px;
    margin-right: 20px;
}

.review-textarea textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    resize: vertical;

}

.review-submit {
    text-align: right;
}

.submit-btn {
    padding: 8px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

.submit-btn:hover {
    background-color: #3a80d2;
}
</style>