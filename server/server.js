const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const dgram = require('dgram');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/radar' });

let radarData = new Map(); // 用于存储雷达数据

// 创建 UDP4 服务器
const udp4Server = dgram.createSocket('udp4');
// 创建 UDP6 服务器
const udp6Server = dgram.createSocket('udp6');

// 处理 UDP 消息的通用函数
function handleUDPMessage(msg, rinfo, server) {
  try {
    const data = JSON.parse(msg);
    
    // 处理 ping 消息
    if (data.type === 'ping') {
      const response = JSON.stringify({ type: 'pong' });
      server.send(response, rinfo.port, rinfo.address);
      console.log(`已响应 ping 请求，来自 ${rinfo.address}:${rinfo.port}`);
      return;
    }
    
    // 处理测试消息
    if (data.type === 'test') {
      const response = JSON.stringify({
        type: 'test_response',
        timestamp: data.timestamp,
        status: 'received',
        echo: data.content
      });
      server.send(response, rinfo.port, rinfo.address);
      console.log(`已响应测试消息，来自 ${rinfo.address}:${rinfo.port}`);
      return;
    }
    
    // 处理雷达数据
    if (data.id) {
      radarData.set(data.id, data);
      console.log(`接收到雷达数据: ID=${data.id}`);
    }
  } catch (error) {
    console.error('UDP 数据解析错误:', error);
  }
}

// UDP4 服务器事件处理
udp4Server.on('message', (msg, rinfo) => {
  handleUDPMessage(msg, rinfo, udp4Server);
});

udp4Server.on('error', (err) => {
  console.error('UDP4 服务器错误:', err);
});

udp4Server.on('listening', () => {
  const address = udp4Server.address();
  console.log(`UDP4 服务器监听 ${address.address}:${address.port}`);
});

// UDP6 服务器事件处理
udp6Server.on('message', (msg, rinfo) => {
  handleUDPMessage(msg, rinfo, udp6Server);
});

udp6Server.on('error', (err) => {
  console.error('UDP6 服务器错误:', err);
});

udp6Server.on('listening', () => {
  const address = udp6Server.address();
  console.log(`UDP6 服务器监听 ${address.address}:${address.port}`);
});

// 绑定两个 UDP 服务器到相同端口
const UDP_PORT = 41234;

// 使用 try-catch 分别启动两个服务器
try {
  udp4Server.bind(UDP_PORT);
} catch (error) {
  console.error('UDP4 服务器绑定失败:', error);
}

try {
  udp6Server.bind(UDP_PORT);
} catch (error) {
  console.error('UDP6 服务器绑定失败:', error);
}

// WebSocket 服务器处理
wss.on('connection', (ws) => {
  console.log('WebSocket 客户端已连接');

  const interval = setInterval(() => {
    const targets = Array.from(radarData.values());
    targets.forEach(target => {
      ws.send(JSON.stringify(target));
    });
  }, 500);

  ws.on('close', () => {
    console.log('WebSocket 客户端已断开');
    clearInterval(interval);
  });
});

// 优雅关闭服务器
process.on('SIGTERM', () => {
  console.log('正在关闭服务器...');
  udp4Server.close();
  udp6Server.close();
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket 服务器运行在端口 ${PORT}`);
});