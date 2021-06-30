<template>
  <div>
    <van-nav-bar
      fixed
      title="消息中心"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无任何消息"
    />
  </div>
</template>

<style scoped>
.custom-image {
  margin-top: 120px;
}
</style>