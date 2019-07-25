<template>
  <div class="site">
    <div class="site-s">
      <input type="text"
             v-model="inpValue"
             placeholder="请输入站点">
      <a-button type="primary"
                icon="search"
                @click="searchBtn">
      </a-button>
    </div>
    <div class="site-table">
      <div class="operatBtn">
        <a-button type="primary">
          <a-icon type="plus-circle" /> 添加
        </a-button>
        <a-select defaultValue="新闻"
                  style="width: 80px"
                  @change="handleChange">
          <a-select-option value="0">新闻</a-select-option>
          <a-select-option value="1">论坛</a-select-option>
        </a-select>
        <a-switch checkedChildren="可采集"
                  unCheckedChildren="未采集"
                  @change="statusChange"/>
      </div>
      <Table :obj="{'columns': columns, 'tabdata': tabdata,
              'pagination': pagination, 'loading': loading}"
              @rowClick="childTable"
              >
      </Table>
    </div>
  </div>
</template>

<script>
import Table from '../../../common/table'
export default {
  name: 'Site',
  components: {
    Table
  },
  data () {
    return {
      columns: [
        {
          title: '网站名称',
          dataIndex: 'webSite',
          width: '15%'
        }, {
          title: '网址',
          dataIndex: 'address',
          width: '20%'
        }, {
          title: '网站状态',
          scopedSlots: { customRender: 'status' },
          // customRender: (text, row, index) => {
          //   // console.log(text, row, index)
          //   if (text.status === 0) {
          //     return <a-switch checkedChildren="可采集" unCheckedChildren="未采集"/>
          //   } else {
          //     return <a-switch checkedChildren="可采集" unCheckedChildren="未采集" defaultChecked/>
          //   }
          // },
          customCell: function (record, rowIndex) {
          },
          width: '10%'
        }, {
          title: '网站类型',
          customRender: (text, row, index) => {
            return text.sort === 0 ? '新闻' : '论坛'
          },
          width: '15%'
        }, {
          title: '备注',
          scopedSlots: {customRender: 'remark'},
          // customRender: (text, row, index) => {
          //   return <input type="text"/>
          // },
          width: '30%'
        }
      ],
      tabdata: [],
      pagination: {},
      loading: false,
      inpValue: '',
      searchObj: {page: 1, limit: 10}
    }
  },
  mounted () {
    this.siteAll(this.searchObj)
    // this.switchBtn()
  },
  methods: {
    childTable (pid) {
      let url = `/api/web/select_all?page=1&limit=10&pid=${pid}&status=&checked=`
      this.$http.get(url).then(res => {
        console.log(res)
      })
    },
    // 类别查询
    handleChange (e) {
      this.searchObj.sort = e
      this.siteAll(this.searchObj)
    },
    // 状态查询
    statusChange (e) {
      this.searchObj.status = e - 0
      this.siteAll(this.searchObj)
    },
    // 所有站点查询
    siteAll (obj) {
      // page, sort, status, keyWord
      this.loading = true
      var str = ''
      obj.keyword = obj.keyWord || ''
      obj.sort = obj.sort || '0'
      obj.status = obj.status || 0
      for (var key in obj) {
        str += `${key}=${obj[key]}&`
      }
      var newStr = str.slice(0, -1)
      let url = `/api/web_site/select_all?` + newStr
      this.$http.get(url).then(res => {
        if (res.status === 200) {
          var data = res.data.data
          var count = res.data.count
          var obj = {}
          obj.total = count
          this.pagination = obj
          this.tabdata = data
          this.loading = false
        }
      }, reject => {
        console.log(reject)
      })
    },
    // 找点查询按钮
    searchBtn () {
      this.siteAll(1, this.sort, this.state, this.inpValue)
    }
  }
}
</script>

<style lang="stylus" scoped>
.site {
  .site-s {
    height: 60px;
    line-height: 60px;
    text-align: center;

    input {
      height: 34px;
      border: 1px solid #ccc;
      text-indent: 0.2rem;
    }
  }

  .site-table {
    height: 60px;
    line-height: 60px;

    .operatBtn {
      padding-left: 30px;

      .add-sel {
        margin: 0 10px;
      }
    }
  }
}
</style>
