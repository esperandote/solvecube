
#encoding:utf-8

'''
现规定:F前面(绿),B后面(蓝),L左面(橙),R右面(红),U上面(白),D下面(黄).
用数组保存魔方的状态.数组共有40个元素,前12个对应12个棱块,中间8个对应8个角块,后20个对应朝向.

12个棱块(位置)编号如下:
1:UB 2:UL 3:UR 4:UF
5:LB 6:RB 7:LF 8:RF
9:DB 10:DL 11:DR 12:DF

8个角块(位置)编号如下:
1:ULB 2:URB 3:ULF 4:URF
5:DLB 6:DRB 7:DLF 8:DRF

定义:UD为高级面(白黄为高级色),FB为中级面(绿蓝为中级色),LR为低级面(橙红为低级色)

棱块朝向规定如下:
较高级的色位于较高级的面,则朝向正确.

角块朝向规定如下:
高级色位于高级面,则朝向=0;
高级色位于中级面,则朝向=1;
高级色位于低级面,则朝向=2;
'''

def rotate(state,a,b,c,d):
	sd=state[d]
	state[d]=state[c]
	state[c]=state[b]
	state[b]=state[a]
	state[a]=sd

def rotate1(state,a,b,c,d):#U/D/L/R面棱块轮換（考虑朝向）
	rotate(state,a,b,c,d)
	sd=state[d+20]
	state[d+20]=state[c+20]
	state[c+20]=state[b+20]
	state[b+20]=state[a+20]
	state[a+20]=sd
	
def rotateturn(state,a,b,c,d):#F/B面棱块轮换（考虑朝向）
	rotate(state,a,b,c,d)
	sd=state[d+20]
	state[d+20]=1-state[c+20]
	state[c+20]=1-state[b+20]
	state[b+20]=1-state[a+20]
	state[a+20]=1-sd

def rotatem(state,a,b,c,d):#
	rotate(state,a+12,b+12,c+12,d+12)
	sd=state[d+32]
	state[d+32]=2-state[c+32]
	state[c+32]=2-state[b+32]
	state[b+32]=2-state[a+32]
	state[a+32]=2-sd
	
def h(a):
	if(a==0):
		return 0
	else:
		return 3-a
	
def rotateh(state,a,b,c,d):#
	rotate(state,a+12,b+12,c+12,d+12)
	sd=state[d+32]
	state[d+32]=h(state[c+32])
	state[c+32]=h(state[b+32])
	state[b+32]=h(state[a+32])
	state[a+32]=h(sd)
	
def lo(a):
	if(a==2):
		return 2
	else:
		return 1-a
	
def rotatel(state,a,b,c,d):#
	rotate(state,a+12,b+12,c+12,d+12)
	sd=state[d+32]
	state[d+32]=lo(state[c+32])
	state[c+32]=lo(state[b+32])
	state[b+32]=lo(state[a+32])
	state[a+32]=lo(sd)

def switch(state,a,b):
	t=state[a]
	state[a]=state[b]
	state[b]=t
	t=state[a+20]
	state[a+20]=state[b+20]
	state[b+20]=t
	
#F面旋转	
def F(state):
	rotateturn(state,3,7,11,6)
	rotatem(state,2,3,7,6)
	
def f(state):
	rotateturn(state,3,6,11,7)
	rotatem(state,3,2,6,7)

def f2(state):
	switch(state,3,11)
	switch(state,6,7)
	switch(state,14,19)
	switch(state,15,18)
	
#U面旋转	
def U(state):
	rotate1(state,0,2,3,1)
	rotateh(state,0,1,3,2)
	
def u(state):
	rotate1(state,0,1,3,2)
	rotateh(state,1,0,2,3)
	
def u2(state):
	switch(state,0,3)
	switch(state,1,2)
	switch(state,12,15)
	switch(state,13,14)
	
#R面旋转
def R(state):
	rotate1(state,2,5,10,7)
	rotatel(state,3,1,5,7)
	
def r(state):
	rotate1(state,2,7,10,5)
	rotatel(state,1,3,7,5)
	
def r2(state):
	switch(state,2,10)
	switch(state,7,5)
	switch(state,15,17)
	switch(state,13,19)
	
#D面旋转
def D(state):
	rotate1(state,11,10,8,9)
	rotateh(state,6,7,5,4)
	
def d(state):
	rotate1(state,11,9,8,10)
	rotateh(state,7,6,4,5)
	
def d2(state):
	switch(state,11,8)
	switch(state,9,10)
	switch(state,16,19)
	switch(state,17,18)

#L面旋转
def L(state):
	rotate1(state,1,6,9,4)
	rotatel(state,0,2,6,4)
	
def l(state):
	rotate1(state,1,4,9,6)
	rotatel(state,2,0,4,6)
	
def l2(state):
	switch(state,1,9)
	switch(state,6,4)
	switch(state,12,18)
	switch(state,14,16)
	
#B面旋转	
def B(state):
	rotateturn(state,0,4,8,5)
	rotatem(state,1,0,4,5)
	
def b(state):
	rotateturn(state,0,5,8,4)
	rotatem(state,0,1,5,4)
	
