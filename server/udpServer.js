const dgram = require('dgram');
const udpServer = dgram.createSocket('udp4');

udpServer.on('error', (err) => {
  console.error(`UDP server error:\n${err.stack}`);
  udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
  console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  // 处理接收到的雷达数据
  const data = JSON.parse(msg);
  // 这里可以将数据存储到某个共享数据结构中，供WebSocket服务器使用
});

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`UDP server listening ${address.address}:${address.port}`);
});

udpServer.bind(41234); // 绑定到指定端口