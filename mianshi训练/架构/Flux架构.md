Flux 是以单向数据流的方式支持MVC, 单向数据流是 Flux 的核心

flux架构下一共有四类模块角色，按照交互顺序依次是:

- Component/View: 你可以把组件(Component)理解为View与Controller的结合，它既展现数据，同时也处理用户的交互请求。不同于MVC的Controller直接调用模型层业务逻辑处理接口，flux上来自用户的操作或者请求最终会映射为对应的Action，交由Action进行下一步处理。另一点需要注意的是View同时也监听着Store中数据的更改事件，一旦发生更改则重新请求数据。

- Action：描述组件触发的操作，包括名称和数据，比如 { 'actionType': 'delete', 'data':item}

- Dispatcher: flux的中央枢纽(central hub)，所有的Action都会交由Dispatcher进行处理。Dispatcher在接收到Action之后，调用Store注册在Action上的回调函数。需要注意与MVC中Controller不同的是，Dispatcher是不包含业务逻辑的，它机械的像一座桥，一个路由器，所以它能被别的程序复用当然也能被别的Dispatcher替换。

- Store：包含程序的数据与业务逻辑。和MVC的Model比较，Store有一些不易被察觉但又非常重要的差异：MVC中的每一个model即对应着一个领域模型；而flux中的一个Store自己并不是一个领域模型，而是可能包含多个模型。 最重要的是 ，只有store自己知道如何修改数据，它并不对外直接提供操作数据的接口(但是提供查询数据的接口)，action和dispatcher没法操作store.

一个简单的flux流程我们可以这么描述：用户在View上的操作最终会映射为一类Action，Action传递给Dispatcher，再由Dispatcher执行注册在指定Action上的回调函数。最终完成对Store的操作。如果Store中的数据发生了更改，则触发数据更改的事件，View监听着这些时间，并对这些事件做出反应（比如重新查询数据）。

<p><code>Flux</code>最初是用于正确导出数据，比如如果我们要显示一系列消息的未读数字，而另外一个视图显示的是所有消息，其中未读的消息会高亮显示。这种情况使用<code>MVC</code>很难处理，将一个消息变为已读状态需要更新消息模型，然后再需要更新未读的计数模型(将未读模型数字减1，因为刚发生一个已读改变)，这种依赖和级联更新经常发生在大型<code>MVC</code>应用，导致一个混乱的数据流编织和不可预知的结果。</p>