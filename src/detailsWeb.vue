<template>
    <div class="movie-detail">
        <div class="movie-container">
            <!-- 返回上一步 -->
            <div class="d-return">

                <span class="back-text" @click="backText"> <i class="el-icon-arrow-left"></i>返回</span>
            </div>

            <div class="movie-poster">
                <div class="poster-placeholder">
                    <img :src="movie.poster" :alt="movie.title" class="poster">
                </div>
            </div>

            <div class="movie-info">
                <h1 class="movie-title">{{ movie.title }}</h1>

                <div class="movie-metadata">
                    <div class="metadata-item">
                        <span class="label">导演:</span>
                        <span>{{ movie.director }}</span>
                    </div>

                    <div class="metadata-item">
                        <span class="label">主演:</span>
                        <span>{{ movie.actors.join('、') }}</span>
                    </div>

                    <div class="metadata-item">
                        <span class="release-date">
                            <i class="el-icon-time"></i>
                            {{ movie.releaseDate }}上映
                        </span>
                    </div>
                </div>

                <div class="cast-section">
                    <h2>主创阵容</h2>
                    <div class="cast-list">
                        <!-- <div v-for="(actor, index) in castMembers" :key="index" class="cast-member"> -->
                        <!-- <div class="cast-photo"></div> -->
                        <!-- <h3>{{ actor.name }}</h3> -->
                        <p>{{ movie.role }}</p>
                        <!-- </div> -->
                    </div>
                </div>

                <div class="movie-description">
                    <h3>剧情简介</h3>
                    <p>{{ movie.description }}</p>
                </div>

                <!-- 电影评分和类型 -->
                <div class="movie-rating">
                    <div class="rating-stars">
                        <i v-for="n in 5" :key="n" class="star" :class="{ 'half-star': n === 5 }"></i>
                    </div>
                    <span class="rating-score">{{ movie.rating }}</span>
                    <span class="rating-max">/ 10</span>

                    <div class="movie-tags">
                        <span v-for="(tag, index) in movie.tags" :key="index" class="tag">{{ tag }}</span>
                    </div>
                </div>




            </div>
        </div>



        <div class="comments-section">
            <h2>观众评论</h2>

            <div class="comment-form">
                <textarea v-model="newComment" placeholder="分享你的观影感受..." rows="3"></textarea>
                <div class="rating-input">
                    <span v-for="star in 5" :key="star" class="rating-star" :class="{ 'active': star <= userRating }"
                        @click="setRating(star)"></span>
                    <span class="rating-text">点击星星评分</span>
                </div>
                <button class="submit-btn" @click="submitComment">发表评论</button>
            </div>

            <div class="comments-list">
                <div v-for="(comment, index) in comments" :key="index" class="comment-item">
                    <div class="comment-header">
                        <div class="user-info">

                            <div class="user-name-date">
                                <h4>{{ comment.username }}</h4>
                                <div class="user-rating">

                                    <span class="comment-date">{{ comment.date }}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p class="comment-content">{{ comment.content }}</p>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { details, comment } from './api/api/movies';
export default {
    name: 'MovieDetail',
    data() {
        return {
            movie: {
                title: '',
                director: '',
                actors: [],
                releaseDate: '',
                description: '',
                rating: '',
                tags: [],
                poster: '',
                role: ''
            },

            comments: []

        }
    },
    methods: {
        backText() {
            this.$router.go(-1)
        },
        setRating(star) {
            this.userRating = star;
        },
        submitComment() {
            if (!this.newComment || !this.userRating) {
                alert('请输入评论内容并评分');
                return;
            }

            const today = new Date();
            const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            this.comments.unshift({
                username: '用户' + Math.floor(Math.random() * 10000),
                rating: this.userRating,
                date: formattedDate,
                content: this.newComment,

            });

            this.newComment = '';
            this.userRating = 0;
        },

    },

    async created() {
        try {
            const movieId = String(this.$route.query.id || "1")
            const res = await details(movieId)

            console.log(res);
            const { status, data } = res
            if (status == 0) {
                //data并非数组，不能还用map
                this.movie = {
                    title: data.mv_name?.toString() || "暂无标题",
                    director: data.director?.toString() || "未知导演",
                    actors: data.scenarist?.split(',') || [],
                    releaseDate: data.release_date?.toString() || "未知日期",
                    description: data.quote?.toString() || "暂无简介",
                    rating: Number(data.d_rate) || 0, // 评分保持数字类型
                    tags: data.mv_type?.split('/') || [],
                    poster: data.image_link,
                    role: data.leader
                }
                comment(this.movie.title)

                const commentRes = await comment(this.movie.title)
                if (commentRes.status == 0) {
                    this.comments = (commentRes.data || []).map(item => ({
                        date: item.create_time?.slice(0, 10) || '未知日期',
                        content: item.content || '无内容',
                        username: item.user
                    })
                    )
                }

                // .then(res=>{
                //     console.log(res)
                // })
                // .catch(err=>{
                //     console.log(err)
                // })
            } else {
                this.$message.error(res.msg || '电影详情获取失败')
            }
        } catch (err) {
            console.log(err)

        }
    }

}
</script>

