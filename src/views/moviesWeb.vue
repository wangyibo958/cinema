<template>
  <div class="movie-list-page">
    <div class="search-bar">
      <el-input placeholder="请输入电影名称" clearable prefix-icon="el-icon-search" v-model="search" @change="backall"
        @blur="backall" @keyup.enter.native="searchFunction">
      </el-input>
      <div class="search-text">
        <el-button @click="searchFunction">搜索</el-button>
      </div>
    </div>

    <div class="category-filter">

      <!-- 电影类型搜索 -->
      <div class="category-tabs" v-show="!searchFlag">
        <div v-for="(category, index) in moveType" :key="index" class="category-tab" @click="checkType(index)"
          :style="{ background: typeIndex == index ? '#79b4f7bf' : '#f5f5f5' }">
          {{ category }}
        </div>
      </div>

      <!-- 年份搜索 -->

    </div>


    <!-- 电影板块 -->
    <div class="movie-container">
      <div class="movie-grid">
        <div v-for="(movie, index) in moviesListCopy" :key="index" class="movie-card"
          @mouseover="hoverEffect = movie.movie_id" @mouseleave="hoverEffect = null"
          @click="goTodetails(movie.movie_id)">
          <!-- 在最小卡片里面渲染 -->
          <!-- 携带路径id -->
          <div class="poster-wrapper">
            <img :src="movie.image_link" :alt="movie.mv_name" class="poster"
              :style="{ transform: hoverEffect === movie.movie_id ? 'scale(1.05)' : 'none' }">
            <div class="rating-badge">{{ movie.mv_type }}</div>
          </div>
          <h3 class="movie-title">{{ movie.mv_name }}</h3>
        </div>
      </div>
    </div>

    <div class="page" v-show="!searchFlag">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" @current-change="onChange"
        @prev-click="onChange" @next-click="onChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { movies, movies_choose, keyWordSearch } from '@/api/api/movies';

export default {
  name: 'MovieList',
  data() {
    return {
      hoverEffect: null,
      moviesList: [],
      moviesListCopy: [],
      moveType: ['全部', '剧情', '犯罪', '喜剧', '动画', '奇幻', '爱情', '同性', '动作', '科幻', '冒险', '悬疑', '历史', '战争'],
      typeIndex: 0,
      search: "",
      page: 1,
      total: 0,
      searchFlag: false
    }
  },
  methods: {

    //获取所有电影列表
    getMoviesList(page) {
      movies(page)
        .then(res => {
          const { status, data, pagination } = res
          if (status == 0) {
            this.moviesList = []
            this.moviesListCopy = []
            data.forEach(item => {
              this.moviesList.push(item)
              this.moviesListCopy.push(item)
            })
            this.total = pagination.total_pages * 10
          } else {
            this.$message.error(res.msg || '电影列表获取失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkType(index) {
      this.typeIndex = index
      if (index == 0) {
        this.getMoviesList()
      } else {
        const type = this.moveType[index]
        movies_choose(type)
          .then(res => {
            const { status, data } = res
            if (status == 0) {
              this.moviesList = []
              this.moviesListCopy = []
              data.forEach(item => {
                this.moviesList.push(item)
                this.moviesListCopy.push(item)
              })
            } else {
              this.$message.error(res.msg || '电影类型列表获取失败')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    searchFunction() {
      if (this.search == "") return
      this.searchFlag = true
      keyWordSearch(this.search.toString())
        .then(res => {
          const { status, data } = res
          if (status == 0) {
            this.moviesListCopy = []
            data.forEach(item => {
              this.moviesListCopy.push(item)
            })
          } else {
            this.$message.error(res.error || '搜索失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    goTodetails(id) {
      this.$router.push(`/detailsWeb?id=${id}`)
    },
    backall() {
      if (this.search == "") {
        this.searchFlag = false
        this.moviesListCopy = []
        this.moviesList.forEach(item => {
          this.moviesListCopy.push(item)
        })
      }
    },
    onChange(e) {
      this.page = e
      this.getMoviesList(this.page)
    },
  },

  created() {
    this.getMoviesList(this.page)
  }
}
</script>

<style scoped>
.page {
  width: fit-content;
  margin: 10px auto;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  padding: 20px;
}

.movie-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.poster-wrapper {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;

}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 10px;
}

.movie-title {
  margin: 15px;
  font-size: 18px;
  text-align: center;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;


}

.movie-list-page {
  max-width: 100%;
  margin: 0 auto;
  padding: 50px 10%;
  font-family: 'Arial', sans-serif;
  background-color: rgb(232, 245, 255);
  min-height: 100vh;

}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search-text {
  width: 100px;
  height: 40px;
}

input {
  width: 95%;
  padding: 12px 20px;
  border: 1px solid #eaeaea;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
}

input {
  padding-left: 50px;
}

.category-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.category-tabs {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  /* 隐藏滚动条 Firefox */
  -ms-overflow-style: none;
  /* 隐藏滚动条 IE/Edge */

}

.category-tab:hover {
  color: white;
  background-color: #79b4f7bf;
  transform: translateY(-1px);
  border: 1px solid white;

}

.category-tabs::-webkit-scrollbar {
  display: none;
  /* 隐藏滚动条 Chrome/Safari */
}

.category-tab {
  padding: 8px 20px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: #f5f5f5;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
  border: 1px solid gainsboro;
}

.category-tab.active {
  background-color: #4a90e2;
  color: white;
}

.year-filter {
  position: relative;
}

.year-dropdown {
  padding: 8px 20px;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  background-color: white;
}

.year-filter :hover {
  color: white;
  background-color: #72b3fe;
}

.dropdown-icon {
  width: 10px;
  height: 10px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #666;
  margin-left: 8px;
}

.year-options {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  margin-top: 5px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.year-option {
  padding: 10px 15px;
  cursor: pointer;
}

.year-option:hover {
  background-color: #f5f5f5;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

@media (max-width: 992px) {
  .movies-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .movies-grid {
    grid-template-columns: 1fr;
  }
}

.movie-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-poster {
  width: 100%;
  height: 0;
  padding-bottom: 150%;
  /* 2:3 的宽高比 */
  background-color: #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
}

.movie-title {
  font-size: 16px;
  margin: 10px 7px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  /* 改为 flex 布局 */
  align-items: center;
  /* 垂直居中 */
}

.movie-rating {
  display: flex;
  /* 改为 flex 布局 */
  flex-direction: column;
  /* 垂直排列子元素 */
  align-items: flex-start;
  /* 子元素左对齐 */
}

.rating-stars {
  display: flex;
  margin-right: 0;
  /* 移除右边距 */
  margin-bottom: 5px;
  /* 增加底部边距 */
  margin-left: 7px;

}

.star {
  width: 14px;
  height: 14px;
  margin-right: 2px;
  background-color: #ddd;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.star.filled {
  background-color: #ffb400;
}

.rating-score {
  color: #ffb400;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.page-number.active {
  background-color: #4a90e2;
  color: white;
}

.page-nav {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin: 0 5px;
  cursor: pointer;
  user-select: none;
  border: 1px solid gainsboro;
}

.page-nav.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow-icon {
  width: 10px;
  height: 10px;
  border-top: 2px solid #666;
  border-right: 2px solid #666;
}

.arrow-icon.left {
  transform: rotate(-135deg);

}

.arrow-icon.right {
  transform: rotate(45deg);
}
</style>