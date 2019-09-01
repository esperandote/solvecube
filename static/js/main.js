//下面这些量需要被多个函数访问，故声明为全局变量
var scene = null;
var camera = null;
var renderer = null;
var group = null;
var id=null;
var direction='';//整体旋转方向，可取值'x+','x-','y+','y-',xy表示绕哪个轴旋转，+-代表顺逆时针
var colorSelected=0;//当前被选择的颜色，数字0～5代表蓝橙白红黄绿
var colorConvert=['4','5','1','6','2','3'];//后端接口，白黄绿蓝橙红分别用字符'1'~'6'，所以转化一下
//本来想改后端，无奈写得太丑，卒
var num=0;//转动次数，用于切换转动面时，顺时针90度为1，
var planesToColor=[];//可以被填色的块，即除中心块以外的所有块
var numConvert=[0,1,2,3,-1,4,5,6,7,8,9,10,20,-1,21,28,29,30,
  11,12,13,22,-1,23,31,32,33,14,15,16,24,-1,25,34,35,36,
  17,18,19,26,-1,27,37,38,39,40,41,42,43,-1,44,45,46,47];//编号转化，还是不想改后端..-1就是中心块的意思
var currentStep=0;//用于逐步演示复原动画时计数
var resultValid=false;//复原公式是否有效，防止复原后又打乱
var resultArr=[];//准备存储复原步骤
var side=new THREE.Group();//用于转动的一个面
var animating=false;//是否正在演示复原动画
var animatingByStep=false;//是否正在逐步演示复原动画