def b2(state):
	switch(state,0,8)
	switch(state,4,5)
	switch(state,13,16)
	switch(state,12,17)

def do(state,a):
	operations=[]
	for i in range(0,len(a)):
		if(a[i]!='2'):
			if(i==len(a)-1):
				operations.append(a[i])
			elif(a[i+1]!='2'):
				operations.append(a[i])
			elif(a[i+1]=='2'):
				operations.append(a[i]+a[i+1])
	for i in operations:
		if(i=='F'):
			F(state)
		elif(i=='f'):
			f(state)
		elif(i=='f2'):
			f2(state)
		elif(i=='U'):
			U(state)
		elif(i=='u'):
			u(state)
		elif(i=='u2'):
			u2(state)
		elif(i=='R'):
			R(state)
		elif(i=='r'):
			r(state)
		elif(i=='r2'):
			r2(state)
		elif(i=='L'):
			L(state)
		elif(i=='l'):
			l(state)
		elif(i=='l2'):
			l2(state)
		elif(i=='D'):
			D(state)
		elif(i=='d'):
			d(state)
		elif(i=='d2'):
			d2(state)
		elif(i=='B'):
			B(state)
		elif(i=='b'):
			b(state)
		elif(i=='b2'):
			b2(state)
		else:
			state[0]=-100
	
def locatee(color1,color2):#确定一个棱块,在此须保证color1,color2的取值为'1'/'2'/'3'/'4'/'5'/'6',实际上也是能保证的,就不写验证惹
	if(color1=='1'):
		if(color2=='3'):
			return [4,0]#数组第1个值表棱块编号,若前者色较高级则第2个值为0,否则为1;余同
		elif(color2=='4'):
			return [1,0]
		elif(color2=='5'):
			return [2,0]
		elif(color2=='6'):
			return [3,0]
		else:
			return False
	elif(color1=='2'):
		if(color2=='3'):
			return [12,0]
		elif(color2=='4'):
			return [9,0]
		elif(color2=='5'):
			return [10,0]
		elif(color2=='6'):
			return [11,0]
		else:
			return False
	elif(color1=='3'):
		if(color2=='1'):
			return [4,1]
		elif(color2=='2'):
			return [12,1]
		elif(color2=='5'):
			return [7,0]
		elif(color2=='6'):
			return [8,0]
		else:
			return False
	elif(color1=='4'):
		if(color2=='1'):
			return [1,1]
		elif(color2=='2'):
			return [9,1]
		elif(color2=='5'):
			return [5,0]
		elif(color2=='6'):
			return [6,0]
		else:
			return False
	elif(color1=='5'):
		if(color2=='1'):
			return [2,1]
		elif(color2=='2'):
			return [10,1]
		elif(color2=='3'):
			return [7,1]
		elif(color2=='4'):
			return [5,1]
		else:
			return False
	elif(color1=='6'):
		if(color2=='1'):
			return [3,1]
		elif(color2=='2'):
			return [11,1]
		elif(color2=='3'):
			return [8,1]
		elif(color2=='4'):
			return [6,1]
		else:
			return False
	else:
		return False

def locatec(color1,color2,color3):#统一:高级面color1,中级面color2,低级面color3
	if(color1=='1'):
		if(color2=='3'):
			if(color3=='5'):
				return [3,0]
			if(color3=='6'):
				return [4,0]
			else:
				return False
		elif(color2=='4'):
			if(color3=='5'):
				return [1,0]
			if(color3=='6'):
				return [2,0]
			else:
				return False
		elif(color2=='5'):
			if(color3=='3'):
				return [3,0]
			if(color3=='4'):
				return [1,0]
			else:
				return False
		elif(color2=='6'):
			if(color3=='3'):
				return [4,0]
			if(color3=='4'):
				return [2,0]
			else:
				return False
		else:
			return False
	elif(color1=='2'):
		if(color2=='3'):
			if(color3=='5'):
				return [7,0]
			if(color3=='6'):
				return [8,0]
			else:
				return False
		elif(color2=='4'):
			if(color3=='5'):
				return [5,0]
			if(color3=='6'):
				return [6,0]
			else:
				return False
		elif(color2=='5'):
			if(color3=='3'):
				return [7,0]
			if(color3=='4'):
				return [5,0]
			else:
				return False
		elif(color2=='6'):
			if(color3=='3'):
				return [8,0]
			if(color3=='4'):
				return [6,0]
			else:
				return False
		else:
			return False
	elif(color1=='3'):
		if(color2=='1'):
			if(color3=='5'):
				return [3,1]
			if(color3=='6'):
				return [4,1]
			else:
				return False
		elif(color2=='2'):
			if(color3=='5'):
				return [7,1]
			if(color3=='6'):
				return [8,1]
			else:
				return False
		elif(color2=='5'):
			if(color3=='1'):
				return [3,2]
			if(color3=='2'):
				return [7,2]
			else:
				return False
		elif(color2=='6'):
			if(color3=='1'):
				return [4,2]
			if(color3=='2'):
				return [8,2]
			else:
				return False
		else:
			return False
	elif(color1=='4'):
		if(color2=='1'):
			if(color3=='5'):
				return [1,1]
			if(color3=='6'):
				return [2,1]
			else:
				return False
		elif(color2=='2'):
			if(color3=='5'):
				return [5,1]
			if(color3=='6'):
				return [6,1]
			else:
				return False
		elif(color2=='5'):
			if(color3=='1'):
				return [1,2]
			if(color3=='2'):
				return [5,2]
			else:
				return False
		elif(color2=='6'):
			if(color3=='1'):
				return [2,2]
			if(color3=='2'):
				return [6,2]
			else:
				return False
		else:
			return False
	elif(color1=='5'):
		if(color2=='1'):
			if(color3=='3'):
				return [3,1]
			if(color3=='4'):
				return [1,1]
			else:
				return False
		elif(color2=='2'):
			if(color3=='3'):
				return [7,1]
			if(color3=='4'):
				return [5,1]
			else:
				return False
		elif(color2=='3'):
			if(color3=='1'):
				return [3,2]
			if(color3=='2'):
				return [7,2]
			else:
				return False
		elif(color2=='4'):
			if(color3=='1'):
				return [1,2]
			if(color3=='2'):
				return [5,2]
			else:
				return False
		else:
			return False
	elif(color1=='6'):
		if(color2=='1'):
			if(color3=='3'):
				return [4,1]
			if(color3=='4'):
				return [2,1]
			else:
				return False
		elif(color2=='2'):
			if(color3=='3'):
				return [8,1]
			if(color3=='4'):
				return [6,1]
			else:
				return False
		elif(color2=='3'):
			if(color3=='1'):
				return [4,2]
			if(color3=='2'):
				return [8,2]
			else:
				return False
		elif(color2=='4'):
			if(color3=='1'):
				return [2,2]
			if(color3=='2'):
				return [6,2]
			else:
				return False
		else:
			return False
	else:
		return False
	
