<template>
  <div class="main">
    <!-- 正在热映区块 -->
    <div class="ing">
      <div class="bt1">正在热映</div>
      
    </div>
    <!-- 热映电影列表 -->
    <div class="movie-container">
      <div class="movie-grid">
        <div 
          v-for="movie in movies" 
          :key="movie.id" 
          class="movie-card"
          @mouseover="hoverEffect = movie.id"
          @mouseleave="hoverEffect = null"
          @click="goTodetails"
        >
          <div class="poster-wrapper">
            <img 
              :src="movie.poster" 
              :alt="movie.title"
              class="poster"
              
              :style="{ transform: hoverEffect === movie.id ? 'scale(1.05)' : 'none' }"
            >
            <div class="rating-badge">⭐ {{ movie.rating }}</div>
          </div>
          <h3 class="movie-title">{{ movie.title }}</h3>
        </div>
      </div>
    </div>
    <!-- 经典回顾区块 -->
    <div class="ing">
      <div class="bt1">经典回顾</div>

      <!-- 点击全部跳转影片页面 -->
      <div 
                  v-for="(item, index) in allItems"
                  :key="index"
                  class="all-item"
                  
                  @click="allClick"
              >
                  {{ item.title }}
              </div>
    </div>
    <!-- 经典电影列表 -->
    <div class="movie-container">
      <div class="movie-grid">
        <div 
          v-for="(movie,index) in classicMovies" 
          :key="index" 
          class="movie-card"
          @mouseover="hoverEffect = movie.id"
          @mouseleave="hoverEffect = null"
          @click="goTodetails"
        >
          <div class="poster-wrapper">
            <img 
              :src="movie.poster" 
              :alt="movie.title"
              class="poster"
              
              :style="{ transform: hoverEffect === movie.id ? 'scale(1.05)' : 'none' }"
            >
            <div class="rating-badge">⭐ {{ movie.rating }}</div>
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
export default {
  data() {
    return {
      hoverEffect: null,
      // 热映电影数据
      allItems:[
        {
           title: '全部>', path: '/moviesWeb' 
        }
      ],
      movies: [
        {
          id: 1,
          title: '肖申克的救赎',
          poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
          rating: 9.7
        },
        // 其他热映电影...
      ],
      // 新增经典电影数据
      classicMovies: [
        {
          id: 10,
          title: '泰坦尼克号',
          poster: 'http://121.40.144.56/static/posters/titanic.jpg',
          rating: 9.4
        },
        {
          id: 11,
          title: '阿甘正传',
          poster: 'http://121.40.144.56/static/posters/forrest_gump.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        {
          id: 12,
          title: '这个杀手不太冷',
          poster: 'http://121.40.144.56/static/posters/leon.jpg',
          rating: 9.5
        },
        // 继续添加更多经典电影...
      ]
    }
  },
  // 点击全部跳转影片页面
  methods:{
    allClick(){
      console.log(111);
      
      this.$router.push('/moviesWeb')
    },
    goTodetails(){
      this.$router.push('/detailsWeb')
    }
   
  }
}
</script>

  
  <style >
  /* 基础样式只受当前页面影响 */
  body{
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
  .btm{
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
  
  .bt1 { font-size: 4.5vh; font-weight: bold; }
  .all-item{
    font-size: 2vh;
    margin-right: 3%;
    padding-top: 3%;
    cursor: pointer;
  }
  .all-item:hover{
    color: #848484;
    transform: translateY(-2px);
  }

.bt2 a {
  color: #000000; /* 链接主色 */
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
    grid-template-columns: repeat(5,1fr);
    gap: 30px;
    padding: 20px;
  }
  
  .movie-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 14px;
  
  }
  
  .movie-title {
    margin: 15px;
    font-size: 18px;
    text-align: center;
    color: #333;
 
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
  