var planes=[];//二维数组，plane[i][j]为第i面的第j块（从0算起），面顺序为后左上右下前，面与块的顺序参考原网站
for(var i=0;i<6;i++){
  planes[i]=[];
}

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas')
  });
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);
  camera.position.set(0,0,9);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  var planeGeo=new THREE.PlaneGeometry(0.6,0.6);
  var colors=[0x3377ff,0xff7700,0xffffff,0xee1122,0xffff55,0x77ff55];
  var materials=[];
  for(var i=0;i<6;i++){
    materials[i]=new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: colors[i],
    	transparent: true,
    	opacity:0.9
    });
  }

  for(var i=0;i<6;i++){
    for(let j=0;j<9;j++){
      planes[i][j]=new THREE.Mesh(planeGeo, materials[i]);
    }
  }
  for(let j=0;j<9;j++){
    planes[0][j].rotateOnWorldAxis(x,-Math.PI/2);
    planes[0][j].position.y=1.5;
    planes[1][j].rotateOnWorldAxis(y,-Math.PI/2);
    planes[1][j].position.x=-1.5;
    planes[2][j].position.z=1.5;
    planes[3][j].rotateOnWorldAxis(y,Math.PI/2);
    planes[3][j].position.x=1.5;
    planes[4][j].rotateOnWorldAxis(y,Math.PI);
    planes[4][j].position.z=-1.5;
    planes[5][j].rotateOnWorldAxis(x,Math.PI/2);
    planes[5][j].position.y=-1.5;
  }
  for(var i=0;i<6;i++){
    if(i===0){
      planes[i][0].position.x=-0.8;
      planes[i][0].position.z=-0.8;
      planes[i][1].position.z=-0.8;
      planes[i][2].position.x=0.8;
      planes[i][2].position.z=-0.8;
      planes[i][3].position.x=-0.8;
      planes[i][5].position.x=0.8;
      planes[i][6].position.x=-0.8;
      planes[i][6].position.z=0.8;
      planes[i][7].position.z=0.8;
      planes[i][8].position.x=0.8;
      planes[i][8].position.z=0.8;
    }
    else if(i===1){
      planes[i][0].position.z=-0.8;
      planes[i][0].position.y=0.8;
      planes[i][1].position.y=0.8;
      planes[i][2].position.z=0.8;
      planes[i][2].position.y=0.8;
      planes[i][3].position.z=-0.8;
      planes[i][5].position.z=0.8;
      planes[i][6].position.z=-0.8;
      planes[i][6].position.y=-0.8;
      planes[i][7].position.y=-0.8;
      planes[i][8].position.z=0.8;
      planes[i][8].position.y=-0.8;
    }
    else if(i===2){
      planes[i][0].position.x=-0.8;
      planes[i][0].position.y=0.8;
      planes[i][1].position.y=0.8;
      planes[i][2].position.x=0.8;
      planes[i][2].position.y=0.8;
      planes[i][3].position.x=-0.8;
      planes[i][5].position.x=0.8;
      planes[i][6].position.x=-0.8;
      planes[i][6].position.y=-0.8;
      planes[i][7].position.y=-0.8;
      planes[i][8].position.x=0.8;
      planes[i][8].position.y=-0.8;
    }
    else if(i===3){
      planes[i][0].position.y=0.8;
      planes[i][0].position.z=0.8;
      planes[i][1].position.y=0.8;
      planes[i][2].position.y=0.8;
      planes[i][2].position.z=-0.8;
      planes[i][3].position.z=0.8;
      planes[i][5].position.z=-0.8;
      planes[i][6].position.y=-0.8;
      planes[i][6].position.z=0.8;
      planes[i][7].position.y=-0.8;
      planes[i][8].position.y=-0.8;
      planes[i][8].position.z=-0.8;
    }
    else if(i===4){
      planes[i][0].position.x=0.8;
      planes[i][0].position.y=0.8;
      planes[i][1].position.y=0.8;
      planes[i][2].position.x=-0.8;
      planes[i][2].position.y=0.8;
      planes[i][3].position.x=0.8;
      planes[i][5].position.x=-0.8;
      planes[i][6].position.x=0.8;
      planes[i][6].position.y=-0.8;
      planes[i][7].position.y=-0.8;
      planes[i][8].position.x=-0.8;
      planes[i][8].position.y=-0.8;
    }
    else if(i===5){
      planes[i][0].position.x=-0.8;
      planes[i][0].position.z=0.8;
      planes[i][1].position.z=0.8;
      planes[i][2].position.x=0.8;
      planes[i][2].position.z=0.8;
      planes[i][3].position.x=-0.8;
      planes[i][5].position.x=0.8;
      planes[i][6].position.x=-0.8;
      planes[i][6].position.z=-0.8;
      planes[i][7].position.z=-0.8;
      planes[i][8].position.x=0.8;
      planes[i][8].position.z=-0.8;
    }
  }

  for(let i=0;i<6;i++){
    for(let j=0;j<9;j++){
      if(j!=4){planesToColor.push(planes[i][j]);}
    }
  }

  //下面被注释掉的代码作用是显示坐标轴
  //var axes = new THREE.AxisHelper(10);
  //scene.add(axes);
  group = new THREE.Group();
  for(let i=0;i<6;i++){
    for(let j=0;j<9;j++){
      group.add(planes[i][j]);
    }
  }
  group.add(side);
  scene.add(group);
  group.rotateOnWorldAxis(x,-Math.PI/2);
  renderer.render(scene, camera);

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  function fillColor( event ) {
    if(animating===true){alert('动画演示过程中禁止填色!');}
    else{
    	// calculate mouse position in normalized device coordinates
    	// (-1 to +1) for both components
      mouse.x = ( event.offsetX /600) * 2 - 1;//若用clientX则scroll之后会出现问题
      mouse.y = - ( event.offsetY /600) * 2 + 1;
      // update the picking ray with the camera and mouse position
    	raycaster.setFromCamera( mouse, camera );
    	// calculate objects intersecting the picking ray
    	var intersects = raycaster.intersectObjects(planesToColor);
      if(intersects.length>0){
        intersects[0].object.material=materials[colorSelected];
      }
    	renderer.render( scene, camera );
    }
  }
  document.getElementById('mainCanvas').addEventListener('click',fillColor, false );
}

var x=new THREE.Vector3(1, 0, 0);
var y=new THREE.Vector3(0, 1, 0);
var z=new THREE.Vector3(0, 0, 1);
var count=0;
var rotatable=true;//确保一次转动结束后才能进行下一次转动

