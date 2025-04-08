<template>
  <div class="movie-list-page">
    <div class="search-bar">
      <input type="text" placeholder="搜索电影" v-model="searchQuery">
      <el-button icon="el-icon-search" circle></el-button>
    </div>

    <div class="category-filter">

      <!-- 电影类型搜索 -->
      <div class="category-tabs">
        <div v-for="(category, index) in categories" :key="index"
          :class="['category-tab', { active: activeCategory === category.value }]" @click="setCategory(category.value)">
          {{ category.label }}
        </div>
      </div>


      <!-- 年份搜索 -->
      <div class="year-filter">
        <div class="year-dropdown" @click="toggleYearDropdown">
          {{ currentYear }}
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="year-options" v-if="showYearDropdown">
          <div v-for="(year, index) in yearOptions" :key="index" class="year-option" @click="selectYear(year)">
            {{ year }}
          </div>
        </div>
      </div>
    </div>


    <!-- 电影板块 -->
    <div class="movies-grid">
      <div v-for="(movie, index) in filteredMovies" :key="index" class="movie-card" @click="goToMovieDetail(movie.id)">
        <div class="movie-poster"> <img :src="movie.poster" :alt="movie.title" class="poster"
          :style="{ transform: hoverEffect === movie.id ? 'scale(1.05)' : 'none' }"></div>
        <h3 class="movie-title">{{ movie.title }}</h3>
        <div class="movie-rating">
          <div class="rating-stars">
            <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= Math.round(movie.rating) }"></span>
            <span class="rating-score">{{ movie.rating }}</span>
          </div>

        </div>
      </div>
    </div>


    <!-- Page -->
    <div class="pagination">
      <div class="page-nav prev" @click="prevPage" :class="{ disabled: currentPage === 1 }">
        <i class="arrow-icon left"></i>
      </div>
      <div v-for="page in visiblePages" :key="page" class="page-number" :class="{ active: currentPage === page }"
        @click="goToPage(page)">
        {{ page }}
      </div>
      <div class="page-nav next" @click="nextPage" :class="{ disabled: currentPage === totalPages }">
        <i class="arrow-icon right"></i>
      </div>
    </div>
  </div>
</template>

<script>

import { movies_choose } from '@/api/api/movies';
export default {
  name: 'MovieList',
  data() {
    return {
      // searchQuery: '',
      // activeCategory: 'all',
      // currentYear: '全部年份',
      // showYearDropdown: false,
      // currentPage: 1,
      // totalPages: 5,
      // categories: [
      //   { label: '全部', value: 'all' },
      //   { label: '动作', value: 'action' },
      //   { label: '喜剧', value: 'comedy' },
      //   { label: '科幻', value: 'sci_fi' },
      //   { label: '爱情', value: 'romance' },
      //   { label: '动画', value: 'animation' },
      //   { label: '悬疑', value: 'suspense' },
      //   { label: '恐怖', value: 'horror' }
      // ],
      // yearOptions: ['全部年份', '2024', '2023', '2022', '2021', '2020', '2019', '更早'],
      movies: [
        // { id: 1, title: '星际穿越：未知的边界', rating: 4.8, category: 'sci-fi', year: '2023' },
        // { id: 2, title: '海底世界：深海探险', rating: 4.5, category: 'action', year: '2024' },
        // { id: 3, title: '时光旅人：未来纪元', rating: 4.7, category: 'sci-fi', year: '2023' },
        // { id: 4, title: '龙族传说：东方神话', rating: 4.6, category: 'animation', year: '2024' },
        // { id: 5, title: '心灵迷宫：记忆追踪', rating: 4.9, category: 'suspense', year: '2022' },
        // { id: 6, title: '未来战士：机械觉醒', rating: 4.4, category: 'action', year: '2023' },
        // { id: 7, title: '奇幻森林：魔法之源', rating: 4.3, category: 'animation', year: '2024' },
        // { id: 8, title: '都市传说：平行空间', rating: 4.7, category: 'sci-fi', year: '2022' }
      ]
    }
  },
  // computed: {
  //   filteredMovies() {
  //     let result = this.movies;

  //     // 搜索过滤
  //     if (this.searchQuery) {
  //       const query = this.searchQuery.toLowerCase();
  //       result = result.filter(movie => movie.title.toLowerCase().includes(query));
  //     }

  //     // 分类过滤
  //     if (this.activeCategory !== 'all') {
  //       result = result.filter(movie => movie.category === this.activeCategory);
  //     }

  //     // 年份过滤
  //     if (this.currentYear !== '全部年份') {
  //       result = result.filter(movie => movie.year === this.currentYear);
  //     }

  //     return result;
  //   },
  //   visiblePages() {
  //     const pages = [];
  //     let startPage = Math.max(1, this.currentPage - 2);
  //     let endPage = Math.min(this.totalPages, startPage + 4);

  //     if (endPage - startPage < 4) {
  //       startPage = Math.max(1, endPage - 4);
  //     }

  //     for (let i = startPage; i <= endPage; i++) {
  //       pages.push(i);
  //     }

  //     return pages;
  //   }
  // },
  methods: {
    // setCategory(category) {
    //   this.activeCategory = category;
    //   this.currentPage = 1;
    // },
    // toggleYearDropdown() {
    //   this.showYearDropdown = !this.showYearDropdown;
    // },
    // selectYear(year) {
    //   this.currentYear = year;
    //   this.showYearDropdown = false;
    //   this.currentPage = 1;
    // },
    // goToMovieDetail(movieId) {
    //   // 在实际应用中，这里会导航到电影详情页
    //   console.log('跳转到电影详情页，ID：', movieId);
    //   this.$router.push('/detailsWeb')
    // },
    // goToPage(page) {
    //   this.currentPage = page;
    // },
    // prevPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //   }
    // },
    // nextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //   }
    // }
  },

  created() {
    movies_choose()
      .then(res => {
        console.log(res);
        const { status, data } = res
        if (status == 0) {
          this.movies = data.map(item => ({
            title: item.mv_name,
            rating: item.d_rate,
            year: item.release_date,
            category: item.mv_type,
            poster:item.image_link


          }))
          //每页最多20页
          this.totalPages=Math.ceil(this.movies.length/20)

        }else{
          console.log(err);
          
        }


      })
      .catch(err => {
        console.log(err);


      })
  }

}
</script>

<style scoped>
.movie-list-page {
  max-width: 100%;
  margin: 0 auto;
  padding: 50px 10%;
  font-family: 'Arial', sans-serif;
  background-color: rgb(232, 245, 255);
  min-height: 100vh;

}

.search-bar {
  position: relative;
  margin-bottom: 20px;
}

input {
  width: 95%;
  padding: 12px 20px;
  border: 1px solid #eaeaea;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
}

.search-bar .el-button {
  position: absolute;
  top: 20px;
  left: 15px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
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