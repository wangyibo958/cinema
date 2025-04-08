<template>
  <div class="main">
    <!-- 正在热映区块 -->
    <!-- <div class="ing">
      <div class="bt1">正在热映</div>

    </div> -->
    <!-- 热映电影列表 -->
    <!-- <div class="movie-container">
      <div class="movie-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card" @mouseover="hoverEffect = movie.id"
          @mouseleave="hoverEffect = null" @click="goTodetails">
          <div class="poster-wrapper">
            <img :src="movie.poster" :alt="movie.title" class="poster"
              :style="{ transform: hoverEffect === movie.id ? 'scale(1.05)' : 'none' }">
            <div class="rating-badge"> {{ movie.rating }}</div>
          </div>
          <h3 class="movie-title">{{ movie.title }}</h3>
        </div>
      </div>
    </div> -->



    <!-- 经典回顾区块 -->
    <div class="ing">
      <div class="bt1">经典回顾</div>

      <!-- 点击全部跳转影片页面 -->
      <div v-for="(item, index) in allItems" :key="index" class="all-item" @click="allClick">
        {{ item.title }}
      </div>
    </div>
    <!-- 经典电影列表 -->
    <div class="movie-container">
      <div class="movie-grid">
        <div v-for="(movie, index) in movies" :key="index" class="movie-card" @mouseover="hoverEffect = movie.id"
          @mouseleave="hoverEffect = null" @click="goTodetails(movie.id)">
          <!-- 携带路径id -->
          <div class="poster-wrapper">
            <img :src="movie.poster" :alt="movie.title" class="poster"
              :style="{ transform: hoverEffect === movie.id ? 'scale(1.05)' : 'none' }">
            <div class="rating-badge"> {{ movie.rating }}</div>
          </div>
          <h3 class="movie-title">{{ movie.title }}</h3>
        </div>
      </div>
    </div>

    <div class="btm">

    </div>
  </div>
</template>
<script>
import { movies } from '@/api/api/movies';
export default {
  data() {
    return {
      hoverEffect: null,
      // 热映电影数据
      allItems: [
        {
          title: '全部>', path: '/moviesWeb'
        }
      ],
      movies: [],
      classicMovies: []
    }
  },

  methods: {



    allClick() {


      this.$router.push('/moviesWeb')
    },
    goTodetails(id) {
      this.$router.push('/detailsWeb')
    }//传参  id  待修改

  },


  created() {
    this.loading = true
    movies()
      .then(res => {
        console.log('完整响应', res)
        const response = res
        const { status, data } = response
        if (status == 0) {
          this.movies = data.map(item => ({
            id: item.movie_id,
            title: item.mv_name,
            rating:item.mv_type,
            poster:item.image_link,
          }))
          
// // 在created回调中添加调试代码
// setTimeout(() => {
//   console.log('首图地址:', this.movies[0]?.poster)
//   console.log('首图DOM:', document.querySelector('.poster')?.src)
// }, 1000)



        } else {
        console.error('接口返回错误:', res.msg)
          this.$message.error(res.msg || '数据加载失败')

        }
      })

      .catch(err => {
        console.log(err);

      })


      .finally(() => {
        this.loading = false
      })

  }
}







</script>


<style>
/* 基础样式只受当前页面影响 */
body {
  background-color: rgb(232, 245, 255);
}

.main {
  width: 80%;
  margin-left: 10%;
  background-color: rgb(232, 245, 255);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;


}

.btm {
  width: 80%;
  margin-left: 10%;
  background-color: rgb(232, 245, 255);
  height: 90px;
}

.ing {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  margin-top: 30px;
}

.bt1 {
  font-size: 4.5vh;
  font-weight: bold;
}

.all-item {
  font-size: 2vh;
  margin-right: 3%;
  padding-top: 3%;
  cursor: pointer;
}

.all-item:hover {
  color: #848484;
  transform: translateY(-2px);
}

.bt2 a {
  color: #000000;
  /* 链接主色 */
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 5px 8px;
  border-radius: 4px;
}

.bt2 a:hover {
  color: #848484;


}


/* 网格布局方案 */
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

/* 横向滚动布局方案（备用）
  .movie-scroll {
    display: flex;
    overflow-x: auto;
    padding: 20px;
    gap: 20px;
  }
  
  .movie-item {
    flex: 0 0 180px;
  }
  
  .scroll-poster {
    width: 180px;
    height: 270px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .scroll-title {
    margin: 10px 0;
    font-size: 14px;
    text-align: center;
  }
   */
/* 响应式设计 */
@media (max-width: 768px) {
  .main {
    width: 100%;
    /* margin-left: 5%; */
  }

  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
</style>