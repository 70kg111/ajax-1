console.log("这里是main.js");

//挑战1：用一个按钮来验证AJAX加载CSS功能是否成功
getCSS.onclick = () => {
  //创建 HttpRequset对象
  const request = new XMLHttpRequest();
  //调用open方法，确定method和url，一般用GET来获取数据
  request.open("GET", "/style.css");
  //监听成功或者失败
  request.onload = () => {
    console.log("getCSS成功了");
    //request.response 可以获取响应内容
    console.log(request.response);
    //创建style标签
    const style = document.createElement("style");
    //填写style内容
    style.innerHTML = request.response;
    //把style查到head里面去，让style生效
    document.head.appendChild(style);
  };
  request.onerror = () => {
    console.log("getCSS失败了");
  };
  //发送请求，用send方法
  request.send();
};

//挑战2：用一个按钮来验证AJAX加载JS功能是否成功
getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.js");
  request.onload = () => {
    console.log("getJS成功了");
    //刚才是创建style标签来让CSS生效，那么这里就可以创建script标签让js生效
    const script = document.createElement("script");
    script.innerHTML = request.response;
    document.body.appendChild(script);
  };
  request.onerror = () => {
    console.log("getJS失败了");
  };
  request.send();
};

//挑战3：用一个按钮来验证AJAX加载HTML功能是否成功，这里使用onreadystatechange来做判断，不用onload和onerror
getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.html");
  request.onreadystatechange = () => {
    //readyState判断页面是否下载完成，但不知道成功还是失败
    if (request.readyState === 4) {
      //console.log("readystate状态码是：");
      //console.log(request.readyState);
      //status状态码判断功能是否正常，2开头的状态码都是成功，3开头会发送一个新的请求，4和5开头的一般都是失败
      if (request.status >= 200 && request.status < 300) {
        console.log("getHTML成功了");
        //同理，创建一个div，把响应内容放到这个div里面让html生效
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      } else {
        alert("getHTML失败了");
      }
    }
  };

  request.send();
};

//挑战4：用一个按钮来验证AJAX加载XML功能是否成功
getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/4.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        console.log("getXML成功了");
        //这个AJAX最出名的地方就是可以实现xml文件的自动转化，responseXML会将xml代码自动转换成字符串，但JSON代替了XML语言
        const dom = request.responseXML;
        const text = dom.getElementsByTagName("warning")[0].textContent.trim();
        console.log(text);
      } else {
        alert("getXML失败了");
      }
    }
  };
  request.send();
};

//挑战5：用一个按钮来验证AJAX加载JSON功能是否成功
getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        //JSON.parse会把符合JSON语法的字符串，转化为对应的对象
        const json = JSON.parse(request.response);
        console.log(json);
      }
    }
  };
  request.send();
};

//挑战6：添加下一页
let n = 1;
getPAGE.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${n + 1}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        //展示第二页的数据的方法：先拿到数据，把数据变为数组
        const array = JSON.parse(request.response);
        //然后对这个数据进行遍历，每一项都插到li里面去，再把li拼接到之前的ul里面就可以
        array.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item.id;
          xxx.appendChild(li);
        });
      }
    }
  };
  n += 1;
  request.send();
};
