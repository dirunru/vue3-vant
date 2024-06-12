<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<el-cascader-panel
			v-model.value="value"
			style="width: fit-content"
			:options="options"
			class="reset-cascader-panel"
			:props="{
				expandTrigger: 'click',
				checkStrictly: false,
				emitPath: true, //决定勾选以及初始化选中数据结果
				value: 'value',
				label: 'label'
			}"
			@change="changeSelect"
		>
			<template #default="{ data }">
				<span>{{ data.label }}</span>
				<!-- 这里可以根据 node 或 data 自定义显示内容 -->
			</template>
		</el-cascader-panel>
		{{ value }}
	</div>
</template>

<script setup>
// 局部引入
import { ref } from "vue";

const value = ref("");
const changeSelect = (e) => {
	console.log("value", e);
};
const options = [
	{
		value: "guide",
		label: "Guide",
		children: [
			{
				value: "disciplines",
				label: "Disciplines-a",
				children: [
					{
						value: "consistency",
						label: "Consistency-a"
					},
					{
						value: "feedback",
						label: "Feedback"
					},
					{
						value: "efficiency",
						label: "Efficiency"
					},
					{
						value: "controllability",
						label: "Controllability"
					}
				]
			},
			{
				value: "navigation",
				label: "Navigation",
				children: [
					{
						value: "side nav",
						label: "Side Navigation"
					},
					{
						value: "top nav",
						label: "Top Navigation"
					}
				]
			}
		]
	},
	{
		value: "component",
		label: "Component",
		children: [
			{
				value: "basic",
				label: "Basic",
				children: [
					{
						value: "layout",
						label: "Layout"
					},
					{
						value: "color",
						label: "Color"
					},
					{
						value: "typography",
						label: "Typography"
					},
					{
						value: "icon",
						label: "Icon"
					},
					{
						value: "button",
						label: "Button"
					}
				]
			},
			{
				value: "form",
				label: "Form",
				children: [
					{
						value: "radio",
						label: "Radio"
					},
					{
						value: "checkbox",
						label: "Checkbox"
					},
					{
						value: "input",
						label: "Input"
					},
					{
						value: "input-number",
						label: "InputNumber"
					},
					{
						value: "select",
						label: "Select"
					},
					{
						value: "cascader",
						label: "Cascader"
					},
					{
						value: "switch",
						label: "Switch"
					},
					{
						value: "slider",
						label: "Slider"
					},
					{
						value: "time-picker",
						label: "TimePicker"
					},
					{
						value: "date-picker",
						label: "DatePicker"
					},
					{
						value: "datetime-picker",
						label: "DateTimePicker"
					},
					{
						value: "upload",
						label: "Upload"
					},
					{
						value: "rate",
						label: "Rate"
					},
					{
						value: "form",
						label: "Form"
					}
				]
			},
			{
				value: "data",
				label: "Data",
				children: [
					{
						value: "table",
						label: "Table"
					},
					{
						value: "tag",
						label: "Tag"
					},
					{
						value: "progress",
						label: "Progress"
					},
					{
						value: "tree",
						label: "Tree"
					},
					{
						value: "pagination",
						label: "Pagination"
					},
					{
						value: "badge",
						label: "Badge"
					}
				]
			},
			{
				value: "notice",
				label: "Notice",
				children: [
					{
						value: "alert",
						label: "Alert"
					},
					{
						value: "loading",
						label: "Loading"
					},
					{
						value: "message",
						label: "Message"
					},
					{
						value: "message-box",
						label: "MessageBox"
					},
					{
						value: "notification",
						label: "Notification"
					}
				]
			},
			{
				value: "navigation",
				label: "Navigation",
				children: [
					{
						value: "menu",
						label: "Menu"
					},
					{
						value: "tabs",
						label: "Tabs"
					},
					{
						value: "breadcrumb",
						label: "Breadcrumb"
					},
					{
						value: "dropdown",
						label: "Dropdown"
					},
					{
						value: "steps",
						label: "Steps"
					}
				]
			},
			{
				value: "others",
				label: "Others",
				children: [
					{
						value: "dialog",
						label: "Dialog"
					},
					{
						value: "tooltip",
						label: "Tooltip"
					},
					{
						value: "popover",
						label: "Popover"
					},
					{
						value: "card",
						label: "Card"
					},
					{
						value: "carousel",
						label: "Carousel"
					},
					{
						value: "collapse",
						label: "Collapse"
					}
				]
			}
		]
	},
	{
		value: "resource",
		label: "Resource",
		children: [
			{
				value: "axure",
				label: "Axure Components"
			},
			{
				value: "sketch",
				label: "Sketch Templates"
			},
			{
				value: "docs",
				label: "Design Documentation"
			}
		]
	}
];
</script>

<style lang='less' scoped>
@textColor: red;
@bgColor: yellow;

:deep(.reset-cascader-panel) {
	.el-cascader-menu {
		min-width: 33.3vw;
		&:nth-of-type(1) {
			.el-cascader-node {
				&.in-active-path,
				&.is-active,
				&.is-selectable.in-checked-path {
					color: @textColor;
					&::before {
						content: "";
						position: absolute;
						top: 4;
						left: 0;
						width: 3px;
						height: 24px;
						display: inline-block;
						background-color: @textColor;
					}
				}
			}
		}
		.el-icon {
			display: none;
		}
		// .el-cascader-node:not(.is-disabled):focus,
		// .el-cascader-node:not(.is-disabled):hover {

		// }
		// .el-cascader-node.in-active-path,
		// .el-cascader-node.is-active,
		// .el-cascader-node.is-selectable.in-checked-path {

		// }
	}
	.el-cascader-menu {
		.el-icon {
			display: none;
		}
		.el-cascader-node {
			padding: 0;
			position: relative;
			&:not(.is-disabled) {
				&:focus,
				&:hover {
					color: @textColor;
					background: @bgColor;
				}
			}
			&.in-active-path,
			&.is-active,
			&.is-selectable.in-checked-path {
				color: @textColor;
				.el-cascader-node__postfix {
					display: none;
				}
			}
		}
		// .el-cascader-node:not(.is-disabled):focus,
		// .el-cascader-node:not(.is-disabled):hover {

		// }
		// .el-cascader-node.in-active-path,
		// .el-cascader-node.is-active,
		// .el-cascader-node.is-selectable.in-checked-path {

		// }
	}
}
</style>