function setSide(str){//设置side里面的成员，str可能是'F','F'','F2','U'等等
  side=new THREE.Group();
  group.add(side);
  var num=['B','L','U','R','D','F'].indexOf(str[0]);//得到面的序号
  for(var i=0;i<9;i++){
    side.add(planes[num][i]);
  }
  if(num===0){
    for(var i=1;i<5;i++){
      for(var j=0;j<3;j++){side.add(planes[i][j]);}
    }
  }
  else if(num===1){
    for(var i of [0,2,5]){
      for(var j=0;j<7;j+=3){side.add(planes[i][j]);}
    }
    for(var i=2;i<9;i+=3){side.add(planes[4][i]);}
  }
  else if(num===2){
    for(var i=6;i<9;i++){side.add(planes[0][i]);}
    for(var i=2;i<9;i+=3){side.add(planes[1][i]);}
    for(var i=0;i<7;i+=3){side.add(planes[3][i]);}
    for(var i=0;i<3;i++){side.add(planes[5][i]);}
  }
  else if(num===3){
    for(var i of [0,2,5]){
      for(var j=2;j<9;j+=3){side.add(planes[i][j]);}
    }
    for(var i=0;i<7;i+=3){side.add(planes[4][i]);}
  }
  else if(num===4){
    for(var i=0;i<3;i++){side.add(planes[0][i]);}
    for(var i=0;i<7;i+=3){side.add(planes[1][i]);}
    for(var i=2;i<9;i+=3){side.add(planes[3][i]);}
    for(var i=6;i<9;i++){side.add(planes[5][i]);}
  }
  else if(num===5){
    for(var i=1;i<5;i++){
      for(var j=6;j<9;j++){side.add(planes[i][j]);}
    }
  }
  else{console.log('side num does not exist!');}
}

function i1(num){return((num-num%9)/9);}
function i2(num){return(num%9);}

function exchange(arr){//交换二维数组planes里面的元素，arr为二维数组，每个子数组为元素序号
  var len=arr[0].length;
  for(var i of arr){
    var tempM=planes[i1(i[len-1])][i2(i[len-1])].material;
    for(var j=len-1;j>0;j--){
      planes[i1(i[j])][i2(i[j])].material=planes[i1(i[j-1])][i2(i[j-1])].material;
    }
    planes[i1(i[0])][i2(i[0])].material=tempM;
  }
}

function rotate(str){//整体转动，输入一个字符串参数，'x+','x-','y+','y-'
  if(rotatable===true){
    direction=str;
    if(['B','L','U','R','D','F'].indexOf(str[0])!=-1){
      setSide(str[0]);//设置side里面的成员
    }
    id = requestAnimationFrame(draw);
  }
}

