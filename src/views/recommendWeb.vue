<template>
  <div class="movie-recommendation">

    <!-- 头部搜索框 -->
    <div class="header">
      <!-- <div class="back-button">
        <div class="back-icon"></div>
      </div> -->
      <div class="search-bar">
        <input type="text" placeholder="搜索你想看的电影" />
        <el-button icon="el-icon-search" circle></el-button>
      </div>
    </div>


    <!-- 推荐部分 -->
    <div class="content">
      <!-- 热门推荐 -->
      <div class="section">
        <h2 class="section-title">热门推荐</h2>
        <div class="movie-grid">
          <div v-for="(movie, index) in hotMovies" :key="'hot-' + index" class="movie-card" @click="goTodetails">
            <div class="movie-poster">
              <img :src="movie.img" alt="" style="width: 100%;height: 100%;">
            </div>
            <div class="movie-info">
              <div class="movie-title">{{ movie.title }}</div>
              <div class="movie-rating">
                <span class="rating-score">{{ movie.score }}</span>
                <div>⭐</div>
                <!-- <span class="source"></span> -->
              </div>
              <div class="movie-tags">
                <span v-for="(tag, tagIndex) in movie.tags" :key="tagIndex" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 个性化推荐 -->
      <div class="section">
        <h2 class="section-title">个性化推荐</h2>
        <div class="personalized-movie-grid">
          <div v-for="(movie, index) in personalizedMovies" :key="'pers-' + index" class="personalized-movie-card">
            <div class="personalized-movie-poster">
              <img :src="movie.img" alt="" style="width: 100%;height: 100%;">
            </div>
            <div class="personalized-movie-info">
              <div class="personalized-movie-title">{{ movie.title }}</div>
              <div class="actor-list">
                主演：{{ movie.actors }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <!-- <div class="pagination">
     
      <div class="page-nav prev-page">
        <div class="nav-icon"></div>
      </div>

      <div v-for="page in 5" :key="page" 
           :class="['page-number', {'current': page === currentPage}]"
           @click="setPage(page)">
        {{ page }}
      </div>
    
      <div class="page-nav next-page">
        <div class="nav-icon"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getHot, getPerson } from '@/api/api/recomm'
export default {
  name: 'MovieRecommendation',
  data() {
    return {
      currentPage: 1,
      hotMovies: [],
      personalizedMovies: []
    }
  },
  methods: {
    setPage(page) {
      this.currentPage = page;
    },
    goTodetails() {
      this.$router.push('/detailsWeb')
    },
    getHotMovie() {
      getHot()
        .then(res => {
          const { status, data } = res
          if (status == 0) {
            this.hotMovies = []
            data.forEach(element => {
              this.hotMovies.push({
                title: element.mv_name,
                score: element.d_rate,
                tags: element.mv_type.split(',')
                  .map(item => item.trim()),
                img: element.image_link
              })
            });
          } else {
            this.$message.error(res.error || '热门电影获取失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPersonMovie(id) {
      getPerson(id)
        .then(res => {
          const { status, data } = res
          if (status == 0) {
            this.personalizedMovies = []

            data.forEach(element => {
              this.personalizedMovies.push({
                title: element.mv_name,
                actors: element.leader,
                img: element.image_link
              })
            });
          } else {
            this.$message.error(res.error || '个性电影获取失败')
          }

        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getHotMovie()
    const id = localStorage.getItem('id')
    this.getPersonMovie(id)
  }
}
</script>

<style scoped>
.movie-recommendation {
  font-family: 'Arial', sans-serif;
  max-width: 100%;
  margin: 0 auto;
  color: #333;
  background-color: rgb(232, 245, 255);
  padding: 10px 10%;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  padding: 15px;
  /* background-color: #4a90e2; */
  width: 93%;
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
  width: 100%;
  padding: 10px 15px 10px 50px;
  border: none;
  border-radius: 80px;
  font-size: 14px;
  outline: none;
  border: 1px solid gainsboro;
}

.search-bar button {
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
  padding: 15px;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.movie-grid {
  display: flex;
  overflow-x: auto;
  margin: 0 -10px;
  padding-bottom: 10px;
}

.movie-card {
  flex: 0 0 auto;
  width: 150px;
  margin: 0 10px;
}

.movie-poster {
  width: 100%;
  height: 200px;
  background-color: #cac9c9;
  border-radius: 8px;
  margin-bottom: 8px;
}

.movie-info {
  padding: 0 5px;
}

.movie-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-rating {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.rating-score {
  color: #ffb400;
  font-weight: bold;
  margin-right: 3px;
}

.star-icon {
  width: 12px;
  height: 12px;
  background-color: #ffb400;
  margin-right: 3px;
}

.source {
  font-size: 12px;
  color: #999;
}

.movie-tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  color: #666;
  background-color: #ffffff;
  padding: 2px 5px;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
}

/* 个性化推荐部分新样式 */
.personalized-movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.personalized-movie-card {
  position: relative;
}

.personalized-movie-poster {
  width: 100%;
  height: 160px;
  background-color: #ccc;
  border-radius: 8px;
  position: relative;
  margin-bottom: 10px;
}

.play-button {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 30px;
  height: 30px;
  background-color: #4a90e2;
  border-radius: 50%;
}

.personalized-movie-info {
  padding: 0 5px;
}

.personalized-movie-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actor-list {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .personalized-movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .personalized-movie-grid {
    grid-template-columns: 1fr;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  /* background-color: #4a90e2; */
  padding: 10px 0;
}

.page-number {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  color: rgb(0, 0, 0);
}

.page-number.current {
  background-color: white;
  color: #4a90e2;
}

.page-nav {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid gainsboro;
  background-color: rgba(235, 235, 235, 0.584);
  border-radius: 5px;
}

.nav-icon {
  width: 10px;
  height: 10px;
  border-top: 2px solid rgb(0, 0, 0);
  border-right: 2px solid rgb(93, 93, 93);

}

.prev-page .nav-icon {
  transform: rotate(-135deg);
}

.next-page .nav-icon {
  transform: rotate(45deg);
}
</style>