<style scoped>
.movie-detail {
    min-width: 100vw;
    margin: 0 auto;
    padding: 30px 10% 0 1%;
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: rgb(232, 245, 255);
    min-height: 100vh;
    padding-bottom: 50px;
    padding-right: 10%;
}

.movie-container {
    display: flex;
    margin-bottom: 40px;
    margin-left: 2%;

}

.back-text {
    width: 50px;
    height: 40px;
    margin-right: 50px;
    display: block;
}

.back-text:hover {
    cursor: pointer;
}

.movie-poster {
    /* width: 25%; */
    height: 400px;
    /* background-color: #4a90e2; */
    flex: 0 0 250px;
    /* margin-right: 30px; */
    margin-top: 70px;
    margin-right: 50px;
}

.poster-placeholder {
    width: 100%;
    height: 400px;
    background-color: #ccc;
    border-radius: 10px;
    box-shadow: 4px 4px 10px gray;
}

.poster-placeholder img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.movie-info {
    flex: 1;
    margin-top: 20px;
    /* margin-right: 20px; */
}

.movie-title {
    font-size: 40px;
    margin-bottom: 20px;
    text-align: center;

}

.movie-metadata {
    margin-bottom: 20px;
}

.metadata-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.label {
    font-weight: bold;
    /* margin-right: 5px; */
}

.release-date {
    display: inline-flex;
    align-items: center;
    color: #4a90e2;
}

.calendar-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #4a90e2;
    /* margin-right: 5px; */
    border-radius: 2px;
}

.movie-description {
    margin-bottom: 20px;
    font-size: 2.5vh;

}

.movie-description h3 {
    font-size: 18px;
    margin-bottom: 10px;
    border-left: 4px solid #4a90e2;
    padding-left: 10px;
    margin-top: 10px;
}

.movie-description p {
    line-height: 1.6;
    text-align: justify;
}

.movie-rating {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.rating-stars {
    display: flex;
    margin-right: 10px;
}

.star {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #ffb400;
    margin-right: 2px;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.half-star {
    background: linear-gradient(90deg, #ffb400 50%, #ccc 50%);
}

.rating-score {
    font-size: 20px;
    font-weight: bold;
    color: #ffb400;
}

.rating-max {
    color: #999;
    margin-right: 15px;
}

.movie-tags {
    margin-left: 0;
    margin-top: 5px;

}

.tag {
    display: inline-block;
    padding: 5px 10px;
    background-color: #f1f1f1;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 8px;
    margin-bottom: 5px;
    box-shadow: 2px 2px 5px gainsboro;
}

.cast-section {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 2.vh;
}

.cast-section h2 {
    font-size: 18px;
    margin-bottom: 10px;
    border-left: 4px solid #4a90e2;
    padding-left: 10px;
}

/* .comments{
    margin-left: 400px;
} */

.comments-section h2 {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
}

/* .cast-section h2:after, */
.comments-section h2:after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background-color: #4a90e2;
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
}

.cast-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.cast-member {
    width: 180px;
    /* text-align: center; */
    margin-bottom: 20px;
}

.cast-photo {
    width: 150px;
    height: 150px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 auto 10px;
}

.cast-member h3 {
    font-size: 16px;
    margin-bottom: 5px;
}

.cast-member p {
    color: #777;
    font-size: 14px;
}


/* 评论板块 */
.comments-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-left: 10%;
    /* margin-bottom: 40px; */
}

.comment-form {
    margin-bottom: 30px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 6px;
}

.comment-form textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    resize: none;
    margin-bottom: 10px;
}

.rating-input {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.rating-star {
    display: inline-block;
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

.rating-text {
    font-size: 14px;
    color: #777;
    margin-left: 10px;
}

.submit-btn {
    padding: 8px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
}

.submit-btn:hover {
    background-color: #3a80d2;
}

.comments-list {
    margin-top: 20px;
}

.comment-item {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.user-info {
    display: flex;
}

.user-avatar {
    width: 40px;
    height: 40px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 10px;
}

.user-name-date h4 {
    margin: 0 0 5px;
    font-size: 16px;
}

.user-rating {
    display: flex;
    align-items: center;
}

.small-star {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
    background-color: #ddd;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.small-star.filled {
    background-color: #ffb400;
}

.comment-date {
    color: #999;
    font-size: 12px;
    margin-left: 10px;
}

.like-count {
    font-size: 14px;
    margin-right: 5px;
}

.like-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.thumb-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #777;
    border-radius: 2px;
}

.comment-content {
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    margin-bottom: 25px;
}
</style>