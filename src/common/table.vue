<template>
  <div class="data-table">
    <a-table :rowSelection="rowSelection"
             :columns="obj.columns"
             :pagination="obj.pagination"
             :loading="obj.loading"
             :rowKey="record => record.pid"
             :dataSource="obj.tabdata"
             :customRow="(res) => {
               return {
                 on: {
                   click: (e) => {
                     this.rowHandler(e,res)
                   }
                 }
               }
             }"
             @change="handleTableChange">
      <div slot="status"
           slot-scope="text, record, index"
           @click.stop="bubbling">
        <a-switch checkedChildren="可采集"
                  unCheckedChildren="未采集"
                  :defaultChecked="text.status == '1'"
                  @change="switchBtn(text, record, index)" />
      </div>
      <input type="text"
             slot="remark"
             @keyup.enter="remarkHandler(text)"
             :value="text.remark"
             slot-scope="text, record, index">
    </a-table>
    <div class="modal-tab">
      <a-modal title="Modal"
               v-model="visible"
               okText="确认"
               width="75%"
               :centered= true
               cancelText="取消">
        <a-table :rowSelection="rowSelection"
                 :columns="obj.columns"
                 :pagination="obj.pagination"
                 :loading="obj.loading"
                 :rowKey="record => record.pid"
                 :dataSource="obj.tabdata"
                 @change="handleTableChange">
          <div slot="status"
               slot-scope="text, record, index"
               @click.stop="bubbling">
            <a-switch checkedChildren="可采集"
                      unCheckedChildren="未采集"
                      :defaultChecked="text.status == '1'"
                      v-model="switchState"
                      @change="switchBtn(text, record, index)" />
          </div>
          <input type="text"
                 slot="remark"
                 @keyup.enter="remarkHandler(text)"
                 :value="text.remark"
                 slot-scope="text, record, index">
        </a-table>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['obj'],
  data () {
    return {
      pagination: {},
      visible: false,
      switchState: null,
      status: 0
    }
  },
  mounted () {
  },
  methods: {
    rowHandler (e, res) {
      let pid = res.pid
      this.$emit('rowClick', pid)
      this.visible = true
    },
    // 下拉框选中改变事件
    handleTableChange (pagination, filters, sorter) {
      var obj = this.$parent.searchObj
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      obj.page = pager.current
      this.$parent.siteAll(obj)
    },
    // 状态按钮改变事件
    switchBtn (text, record, index) {
      // console.log(event.target.innerText)
      var status = event.target.innerText === '可采集' ? 0 : 1
      this.status = status
      console.log(this.status)
      // console.log(text.remark)
      this.statusChange(text.pid, status)
    },
    // 状态按钮改变事件
    statusChange (pid, status) {
      console.log(pid)
      status = status + '' || null
      // remark = remark || null
      let url = `/api/web_site/update?pid=${pid}&status=${status}`
      this.$http.get(url).then((res) => {
        console.log(res)
      }, (reject) => {
        console.log(reject)
      })
    },
    // 提交备注
    remarkHandler (text) {
      let val = event.target.value
      let url = `/api/web_site/update?pid=${text.pid}&remark="${val}"`
      this.$http.get(url).then((res) => {
        console.log(res)
      }, (reject) => {
        console.log(reject)
      })
    },
    // 空事件阻止冒泡
    bubbling () {
      // console.log(1111)
    },
    // 子table的模态框
    showModal () {
      this.visible = true
    }
  },
  watch: {
    obj: {
      handler (newV, oldV) {
      },
      deep: true
    },
    switchState: {
      handler () {
        console.log(2222)
      }
    }
  },
  computed: {
    rowSelection () {
      // const selectedRowKeys = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: record => ({
          props: {
            // disabled: record.name === 'Disabled User', // Column configuration not to be checked
            // name: record.name
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
