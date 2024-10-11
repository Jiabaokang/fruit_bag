<template>
	<!-- http://localhost:5173/#/pages_raffle/detail/detail -->
	<view class="detailPage">
		<view class="main" :style="{paddingTop:getStatusBarHeight()+'px'}">
			<view class="titleBar" :style="{height:getTitleBarHeight()+'px'}">
				<view class="menu">
					<view class="item" @click="goBack()" v-if="pagesRoute.length>1">
						<uni-icons type="left" size="22" color="#fff"></uni-icons>
					</view>
					<view class="item" @click="routerTo('/pages_raffle/list/list','redirect')">
						<uni-icons type="home-filled" size="22"  color="#fff"></uni-icons>						
					</view>
				</view>
				<view class="userInfo">
					<view class="avatar">
						<image src="../../static/defAvatar.jpg" mode="aspectFill"></image>
					</view>
					<view class="name">
						匿名
					</view>
				</view>
			</view>
			
			<view class="statusGroup" @click="clickStatus">
				<view v-if="true" class="add btn"> <text>点击\n参与</text> </view>
				<view v-if="false" class="noStart btn">未开始</view>
				<view v-if="false" class="start btn">进行中</view>
				<view v-if="false" class="end btn">已结束</view>
			</view>
			
			<view class="count">
				<view class="text">
					已有 <text class="big">10</text>人参与
				</view>
				<view class="group">
					<view class="pic" v-for="(item,index) in 6" :key="index" :style="{zIndex:6-index}">
						<image src="../../static/logo.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="item">
				<view class="title">—— 奖品奖项 ——</view>
				<view class="content">
					<view class="row" v-for="item in 3">
						<view class="pic" @click="clickAwardPic">
							<image src="../../static/logo.png" mode="aspectFill"></image>
						</view>
						<view class="text">
							<view class="name">一等奖（10名）</view>
							<view class="descrition">iPhone15</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item rule">
				<view class="title">—— 规则说明 ——</view>
				<view class="content">
					<!-- <text>
						1.点击参与报名参加活动；\n
						2.参与后无需额外操作，等待主办方发起抽奖；\n
						3.抽奖成功后会将抽奖结果返回，可在右上角点击查看；\n
						4.将获奖记录给现场工作人员核销后，领取对应的奖品。
					</text> -->
				</view>
			</view>
			
		</view>
		<view class="footer">
			<view class="copyright">
				<!-- <text>
					抽奖活动为学习交流使用\n
					不会发放真实的奖品\n
					最终解释权归主办方©咸虾米所有
				</text> -->
				
			</view>			
		</view>
	
		
		<view class="menuBar">
			<view class="group" :style="{opacity:menuState?1:0,transform:menuState?'scaleY(1)':'scaleY(0)'}">
				<view class="item" hover-class="hoverItem" 
				@click="routerTo('/pages_raffle/logs/logs')">
					<uni-icons type="gift-filled" size="26"></uni-icons>
					<view class="text">中奖记录</view>
				</view>
				
				<view class="item" hover-class="hoverItem">
					<uni-icons type="undo-filled" size="26"></uni-icons>
					<view class="text">分享抽奖</view>
				</view>
				
				<view class="item" hover-class="hoverItem" @click="routerTo(`/pages_raffle/edit/edit`)">
					<uni-icons type="gear-filled" size="26"></uni-icons>
					<view class="text">设置编辑</view>
				</view>
				
				<view class="item" hover-class="hoverItem" @click="routerTo(`/pages_raffle/play/play`)">
					<uni-icons type="paperplane-filled" size="26"></uni-icons>
					<view class="text">抽奖管理</view>
				</view>
				
				<view class="item" hover-class="hoverItem">
					<uni-icons type="scan" size="30"></uni-icons>
					<view class="text">扫码核销</view>
				</view>
			</view>
			<view class="close" @click="closeMenu">
				<uni-icons type="closeempty" size="20" color="#fff" v-if="menuState"></uni-icons>
				<uni-icons type="list" size="20" color="#fff" v-else></uni-icons>
			</view>
		</view>
		
	</view>
	
	<uni-popup ref="runPopup" :is-mask-click="false" mask-background-color="rgba(0,0,0,0.8)">
		<view class="runPopup">
			<view class="turntable">
				<image src="https://soupcdn.qingnian8.com/projectImg/raffle/turntable-rotate.png" mode="aspectFill"></image>
			</view>
		</view>
	</uni-popup>
	
	<uni-popup ref="resultPopup" :is-mask-click="false" mask-background-color="rgba(0,0,0,0.8)">
		<view class="resultPopup">
			<view class="bg win" v-if="true">
				<view class="text">一等奖</view>
			</view>
			<view class="bg loser" v-else></view>
			<view class="close" @click="closeResult">
				<image src="https://soupcdn.qingnian8.com/projectImg/raffle/close.png" mode="aspectFill"></image>
			</view>
		</view>
	</uni-popup>
	
	
