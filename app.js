const express=require('express');
// const cors=require('corss');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'food',
    connectionLimit: 15
    // host: process.env.MYSQL_HOST,
    // port:process.env.MYSQL_PORT,
    // user: process.env.ACCESSKEY,
    // password: process.env.SECRETKEY,
    // database: 'app_' + process.env.APPNAME,
    // connectionLimit:5
});
const server = express();

server.all('*', function(req, res, next) {
    　　//设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", "*");
    　　//允许的header类型
        res.header('Access-Control-Allow-Headers', 'Content-type');
    　　//跨域允许的请求方式
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");　
        next(); 
    });

server.use(bodyParser.urlencoded({
    extended: false
}));


// 商城详情表
server.get('/basefood',(req,res)=>{
    let sql="select*from basefood";
    pool.query(sql,(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})

// 通过商品ID进行查询商品价格详情
server.get('/shoppingpage',(req,res)=>{
    let fid=req.query.fid;
    let sql="select*from basefood where fid=?";
    pool.query(sql,[fid],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})

// 确认订单后清除购物车所提交的商品
server.get('/del_carts',(req,res)=>{
    let cid=req.query.cid;
    let del="DELETE FROM carts WHERE cid=?";
        pool.query(del,[cid],(err,results)=>{
            if(err) throw err;
            if (results.affectedRows == 1) {
                res.send({ message: '删除成功', code: 1});
            } else {
                res.send({ message: '删除失败', code: 0 });
            }
        })
})

// 查询当前用户的购物车所有商品
server.get('/carts',(req,res)=>{
    let uid=req.query.cuid;
    let sql="select*from carts where cuid=?";
    pool.query(sql,[uid],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})
// 减少购物车数量
server.get('/carts_minus',(req,res)=>{
    let cbaseid=req.query.cbaseid;
    let cid=req.query.cid;
    let cnum=parseInt(req.query.cnum)-1;
    let sql="select*from carts where cbaseid=? and cid=?";
    pool.query(sql,[cbaseid,cid],(err,results)=>{
        if(err) throw err;
        let up= "UPDATE carts SET cnum=? where cid=?";
        pool.query(up,[cnum,cid],(err,updata)=>{
            if(err) throw err;
            if(results.length==1){
                res.send({message:'成功',code:1});
            }
            if(results.length==0){
                res.send({message:'失败',code:0});
            }
         })
    })
})
// 增加购物车数量
server.get('/carts_plus',(req,res)=>{
    let cbaseid=req.query.cbaseid;
    let cid=req.query.cid;
    let cnum=parseInt(req.query.cnum)+1;
    let sql="select*from carts where cbaseid=? and cid=?";
    pool.query(sql,[cbaseid,cid],(err,results)=>{
        if(err) throw err;
        let up= "UPDATE carts SET cnum=? where cid=?";
        pool.query(up,[cnum,cid],(err,updata)=>{
            if(err) throw err;
            if(results.length==1){
                res.send({message:'成功',code:1});
            }
            if(results.length==0){
                res.send({message:'失败',code:0});
            }
         })
    })
})

// 删除购物车商品
server.get('/carts_del',(req,res)=>{
    let cid=req.query.cid;
    console.log(cid);
    let del="DELETE FROM carts WHERE cid=?";
    pool.query(del,[cid],(err,results)=>{
        if(err) throw err;
        if (results.affectedRows == 1) {
            res.send({ message: '删除成功', code: 1});
        } else {
            res.send({ message: '删除失败', code: 0 });
        }
    })
})

// 从商品详情页添加到购物车
server.get('/addcarts',(req,res)=>{
    let obj=req.query;
    let cunm=obj.cnum;
    let cbaseid=obj.cbaseid;
    let uid=obj.cuid;
    // 查询商品是否存在
    let sql="select*from carts where cbaseid=? and cuid=?"; 
    pool.query(sql,[cbaseid,uid],(err,data)=>{
        if(err) throw err;
        // console.log(data);
        if(data.length==1){
            // 存在修改数量
          let up= "UPDATE carts SET cnum=? where cbaseid=?";
          pool.query(up,[cunm,cbaseid,uid],(err,updata)=>{
             if(err) throw err;
          })
        }
        if(data.length==0){
            // 不存在添加该商品
            let ins='insert into carts set ?';
            pool.query(ins,[obj],(err,results)=>{
                if(err) throw err;
            })
        }
    })
})



// 个人作品表
server.get('/personall',(req,res)=>{
    let sql="select*from personal"; 
    pool.query(sql,(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})


// 首页详情
server.get('/index',(req,res)=>{
    let id=parseInt(req.query.active)+1;
    let sql="select*from details where cid=?";
    pool.query(sql,[id],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})

// 菜谱类型表
server.get('/order',(req,res)=>{
    let sql="select*from types";
    pool.query(sql,(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})

// // 根据菜谱类型
server.get('/cookbook_top',(req,res)=>{
    let tid=parseInt(req.query.tid)
    let sql="select*from types where tid=?" ;
    pool.query(sql,[tid],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})

// 菜谱详情表
server.get('/cookbook',(req,res)=>{
    let tid=parseInt(req.query.tid)
    let sql="select*from  details where types_tid=?";
    pool.query(sql,[tid],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})


// 做菜的步骤
server.get('/step',(req,res)=>{
    let did=parseInt(req.query.did);
    let sql="select*from details where did=?";
    pool.query(sql,[did],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})



//查询用户是否存在，存在该用户不能注册
server.post('/reg',(req,res)=>{
    let username=req.body.username;
    let sql="select*from users where username=?";
    pool.query(sql,[username],(err,data)=>{
       if(err) throw err;
       if(data.length==1){
           res.send({massage:'该用户已经存在，请重新输入',code:1})
       }
       if(data.length==0){
        res.send({code:0})
       }
   })
})
// 用户注册
server.post('/regsiter',(req,res)=>{
    let obj=req.body;
    let ins='insert into users set ?';
    pool.query(ins,[obj],(err,results)=>{
        if(err) throw err;
        if (results.affectedRows == 1) {
            res.send({ message: '注册成功', code: 1});
        } else {
            res.send({ message: '注册失败', code: 0 });
        }
    })
})
// 用户登录
server.post('/login',(req,res)=>{
    let username=req.body.username;
    let pwd=req.body.password;
    let sql="select*from users where username=? and pwd=?";
    pool.query(sql,[username,pwd],(err,results)=>{
        if(err) throw err;
        if(results.length==1){
            res.send({message:'登录成功',code:1,results:results});
        }
        if(results.length==0){
            res.send({message:'登录失败',code:0});
        }
    })
})

//用户填写地址
server.post('/addr',(req,res)=>{
    let obj=req.body;
    let ins='insert into address set ?';
    pool.query(ins,[obj],(err,results)=>{
        if(err) throw err;
        if (results.affectedRows == 1) {
            res.send({ message: '提交成功', code: 1});
        } else {
            res.send({ message: '提交失败', code: 0 });
        }
    })
})
// 修改地址
server.put('/updataAddr',(req,res)=>{
    let {aUname,aTel,addr,aid}=req.body;
    let up= "UPDATE address SET aUname=?,aTel=?,addr=? where aid=?";
    pool.query(up,[aUname,aTel,addr,aid],(err,results)=>{
        if(err) throw err;
       if(results.affectedRows>0){
        res.send({ message: '修改成功', code: 1});
       }else{
        res.send({ message: '修改失败', code: 0 });
       }
    })
})
// 查询地址
server.get('/addree',(req,res)=>{
    let uid=req.query.uid;
    let sql="select*from address where addr_uid=?";
    pool.query(sql,[uid],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})

// 删除地址
server.delete('/delAddr',(req,res)=>{
    let {addr_uid,aid}=req.query;
    let del="DELETE FROM address WHERE addr_uid=? and aid=?";
        pool.query(del,[addr_uid,aid],(err,results)=>{
            if(err) throw err;
            if (results.affectedRows == 1) {
                res.send({ message: '删除成功', code: 1});
            } else {
                res.send({ message: '删除失败', code: 0 });
            }
        })
})


// 订单表image，price，title，num，order_number等
server.get('/orderdetail',(req,res)=>{
    let obj=req.query;
        let ins='insert into orderdetail set ?';
        pool.query(ins,[obj],(err,results)=>{
            if(err) throw err;
        })
})


//查询订单图片、单价、数量等
server.get('/myorder',(req,res)=>{
    let uid=req.query.uid;
    let sql="select*from  orderdetail where o_uid=?";
        pool.query(sql,[uid],(err,results)=>{
            if(err) throw err;
            res.send(results);
        })
})




// 订单表的删除
server.get('/del',(req,res)=>{
    let fid=req.query.fid;
    let del="DELETE FROM orderdetail WHERE base_id=?";
        pool.query(del,[fid],(err,results)=>{
            if(err) throw err;
            if (results.affectedRows == 1) {
                res.send({ message: '删除成功', code: 1});
            } else {
                res.send({ message: '删除失败', code: 0 });
            }
        })
})


// 插入订单编号、总价、地址、时间等
server.get('/list',(req,res)=>{
        let obj=req.query;
        let ins='insert into orders set ?';
        pool.query(ins,[obj],(err,results)=>{
            if(err) throw err;
        })
})

// 搜索
server.get('/search',(req,res)=>{
    let food='%'+req.query.title+'%';
    let sql="select*from  details where  dish  like ?"
    pool.query(sql,[food],(err,results)=>{
        if(err) throw err;
        res.send(results);
    })
})
server.listen(5050,()=>{
    console.log('服务器');
});