/**
 * Created by ZPP on 2017/3/19.
 */
const express = require('express');
const neteaseMusicApi = require('neteaseMusicApi');
const app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
   next();
});
//热门歌单
app.use('/topPlaylists',(req,res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;
  console.log("请求来了");
  neteaseMusicApi.topPlaylists((data) => {
    res.send(data);
  },limit,offset);
});
//根据id获取歌单
app.use('/playlists',(req,res) =>{
  console.log('来获取歌单了');
  let id = req.query.id;
  neteaseMusicApi.playlists(id,(data) => {
    res.send(data);
  });
});
//用户歌单
app.use('/userPlaylists',(req,res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;
  let uid = req.query.uid;
  neteaseMusicApi.userPlaylists(uid,(data) => {
    res.send(data);
    console.log(data);
  },limit,offset);
});
//用户搜索
app.use('/search',(req,res) => {
  console.log('用户开始搜索');
  let name = req.query.name;
  let limit = req.query.limit;
  let offset = req.query.offset;
  neteaseMusicApi.search(name, (data) => {
    res.send(data);
    // console.log(data);
  },limit,offset);
});
//获取歌词
app.use('/lrc',(req, res) => {
  console.log("请求歌词");
  let id = req.query.id;
  neteaseMusicApi.lrc(id, (data) => {
    res.send(data);
  });
});
//获取用户歌单
app.use('/userPlaylists', (req, res) => {
  let uid = req.query.uid;
  neteaseMusicApi.userPlaylists(uid, (data) => {
    res.send(data);
  });
});
//热门歌手列表
app.use('/hotartist', (req, res) => {
  neteaseMusicApi.hotArtist((data) => {
    res.send(data);
  });
});
app.listen(5000);
