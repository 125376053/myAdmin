<template>
    <div>
        <el-upload
            :action="this.baseUrl+'/api/uploadFileId'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-upload
            class="avatar-uploader"
            action="http://admin.cpm66.com/api/uploadFileId"
            :show-file-list="false"
            :http-request="sendAjaxUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-progress v-if="show" type="circle" :percentage="man" :show-text="true" :width="200" :stroke-width="10"></el-progress>
    </div>
</template>
<script>
    import qs from 'qs';
    export default {
        data() {
            return {
                man:0,
                show:false,
                fileList: [
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    },
                    {
                        name: 'food2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }
                ],
                imageUrl: ''
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            //自己处理上传
            sendAjaxUpload($event){
                var that=this;
                that.show=true;

                //发生ajax
                //console.log($event.file)
                this.imageUrl = URL.createObjectURL($event.file);
                let formData = new FormData();
                formData.append('file', $event.file);//第一张图片
                this.$http({
                    method: 'post',
                    url: 'http://waterapi.qijiatech.com/api/Common/UploadFile?ticket=BF96EE57B93DE820E69F18217919EB8914128F7B38E82C12DB0FF84BA598E9237011785C5A768CA59D8E918580E5EBADB7C2466578C25A5F37C7FA0500151132163C8CE61E849B6725CCA15184499B4486FE8509C0AECC111F038FD6450471E2F78E4442B41EB31DB71CC3AFA141D7D74F0546014D9766CD8FDAA48DB32047464146A7DD4C03029014FE7E3610B2534C7D8226AA54CA722C94468FC7A5D3616BDC359D756A99D69CE63F358B5895E26F',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress(progressEvent){
                        if (progressEvent.lengthComputable) {
                            let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
                            //that.formData.showProgress = true;
                            //that.formData.startValue = parseInt(val)
                            console.log(val);
                            that.man=parseInt(val);
                        }
                    }
                }).then(function (response) {
                    setTimeout(()=>{
                        that.show=false
                    },2000)
                }).catch(function (error) {
                    setTimeout(()=>{
                        that.show=false
                    },2000)
                })
            }
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
