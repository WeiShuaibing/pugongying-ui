<template>
  <div class="app-container" style="width: 70%;margin: 0 auto;">
    <!--轮播图设置-->
    <h2>轮播图设置：</h2>
    <div>
      <el-upload
        class="upload-demo"
        :limit="5"
        accept=".jpg, .png"
        :action="upload.url"
        :headers="upload.headers"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleLunboRemove"
        :on-success="handleLunboFileSuccess"
        :file-list="lunboFileList"
        list-type="picture-card">
        <el-button size="small" type="primary" v-hasPermi="['system:lunbo:add']">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb (最多5张)</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

    <!--学员优秀作品展示-->
    <el-divider></el-divider>
    <h2>学员作品展示：</h2>
    <div>
      <el-upload
        class="upload-demo"
        :limit="10"
        accept=".jpg, .png"
        :action="upload.url"
        :headers="upload.headers"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleStuimgRemove"
        :on-success="handleStuimgFileSuccess"
        :file-list="studentFileList"
        list-type="picture-card">
        <el-button size="small" type="primary" v-hasPermi="['system:lunbo:add']">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb (最多10张)</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

    <!--基础信息展示-->
    <el-divider></el-divider>
    <div>
      <h2>基础信息设置：</h2>
      <div>
        <el-row>
          <el-col :span="3">
            <span style="line-height: 2">
              专业的素质美术教育：
            </span>
          </el-col>
          <el-col :span="9">
            <el-input v-model="suzhijiaoyu" placeholder="请输入内容" type="textarea"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="margin-left: 10px;margin-top: 30px;">
              <el-button type="primary" @click="updateHomeinfo('suzhijiaoyu')">保存</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 10px;">
          <el-col :span="3">
            <span style="line-height: 2">
              强大的师资力量：
            </span>
          </el-col>
          <el-col :span="9">
            <el-input v-model="shizililiang" placeholder="请输入内容" type="textarea"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="margin-left: 10px;margin-top: 30px;">
              <el-button type="primary" @click="updateHomeinfo('shizililiang')">保存</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--课程图片设置-->
    <div>

    </div>



  </div>
</template>

<script>
  import { getToken } from "@/utils/auth";
  import { listLunbo, addLunbo, delLunbo } from '@/api/system/lunbo'
  import { listStudentimg, addStudentimg, delStudentimg } from '@/api/system/studentimg'
  import { listHomeinfo, updateHomeinfo } from '@/api/system/homeinfo'

  export default {
  name: "Appointment",
  data() {
    return {
      upload: {
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/file/upload"
      },
      lunboFileList: [],
      studentFileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      suzhijiaoyu: '', // 专业的素质教育
      shizililiang: '' // 师资力量
    };
  },
  created() {
    this.listLunbo();
    this.listStudentimg()
    this.listHomeinfo()
  },
  methods: {
    updateHomeinfo(type) {
      var text = ''
      if (type === 'suzhijiaoyu') {
        text = this.suzhijiaoyu
      }
      if (type === 'shizililiang') {
        text = this.shizililiang
      }
      updateHomeinfo({ type, text }).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功！")
        } else {
          this.$message.error("保存失败，请重试")
        }
      })
    },
    listHomeinfo() {
      listHomeinfo().then(res => {
        res.rows.forEach(item => {
          if (item.type === 'suzhijiaoyu') {
            this.suzhijiaoyu = item.text
          }
          if (item.type === 'shizililiang') {
            this.shizililiang = item.text
          }
        })
      })
    },
    listLunbo() {
      listLunbo({}).then(res => {
        res.rows.forEach(item => {
          item.url = process.env.VUE_APP_BASE_API + item.url
        })
        this.lunboFileList = res.rows
      })
    },
    listStudentimg() {
      listStudentimg({}).then(res => {
        res.rows.forEach(item => {
          item.url = process.env.VUE_APP_BASE_API + item.url
        })
        this.studentFileList = res.rows
      })
    },
    handleLunboRemove(file, lunboFileList) {
      if (!file.id) {
        this.$message.warning("请刷新页面并重试！")
      } else {
        delLunbo(file.id).then(res => {
          if (res.code !== 200) {
            this.$message.error("删除失败，请重试！")
          }
        })
      }
    },
    handleStuimgRemove(file, fileList) {
      if (!file.id) {
        this.$message.warning("请刷新页面并重试！")
      } else {
        delStudentimg(file.id).then(res => {
          if (res.code !== 200) {
            this.$message.error("删除失败，请重试！")
          }
        })
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePreview(file) {
    },
    // 轮播文件上传成功处理
    handleStuimgFileSuccess(response, file, fileList) {
      // 保存图片
      addStudentimg({url: response.data.path}).then(res => {
        if (res.code === 200) {
          this.$message.success("上传成功！")
        } else {
          this.$message.error("上传失败，请重试")
        }
      })
    },
    // 轮播文件上传成功处理
    handleLunboFileSuccess(response, file, lunboFileList) {
      // 保存图片
      addLunbo({url: response.data.path}).then(res => {
        if (res.code === 200) {
          this.$message.success("上传成功！")
        } else {
          this.$message.error("上传失败，请重试")
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  .upload-demo {
    padding: 20px;
  }
</style>
