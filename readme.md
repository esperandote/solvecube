## web应用功能:

在调色板输入魔方状态,传输到服务器,后台计算复原公式,返回并显示.

## 包含文件:

### /cube.py 
定义了魔方状态的表达方式,实现了18种基本操作. 
do(state,a):对state状态操作a公式. 
locatee(color1,color2):通过颜色定位棱块. 
locatec(color1,color2,color3):通过颜色定位角块. 
convert(state):将前端传来的用字符串表达的魔方状态,转换成用数组表达. 

### /main.py 
调用了cube.py 
solve(state):解出state状态的复原公式. 

### /solvecube.py 
整个项目的入口.调用了cube.py,main.py以及flask有关模块. 

### /docube.py 
另一个项目的入口,可选择无视. 

### /test.py 
调试专用. 

### /templates/fillcolor.html 
主页面 

### /statics/css/mystyle.css 
主页面的样式表 
