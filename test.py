
#encoding:utf-8

import main
'''
operations=[]
a='RFdd2lDrDbdRbr2'
for i in range(0,len(a)):
	if(a[i]!='2'):
		if(i==len(a)-1):
			operations.append(a[i])
		elif(a[i+1]!='2'):
			operations.append(a[i])
		elif(a[i+1]=='2'):
			operations.append(a[i]+a[i+1])
print(operations)


import cube
state=[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
cube.do(state,'lURuLUru')
print(state)
'''

'''
#向文档写入样式
f=open('p.txt','a')
for a  in ['1','2','3','4']:
	for b in ['1','2','3','4']:
		if(b!=a):
			for c in ['1','2','3','4']:
				if(c!=a and c!=b):
					for d in ['1','2','3','4']:
						for e in ['1','2','3','4']:
							if(e!=d):		
								linetowrite='['+a+','+b+','+c+','+d+','+e+'',''],\n''#还得加一对引号
								f.write(linetowrite)
f.close()
'''

for a  in range(1,5):
	for b in range(1,5):
		if(b!=a):
			for c in range(1,5):
				if(c!=a and c!=b):
					for d in range(1,5):
						for e in range(1,5):
							if(e!=d):
								state=[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
								state[0]=a
								state[1]=b
								state[2]=c
								state[3]=10-a-b-c
								state[12]=d
								state[13]=e
								for i in range(1,5):
									if(i!=d and i!=e):
										i1=i
										break
								i2=10-d-e-i1
								state[14]=i1
								state[15]=i2
								t=0
								main.solve(state)
								if(state[0]==1 and state[1]==2 and state[2]==3 and state[3]==4 and state[12]==1 and state[13]==2 and state[14]==3 and state[15]==4):
									t=t+1
								#
								state=[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
								state[0]=a
								state[1]=b
								state[2]=c
								state[3]=10-a-b-c
								state[12]=d
								state[13]=e
								state[14]=i2
								state[15]=i1
								main.solve(state)
								if(state[0]==1 and state[1]==2 and state[2]==3 and state[3]==4 and state[12]==1 and state[13]==2 and state[14]==3 and state[15]==4):
									t=t+1
								if(t==1):
									print(str(a)+str(b)+str(c)+str(d)+str(e)+'ok')
								else:
									print(str(a)+str(b)+str(c)+str(d)+str(e)+'wrong!!!')


'''
for i in range(0,2):
	for j in range(0,2):
		for k in range(0,2):
			for i1 in range(0,3):
				for j1 in range(0,3):
					for k1 in range(0,3):
						state=[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
						state[20]=i
						state[21]=j
						state[22]=k
						state[23]=(i+j+k)%2 #根据魔方的性质
						state[32]=i1
						state[33]=j1
						state[34]=k1
						state[35]=(3-i1+j1+k1)%3 #根据魔方的性质
						main.solve(state)
						if(state[20]==0 and state[21]==0 and state[22]==0 and state[32]==0 and state[33]==0 and state[34]==0):
							print(str(i)+str(j)+str(k)+str(i1)+str(j1)+str(k1)+'ok')
						else:
							print(str(i)+str(j)+str(k)+str(i1)+str(j1)+str(k1)+'wrong!!!')
'''

'''
operation='rulLu2r2bFr2'
def simplify(operation):
	listo=[i for i in operation]
	lists=[]
	for i in range(0,len(listo)-1):
		if(listo[i]!='2' and listo[i+1]!='2'):
			lists.append(listo[i])
		if(listo[i]!='2' and listo[i+1]=='2'):
			lists.append(listo[i]+'2')
	if(listo[len(listo)-1]!='2'):
		lists.append(listo[len(listo)])				
	return lists
print(simplify(operation))
'''		