def convert(state):
	result=[0 for i in range(0,40)]
	if(len(state)!=48):
		return False
	t=locatee(state[12],state[6])
	if(t!=False):
		result[0]=t[0]
		result[20]=t[1]
	else:
		return False
	t=locatee(state[22],state[21])
	if(t!=False):
		result[1]=t[0]
		result[21]=t[1]
	else:
		return False
	t=locatee(state[23],state[24])
	if(t!=False):
		result[2]=t[0]
		result[22]=t[1]
	else:
		return False
	t=locatee(state[32],state[41])
	if(t!=False):
		result[3]=t[0]
		result[23]=t[1]
	else:
		return False
	t=locatee(state[3],state[9])
	if(t!=False):
		result[4]=t[0]
		result[24]=t[1]
	else:
		return False
	t=locatee(state[4],state[15])
	if(t!=False):
		result[5]=t[0]
		result[25]=t[1]
	else:
		return False
	t=locatee(state[43],state[29])
	if(t!=False):
		result[6]=t[0]
		result[26]=t[1]
	else:
		return False
	t=locatee(state[44],state[35])
	if(t!=False):
		result[7]=t[0]
		result[27]=t[1]
	else:
		return False
	t=locatee(state[18],state[1])
	if(t!=False):
		result[8]=t[0]
		result[28]=t[1]
	else:
		return False
	t=locatee(state[27],state[20])
	if(t!=False):
		result[9]=t[0]
		result[29]=t[1]
	else:
		return False
	t=locatee(state[26],state[25])
	if(t!=False):
		result[10]=t[0]
		result[30]=t[1]
	else:
		return False
	t=locatee(state[38],state[46])
	if(t!=False):
		result[11]=t[0]
		result[31]=t[1]
	else:
		return False
	t=locatec(state[11],state[5],state[10])
	if(t!=False):
		result[12]=t[0]
		result[32]=t[1]
	else:
		return False
	t=locatec(state[13],state[7],state[14])
	if(t!=False):
		result[13]=t[0]
		result[33]=t[1]
	else:
		return False
	t=locatec(state[31],state[40],state[30])
	if(t!=False):
		result[14]=t[0]
		result[34]=t[1]
	else:
		return False
	t=locatec(state[33],state[42],state[34])
	if(t!=False):
		result[15]=t[0]
		result[35]=t[1]
	else:
		return False
	t=locatec(state[19],state[0],state[8])
	if(t!=False):
		result[16]=t[0]
		result[36]=t[1]
	else:
		return False
	t=locatec(state[17],state[2],state[16])
	if(t!=False):
		result[17]=t[0]
		result[37]=t[1]
	else:
		return False
	t=locatec(state[39],state[45],state[28])
	if(t!=False):
		result[18]=t[0]
		result[38]=t[1]
	else:
		return False
	t=locatec(state[37],state[47],state[36])
	if(t!=False):
		result[19]=t[0]
		result[39]=t[1]
	else:
		return False
	
	check=[0 for i in range(0,20)]#检查是否每个棱块/角块只出现一次
	for i in range(0,12):
		check[result[i]-1]+=1
	for i in range(12,20):
		check[result[i]+11]+=1
	for i in check:
		if(i!=1):
			return False
		
	return result
