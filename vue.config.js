module.exports={
    chainWebpack:config=>{
        config.plugins.delete("prefetch") //取消异步延迟下载
    }
}