</template>

<script setup>
import { ref } from "vue";
import { goBack,routerTo } from "../../utils/common";
import {getStatusBarHeight,getTitleBarHeight} from "@/utils/system.js"


const pagesRoute = ref(getCurrentPages())
const menuState = ref(true);
const runPopup = ref(null);
const resultPopup = ref(null);


//点击状态按钮
const clickStatus = ()=>{
	runPopup.value.open();
	// resultPopup.value.open();
}


//点击奖项图片
const clickAwardPic = ()=>{
	uni.previewImage({
		urls:['https://mp-c502f21b-273c-4c6c-be6e-fb2a9f29eed9.cdn.bspapp.com/project/raffleBg.webp']
	})
}

//菜单状态切换
const closeMenu = ()=>{
	menuState.value = !menuState.value
}

//关闭反馈弹窗
const closeResult = ()=>{
	resultPopup.value.close();
}

</script>

<style lang="scss" scoped>
.detailPage{
	min-height: 100vh;
	background: #ee4626;
	.main{
		height: 1566rpx;
		background: url("https://mp-c502f21b-273c-4c6c-be6e-fb2a9f29eed9.cdn.bspapp.com/project/raffleBg.webp") no-repeat center top;
		background-size: contain;
		position: relative;		
		.titleBar{			
			width:fit-content;
			display: flex;
			align-items: center;
			height: 100%;
			.menu{
				display: flex;
				align-items: center;
				background: rgba(0,0,0,0.6);
				border-radius: 200rpx;
				height: 80%;
				margin-left: 30rpx;
				.item{
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					aspect-ratio: 1 / 1;
				}
			}
			.userInfo{
				display: flex;
				align-items: center;
				margin-left:30rpx;
				height: 100%;
				.avatar{
					height: 80%;
					aspect-ratio: 1 / 1;
					border-radius: 50%;
					overflow: hidden;
					border:2px solid #fff;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					padding-left:15rpx;
					color:#fff;
					font-size: 36rpx;
					font-weight: bolder;
				}
			}
		}
	
		.statusGroup{
			width: 200rpx;
			height: 200rpx;			
			position: absolute;
			top:856rpx;
			left:50%;
			transform: translateX(-100rpx);
			.btn{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				color:#fff;
				font-size: 46rpx;
				font-weight: bolder;
			}
			.add{
				background: #e02800;
				position: relative;
				animation: anim1 1s infinite;
				&::after{
					content: "";
					display: block;
					width: 100%;
					height: 100%;
					border:5px solid #e02800;
					position: absolute;
					top:0;
					left:0;					
					border-radius: 50%;
					box-sizing: border-box;	
					animation: anim2 1s infinite;
				}
			}
			.end{
				color:#db2b00;
			}
			
		}
		
		
		.count{
			position: absolute;
			top:1330rpx;			
			width: 100%;
			text-align: center;
			.text{
				font-size: 34rpx;
				.big{
					font-weight: bolder;
				}
			}
			.group{
				display: flex;
				align-items: center;
				justify-content: center;
				transform: translateX(8rpx);
				padding-top:10rpx;
				.pic{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					overflow: hidden;
					border:2px solid #fff;
					margin-left:-15rpx;
					box-shadow: 0 0 10rpx rgba(0,0,0,0.3);
					position: relative;					
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		
		
	}
	.body{
		min-height: 200rpx;
		background: url("https://mp-c502f21b-273c-4c6c-be6e-fb2a9f29eed9.cdn.bspapp.com/project/raffle-repeat.jpg") repeat-y center;
		background-size: contain;
		padding:0 70rpx;
		.title{
			font-size: 50rpx;
			color:#e02800;
			font-weight: bolder;
			text-align: center;
		}
		.content{
			padding:40rpx 0;
		}
		.item{
			padding-bottom:20rpx;
			&:last-child{
				padding-bottom: 0;
			}
			&.rule{
				.content{
					font-size: 40rpx;
					line-height: 1.8em;
				}
			}
			.content{
				.row{
					display: flex;
					align-items: center;
					padding-bottom: 30rpx;					
					&:last-child{
						padding-bottom: 0;
					}
					.pic{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						overflow: hidden;
						border:1px solid #e02800;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.text{
						padding-left:20rpx;
						.name{
							font-size: 38rpx;
							font-weight: bolder;
						}
						.descrition{
							font-size: 32rpx;
							color:#888;
							padding-top: 10rpx;
						}
					}
				}
			}
		}
	}
	.footer{
		min-height: 200rpx;
		background: url("https://mp-c502f21b-273c-4c6c-be6e-fb2a9f29eed9.cdn.bspapp.com/project/raffle-footer.jpg") no-repeat center top;
		background-size: contain;
		.copyright{			
			font-size: 28rpx;
			text-align: center;
			line-height: 1.8em;
			padding:140rpx 0 60rpx;
			color:#fff;
			opacity: 0.8;
		}
	}



	.menuBar{
		position: fixed;
		top:50%;
		transform: translateY(-50%);
		right: 15rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		.group{
			display: grid;
			gap:30rpx;
			transition: 0.3s;
			transform-origin: bottom center;
			.item{
				background: #F9EB00;
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border:2px solid #000;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				box-shadow: 0 0 15rpx rgba(0,0,0,0.6);
				.text{
					font-size: 23rpx;
					transform: scale(0.85);
				}
			}
			.hoverItem{
				transform: scale(0.95);
			}
		}
		.close{
			width: 70rpx;
			height: 70rpx;
			background: rgba(0,0,0,0.9);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;
			line-height: 1em;
		}
	}
}

.runPopup{
	width: 744rpx;
	height: 1016rpx;
	background: url("https://soupcdn.qingnian8.com/projectImg/raffle/turntable.png") no-repeat center;
	background-size: cover;
	position: relative;
	.turntable{
		width: 522rpx;
		height: 522rpx;
		position: absolute;
		top:69rpx;
		left:111rpx;
		animation: rotate 1s infinite linear;
		image{
			width: 100%;
			height: 100%;
		}
	}
}

.resultPopup{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom:150rpx;
	.bg{
		background: no-repeat center;
		background-size: cover;
		position: relative;
	}
	.win{
		width: 750rpx;
		height: 855rpx;
		background-image:url('https://soupcdn.qingnian8.com/projectImg/raffle/win.png');
		.text{
			line-height: 120rpx;
			text-align: center;			
			position: absolute;
			width: 100%;
			top:725rpx;
			left: 0;
			color:#fff;
			font-size: 46rpx;
			font-weight: bolder;
		}
	}
	.loser{
		width: 561rpx;
		height: 528rpx;
		background-image:url('https://soupcdn.qingnian8.com/projectImg/raffle/loser.png');
	}
	.close{
		width: 90rpx;
		height: 90rpx;
		margin-top: 80rpx;		
		padding:10rpx;
		box-sizing: content-box;
		image{
			width: 100%;
			height: 100%;
		}
	}
}


@keyframes anim1{
	0%{
		transform: scale(1);
	}
	50%{
		transform: scale(1.1);
	}
	100%{
		transform: scale(1);
	}
}
@keyframes anim2{
	0%{
		transform: scale(1);
		border-width: 5px;
	}
	100%{
		transform: scale(1.6);
		border-width: 1px;
		opacity: 0;
	}
}

@keyframes rotate{
	0%{
		transform: rotate(0);
	}
	100%{
		transform: rotate(360deg);
	}
}

</style>
