<template>
  <div class="home">
    <a-layout-header class="hd-tit">
      <div class="name">
        <span>爬虫管理系统</span>
        <a-icon class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="()=> collapsed = !collapsed" />
      </div>
      <div class="account">
        <a-dropdown>
          <a-menu slot="overlay"
                  @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="user" />个人信息</a-menu-item>
            <a-menu-item key="2">
              <a-icon type="user" />账户切换</a-menu-item>
            <a-menu-item key="3">
              <a-icon type="user" />退出</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            admin
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider :trigger="null"
                      collapsible
                      v-model="collapsed">
        <a-menu
          mode="inline"
          theme="dark"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
          >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user"/><span v-if="!collapsed">网址管理</span></span>
            <a-menu-item key="1">站点管理</a-menu-item>
            <a-menu-item key="2">网址监测</a-menu-item>
            <a-menu-item key="3">网址列表</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop"/><span v-if="!collapsed">爬虫管理</span></span>
            <a-menu-item key="5">在启动爬虫任务列表</a-menu-item>
            <a-menu-item key="6">待启动爬虫任务列表</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{ margin: '24px 16px', padding: 0, background: '#fff', minHeight: '280px' }">
          <Site></Site>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Site from '../UrlManage/siteM/site'
export default {
  name: 'Home',
  components: {
    Site
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    handleButtonClick (e) {
      console.log('click left button', e)
    },
    handleMenuClick (e) {
      console.log('click', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
.home {
  position: relative;
  height: 100%;
  width: 100%;

  .hd-tit {
    position: absolute;
    left: 0;
    top: 0;
    height: 65px;
    width: 100%;
    background-color: #fff;

    .name {
      float: left;
    }

    .account {
      float: right;
    }
  }
}

#components-layout-demo-custom-trigger {
  width: 100%;
  height: 100%;
  padding-top: 65px;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