function draw(){
  if(count<40){
    rotatable=false;
    if(direction==='x+'){group.rotateOnWorldAxis(x,Math.PI/80);}
    else if(direction==='x-'){group.rotateOnWorldAxis(x,-Math.PI/80);}
    else if(direction==='y+'){group.rotateOnWorldAxis(y,Math.PI/80);}
    else if(direction==='y-'){group.rotateOnWorldAxis(y,-Math.PI/80);}
    else if(direction==='F'){side.rotateOnWorldAxis(y,Math.PI/80);}
    else if(direction==="F'"){side.rotateOnWorldAxis(y,-Math.PI/80);}
    else if(direction==='F2'){side.rotateOnWorldAxis(y,Math.PI/40);}
    else if(direction==='B'){side.rotateOnWorldAxis(y,-Math.PI/80);}
    else if(direction==="B'"){side.rotateOnWorldAxis(y,Math.PI/80);}
    else if(direction==='B2'){side.rotateOnWorldAxis(y,-Math.PI/40);}
    else if(direction==='L'){side.rotateOnWorldAxis(x,Math.PI/80);}
    else if(direction==="L'"){side.rotateOnWorldAxis(x,-Math.PI/80);}
    else if(direction==='L2'){side.rotateOnWorldAxis(x,Math.PI/40);}
    else if(direction==='R'){side.rotateOnWorldAxis(x,-Math.PI/80);}
    else if(direction==="R'"){side.rotateOnWorldAxis(x,Math.PI/80);}
    else if(direction==='R2'){side.rotateOnWorldAxis(x,-Math.PI/40);}
    else if(direction==='U'){side.rotateOnWorldAxis(z,-Math.PI/80);}
    else if(direction==="U'"){side.rotateOnWorldAxis(z,Math.PI/80);}
    else if(direction==='U2'){side.rotateOnWorldAxis(z,-Math.PI/40);}
    else if(direction==='D'){side.rotateOnWorldAxis(z,Math.PI/80);}
    else if(direction==="D'"){side.rotateOnWorldAxis(z,-Math.PI/80);}
    else if(direction==='D2'){side.rotateOnWorldAxis(z,Math.PI/40);}
    else{console.log('error in rotate direction!');}
    count++;
    renderer.render(scene, camera);
    id = requestAnimationFrame(draw);
  }
  else{
    //一次转动结束时，先转回去，然后轮换颜色，虽然看似什么也没有发生，实则妙不可言
    if(direction==='F'){
      side.rotateOnWorldAxis(y,-Math.PI/2);
      exchange([[45,47,53,51],[46,50,52,48],[15,24,33,42],[16,25,34,43],[17,26,35,44]]);
    }else if(direction==="F'"){
      side.rotateOnWorldAxis(y,Math.PI/2);
      exchange([[51,53,47,45],[48,52,50,46],[42,33,24,15],[43,34,25,16],[44,35,26,17]]);
    }else if(direction==='F2'){
      side.rotateOnWorldAxis(y,-Math.PI);
      exchange([[45,53],[46,52],[47,51],[48,50],[15,33],[16,34],[17,35],[24,42],[25,43],[26,44]]);
    }else if(direction==='B'){
      side.rotateOnWorldAxis(y,Math.PI/2);
      exchange([[0,2,8,6],[1,5,7,3],[36,27,18,9],[37,28,19,10],[38,29,20,11]]);
    }else if(direction==="B'"){
      side.rotateOnWorldAxis(y,-Math.PI/2);
      exchange([[6,8,2,0],[3,7,5,1],[9,18,27,36],[10,19,28,37],[11,20,29,38]]);
    }else if(direction==='B2'){
      side.rotateOnWorldAxis(y,Math.PI);
      exchange([[0,8],[2,6],[1,7],[5,3],[9,27],[18,36],[10,28],[19,37],[11,29],[20,38]]);
    }else if(direction==='L'){
      side.rotateOnWorldAxis(x,-Math.PI/2);
      exchange([[9,11,17,15],[10,14,16,12],[0,18,45,44],[3,21,48,41],[6,24,51,38]]);
    }else if(direction==="L'"){
      side.rotateOnWorldAxis(x,Math.PI/2);
      exchange([[15,17,11,9],[12,16,14,10],[44,45,18,0],[41,48,21,3],[38,51,24,6]]);
    }else if(direction==='L2'){
      side.rotateOnWorldAxis(x,-Math.PI);
      exchange([[15,11],[17,9],[12,14],[16,10],[44,18],[45,0],[41,21],[48,3],[38,24],[51,6]]);
    }else if(direction==='R'){
      side.rotateOnWorldAxis(x,Math.PI/2);
      exchange([[27,29,35,33],[28,32,34,30],[42,47,20,2],[39,50,23,5],[36,53,26,8]]);
    }else if(direction==="R'"){
      side.rotateOnWorldAxis(x,-Math.PI/2);
      exchange([[33,35,29,27],[30,34,32,28],[2,20,47,42],[5,23,50,39],[8,26,53,36]]);
    }else if(direction==='R2'){
      side.rotateOnWorldAxis(x,Math.PI);
      exchange([[33,29],[35,27],[30,32],[34,28],[2,47],[20,42],[5,50],[23,39],[8,53],[26,36]]);
    }else if(direction==='U'){
      side.rotateOnWorldAxis(z,Math.PI/2);
      exchange([[18,20,26,24],[19,23,25,21],[6,27,47,17],[7,30,46,14],[8,33,45,11]]);
    }else if(direction==="U'"){
      side.rotateOnWorldAxis(z,-Math.PI/2);
      exchange([[24,26,20,18],[21,25,23,19],[17,47,27,6],[14,46,30,7],[11,45,33,8]]);
    }else if(direction==='U2'){
      side.rotateOnWorldAxis(z,Math.PI);
      exchange([[24,20],[26,18],[21,23],[25,19],[17,27],[47,6],[14,30],[46,7],[11,33],[45,8]]);
    }else if(direction==='D'){
      side.rotateOnWorldAxis(z,-Math.PI/2);
      exchange([[36,38,44,42],[37,41,43,39],[29,0,15,53],[32,1,12,52],[35,2,9,51]]);
    }else if(direction==="D'"){
      side.rotateOnWorldAxis(z,Math.PI/2);
      exchange([[42,44,38,36],[39,43,41,37],[53,15,0,29],[52,12,1,32],[51,9,2,35]]);
    }else if(direction==='D2'){
      side.rotateOnWorldAxis(z,-Math.PI);
      exchange([[42,38],[44,36],[39,41],[43,37],[53,0],[15,29],[52,1],[12,32],[51,2],[9,35]]);
    }else{console.log('error in rotate direction!');}
    cancelAnimationFrame(id);
    id = null;
    count=0;
    rotatable=true;
  }
}

