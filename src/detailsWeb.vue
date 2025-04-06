<template>
    <div class="movie-detail">
        <div class="movie-container">
            <div class="movie-poster">
                <div class="poster-placeholder"></div>
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
                            <i class="calendar-icon"></i>
                            {{ movie.releaseDate }}上映
                        </span>
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

                <div class="cast-section">
            <h2>主创阵容</h2>
            <div class="cast-list">
                <div v-for="(actor, index) in castMembers" :key="index" class="cast-member">
                    <!-- <div class="cast-photo"></div> -->
                    <h3>{{ actor.name }}</h3>
                    <p>{{ actor.role }}</p>
                </div>
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
                            <div class="user-avatar"></div>
                            <div class="user-name-date">
                                <h4>{{ comment.username }}</h4>
                                <div class="user-rating">
                                    <span v-for="n in 5" :key="n" class="small-star"
                                        :class="{ 'filled': n <= comment.rating }"></span>
                                    <span class="comment-date">{{ comment.date }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="likes">
                            <span class="like-count">{{ comment.likes }}</span>
                            <button class="like-btn" @click="likeComment(index)">
                                <span class="thumb-icon"></span>
                            </button>
                        </div>
                    </div>
                    <p class="comment-content">{{ comment.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MovieDetail',
    data() {
        return {
            movie: {
                title: '量子幻境',
                director: '陈思远',
                actors: ['周雨晴', '李云帆', '张明哲', '王语心'],
                releaseDate: '2024年3月15日',
                description: '在2045年的未来世界，量子计算技术突破带来了人类文明的巨大变革。主人公周雨晴是一位天才量子物理学家，她发现了一个可以穿越时空宇宙的微人工智。在AI研究员李云帆的协助下，他们必须在72小时内阻止一场足以毁灭多元宇宙的灾难。这部科幻巨制将带领观众穿越时空，探索人性与科技的终极奥秘。',
                rating: '9.2',
                tags: ['中国大陆', '科幻', '悬疑', '动作']
            },
            castMembers: [
                { name: '周雨晴', role: '女主角' },
                { name: '李云帆', role: '男主角' },
                { name: '张明哲', role: '配角' },
                { name: '王语心', role: '配角' }
            ],
            newComment: '',
            userRating: 0,
            comments: [
                {
                    username: '星辰大海',
                    rating: 5,
                    date: '2024-03-15',
                    content: '这部电影的视觉效果令人惊叹！量子幻境的设计极其创新，大胆展示了宇宙的神秘特性与物理世界奥秘。周雨晴的演技也很出众，完美诠释了天才物理学家的形象。故事情节紧凑，科幻元素与人文关怀完美结合。绝对是今年最值得期待的科幻大片！',
                    likes: 328
                },
                {
                    username: '光影随心',
                    rating: 4,
                    date: '2024-03-16',
                    content: '剧本构思巧妙，将量子物理原理巧妙地与生动的故事情节融合在一起。让观众既能感受科幻的魅力，又不会陷入深奥难懂。特别是李云帆饰演的AI研究员，他和周雨晴的对手戏很精彩。唯一的遗憾是结尾略显仓促，期待导演剪辑版！',
                    likes: 215
                },
                {
                    username: '极限彩虹',
                    rating: 5,
                    date: '2024-03-16',
                    content: '作为一个物理专业的学生，我非常欣赏这部能对量子理论的严谨诠释。视觉设计和特效超乎想象，但更让我惊喜的是在中对科学家形象的真实刻画。周雨晴演绎的角色特点与人文特质，与在面对道德困境时的科技伦理观令人深思。',
                    likes: 167
                }
            ]
        }
    },
    methods: {
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
                likes: 0
            });

            this.newComment = '';
            this.userRating = 0;
        },
        likeComment(index) {
            this.comments[index].likes++;
        }
    }
}
</script>

<style scoped>
.movie-detail {
    max-width: 100%;
    margin: 0 auto;
    padding: 50px 10%;
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: rgb(232, 245, 255);
    min-height: 100vh;
}

.movie-container {
    display: flex;
    margin-bottom: 40px;
}

.movie-poster {
    flex: 0 0 300px;
    margin-right: 30px;
}

.poster-placeholder {
    width: 100%;
    height: 450px;
    background-color: #ccc;
    border-radius: 8px;
}

.movie-info {
    flex: 1;
}

.movie-title {
    font-size: 28px;
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
    margin-right: 5px;
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
    margin-right: 5px;
    border-radius: 2px;
}

.movie-description {
    margin-bottom: 20px;
}

.movie-description h3 {
    font-size: 18px;
    margin-bottom: 10px;
    border-left: 4px solid #4a90e2;
    padding-left: 10px;
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
    margin-left: auto;
}

.tag {
    display: inline-block;
    padding: 5px 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 8px;
    margin-bottom: 5px;
}

.cast-section {
    margin-top: 30px;
    margin-bottom: 40px;
}

.cast-section h2{
    font-size: 18px;
    margin-bottom: 10px;
    border-left: 4px solid #4a90e2;
    padding-left: 10px;
}

.comments-section h2 {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
}

.cast-section h2:after,
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

.comments-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.likes {
    display: flex;
    align-items: center;
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
}
</style>