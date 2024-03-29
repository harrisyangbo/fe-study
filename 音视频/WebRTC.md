### WebRTC  通信原理

1. 媒体协商(彼此需要了解对方的媒体格式)
- 参与视频通信的双方必须先交换SDP信息，这个过程为媒体协商

2. 网络协商 candidate
- 获取外网IP地址映射
- 通过信令服务器交换网络信息
- 用于网络协商的两个常用协议: STUN 和 TURN 协议

协商需要一个信令服务器 SignalServer

#### WebRTC核心层又分为四层：
- WebRTC C C++ API (PeerConnection): 这层的API相对比较少，最主要就是实现P2P连接。在PeerConnection里面又包含了很多接口，如传输质量，传输质量报告，统计数据，各种流都是封装在PeerConnection模块里面。除此之外主要有音视频采集，音视频传输，非音视频数据传输等。
- Session Management/ Abstract signaling (Session): 会话层，用来管理音视频，非音视频数据传输，处理相关逻辑。
- 最核心的第三层，包含：音频引擎，视频引擎，传输，3大核心模块。
- 最底层是与硬件相关的硬件适配层：这层包含：音频的采集和渲染，视频的捕捉，网络IO。注意到上图中底层的这个三个模块都是画的虚线，表示这些模块是可以自己去实现的，可以重载的，这样大大增加WebRTC的灵活性，为跨平台提供了基础。

#### 实时传输协议IP，视频会议，远程呈现系统），多媒体流（视频点播，直播）和多媒体广播而设计的网络协议。它最初由RFC1889中的IETF指定。RTC最初是为了协助IETF音频-视频传输工作组涉及寄给地理上分散的成员的视频会议而创建的。目前，RFC3550中指定的v2是过去15年中一直在使用的v2。
- RTP的设计基于应用层框架和集成层处理的基本原理。它提供源和负载类型标识，流同步，丢包和重新排序以及媒体流监控。
- RTP使用RTP控制协议（RTCP）报告媒体流的性能。
- 在这个过程中，媒体发送端发送封装在RTP中的编码媒体。它还发送RTCP发送端报告，这有助于不同媒体流的额播放同步。接收端维护一个抖动缓冲区，对媒体数据包进行重新排序，并根据数据包中编码的定时信息进行播放。如果数据包丢失，接收端进行数据包恢复或者隐藏错误。最后，在RTCP接收端报告中接收机粗略或详细地对统计数据
- 实时传输协议（RTP）是专为多媒体电话（Vo进行报告，使媒体发送端能够调整其媒体编码速率，变成更好的编解码器或改变前向纠错量。