var colorNames=['blue','orange','white','red','yellow','green'];
document.getElementById('blue').innerHTML='√'
document.addEventListener('keypress',(event)=>{
  if(parseInt(event.key)<7){
    document.getElementById(colorNames[colorSelected]).innerHTML='';
    colorSelected=parseInt(event.key)-1;
    document.getElementById(colorNames[colorSelected]).innerHTML='√';
  }
  else if(animating===true&&['w','s','a','d'].indexOf(event.key)!=-1){
    alert('动画演示过程中禁止转动魔方!');
  }
  else{
    if(event.key==='w'){rotate('x-');}
    else if(event.key==='s'){rotate('x+');}
    else if(event.key==='a'){rotate('y-');}
    else if(event.key==='d'){rotate('y+');}
  }
});
document.getElementById('up').addEventListener('click',()=>{
  if(animating===true){alert('动画演示过程中禁止转动魔方!');}
  else{rotate('x-');}
});
document.getElementById('down').addEventListener('click',()=>{
  if(animating===true){alert('动画演示过程中禁止转动魔方!');}
  else{rotate('x+');}
});
document.getElementById('left').addEventListener('click',()=>{
  if(animating===true){alert('动画演示过程中禁止转动魔方!');}
  else{rotate('y-');}
});
document.getElementById('right').addEventListener('click',()=>{
  if(animating===true){alert('动画演示过程中禁止转动魔方!');}
  else{rotate('y+');}
});
document.getElementById('colors').addEventListener('click',(event)=>{
  document.getElementById(colorNames[colorSelected]).innerHTML='';
  if(event.target.id==='blue'){colorSelected=0;}
  else if(event.target.id==='orange'){colorSelected=1;}
  else if(event.target.id==='white'){colorSelected=2;}
  else if(event.target.id==='red'){colorSelected=3;}
  else if(event.target.id==='yellow'){colorSelected=4;}
  else if(event.target.id==='green'){colorSelected=5;}
  document.getElementById(colorNames[colorSelected]).innerHTML='√';
});
document.getElementById('buttons').addEventListener('click',(event)=>{
  if(animating===true){alert('请等待复原动画完毕再操作!');}
  else{
    if(event.target.id==='button1'&&animatingByStep===false){
      var cubeState=[];
      for(let i=0;i<54;i++){
        if(i%9!=4){
          //蓝橙白红黄绿的id分别为8～13
          cubeState[numConvert[i]]=colorConvert[planes[i1(i)][i2(i)].material.id-8]
        }
      }
      var strToSend='';
      for(let i=0;i<cubeState.length;i++){strToSend+=cubeState[i];}
      var ajax=new XMLHttpRequest();
      ajax.open('get','/_solve?state='+strToSend);
      ajax.send();
      ajax.onreadystatechange=function(){
        if(ajax.readyState==4&&ajax.status==200){
          var temp=JSON.parse(ajax.responseText).result;
          document.getElementById('result').innerHTML=JSON.parse(ajax.responseText).result;
          resultArr=[];
          var valid=true;
          for(var i=0;i<temp.length;i++){
            if(temp[i]==='<'){valid=false;}//这是为了排除掉<BR />标签
            if(valid===true&&['F','B','L','R','U','D'].indexOf(temp[i])!=-1){
              resultArr.push(temp[i]);
              if(i<temp.length-1&&(temp[i+1]==="'"||temp[i+1]==="2")){
                resultArr[resultArr.length-1]+=temp[i+1];
              }
            }
            if(temp[i]==='>'){valid=true;}
          }
          resultValid=true;
        }
      }}
    else if(event.target.id==='button2'){window.open('/helppage','_blank');}
    else if(event.target.id==='button3'&&animatingByStep===false){
      if(resultValid===false){alert('请重新计算复原公式!');}
      else if(resultArr.length>0){
        animating=true;//是否正在演示复原动画，若是则禁止填色
        for(let i=0;i<resultArr.length;i++){
          setTimeout(function(){
            rotate(resultArr[i]);
          },1000*i);
        }
        setTimeout(function(){
          animating=false;
          resultValid=false;
        },1000*resultArr.length);
      }
    }
    else if(event.target.id==='button4'){
      if(resultValid===false){alert('请重新计算复原公式!');}
      else if(resultArr.length>0&&currentStep<resultArr.length){
        currentStep++;
        animatingByStep=true;
        setTimeout(function(){
          rotate(resultArr[currentStep-1]);
        },0);
        setTimeout(function(){
          if(currentStep>=resultArr.length){
            currentStep=0;
            animatingByStep=false;
            resultValid=false;
          }
        },1000)//启动转最后一步后一秒解除封禁
      }
    }
    else{console.log('error!');}
  }
});
