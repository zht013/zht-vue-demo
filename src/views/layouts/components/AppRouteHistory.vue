<script setup lang="ts">
import { useEventBus, useResizeObserver } from '@vueuse/core'
import type { AppMenu } from '@/types'
import { useMenuStore } from '@/stores/menu'
import { NButton, NDropdown, NIcon, useThemeVars, type DropdownOption } from 'naive-ui'
import { useAppI18n } from '@/composables/appI18n'
import { EventKeys } from '@/constants/keys'

const router = useRouter()
const { t } = useAppI18n()
const themeVars = useThemeVars()
const { currentMenu, rootMenu } = storeToRefs(useMenuStore())
const showLeftButton = ref(false)
const showRightButton = ref(false)
const tabListRef = useTemplateRef('tabListRef')
const slideBlockElementRef = useTemplateRef('slideBlockElementRef')
const tabsWrapperRef = useTemplateRef<HTMLElement>('tabsWrapperRef')
const routeHistories = ref<AppMenu[]>([mapToHistoryMenu(currentMenu.value)])
const activeTabElement = computed(() => {
  return tabListRef.value?.find((t) => t.getAttribute('name') === currentMenu.value?.key)
})
const disableCloseOtherTabs = computed(() => {
  return routeHistories.value.length < 2
})

useResizeObserver(
  () => [tabsWrapperRef.value, activeTabElement.value],
  () => {
    setTabsBarState()
  },
)

watch(currentMenu, async () => {
  if (!routeHistories.value.some((r) => r.key === currentMenu.value?.key)) {
    routeHistories.value.push(mapToHistoryMenu(currentMenu.value))
  }

  setTabsBarState()
})

function mapToHistoryMenu(targetMenu: AppMenu | undefined) {
  const rootMenuLabel = rootMenu.value?.label
  const targetMenuLabel = targetMenu?.label

  return {
    ...targetMenu,
    children: undefined,
    title: () => {
      return (
        (typeof rootMenuLabel === 'function' ? rootMenuLabel() : rootMenuLabel) +
        ' - ' +
        (typeof targetMenuLabel === 'function' ? targetMenuLabel() : targetMenuLabel)
      )
    },
  }
}

/** 关闭其它 tab 标签页 */
const handleOtherTabsClose = () => {
  if (disableCloseOtherTabs.value) return

  routeHistories.value = routeHistories.value.filter((r) => r.key === currentMenu.value?.key)

  setTabsBarState()
}

/** tab 的点击事件 */
const handleTabClick = (targetMenuKey: string | undefined) => {
  if (targetMenuKey !== currentMenu.value?.key) {
    const targetMenu = routeHistories.value.find((r) => r.key === targetMenuKey)
    if (targetMenu) {
      router.push({
        name: targetMenu.routeName,
      })
    }
  }
}

/** 关闭 tab 标签页 */
const handleTabClose = (targetMenuKey: string | undefined) => {
  const targetTabIndex = routeHistories.value.findIndex((r) => r.key === targetMenuKey)
  const nextTab = routeHistories.value.at(targetTabIndex - 1)

  routeHistories.value = routeHistories.value.filter((r) => r.key !== targetMenuKey)

  if (currentMenu.value?.key === targetMenuKey && nextTab) {
    router.push({
      name: nextTab.routeName,
    })
  } else {
    setTabsBarState()
  }
}

/** 向右滚动 */
const handleRightBtnClick = () => {
  const tabsWrapperElement = tabsWrapperRef.value
  if (tabsWrapperElement) {
    const rightPosition = tabsWrapperElement.scrollLeft + tabsWrapperElement.clientWidth
    const rightElement = tabListRef.value?.find(
      (tab) => tab?.offsetLeft + tab?.offsetWidth > rightPosition,
    )

    if (rightElement) {
      tabsWrapperElement.scrollTo({
        left: rightElement.offsetLeft,
      })
    }
  }
}

/** 向左滚动 */
const handleLeftBtnClick = () => {
  const tabsWrapperElement = tabsWrapperRef.value
  if (tabsWrapperElement) {
    const scrollLeft = tabsWrapperElement.scrollLeft
    const leftElement = tabListRef.value?.find(
      (tab) => tab?.offsetLeft + tab?.offsetWidth >= scrollLeft,
    )

    if (leftElement) {
      const leftPosition =
        scrollLeft -
        tabsWrapperElement.clientWidth +
        leftElement.offsetWidth -
        (scrollLeft - leftElement.offsetLeft)
      tabsWrapperElement.scrollTo({
        left: leftPosition > 0 ? leftPosition : 0,
      })
    }
  }
}

/** 刷新页面 */
const eventBus = useEventBus(EventKeys.refreshView)
const handleRefreshPage = () => {
  eventBus.emit()
}

/** 判断是否显示左右滚动按钮 */
function checkShowLeftAndRightBtn() {
  const tabsWrapperElement = tabsWrapperRef.value

  if (tabsWrapperElement) {
    const totalTabsWidth = tabListRef.value?.reduce((totalWidth, currentItem) => {
      return totalWidth + currentItem.offsetWidth
    }, 0)
    showLeftButton.value = showRightButton.value = totalTabsWidth! > tabsWrapperElement.clientWidth
  }
}

/** 滚动到激活的 tab */
function scrollToActiveTab() {
  const currentTab = routeHistories.value.find((r) => r.key === currentMenu.value?.key)
  const activeTabElement = tabListRef.value?.find(
    (tabRef) => tabRef.getAttribute('name') === currentTab?.key,
  )
  const slideBlockElement = slideBlockElementRef.value
  const tabsWrapperElement = tabsWrapperRef.value

  if (activeTabElement && slideBlockElement && tabsWrapperElement) {
    slideBlockElement.style.left = `${activeTabElement.offsetLeft}px`
    slideBlockElement.style.width = `${activeTabElement.offsetWidth}px`

    if (
      activeTabElement.offsetLeft < tabsWrapperElement.scrollLeft ||
      activeTabElement.offsetLeft + activeTabElement.offsetWidth >
        tabsWrapperElement.scrollLeft + tabsWrapperElement.clientWidth
    ) {
      activeTabElement.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      })
    }
  }
}

/** 检查和设置 tab 工具栏的各种状态 */
async function setTabsBarState(time?: number) {
  await nextTick()

  setTimeout(async () => {
    checkShowLeftAndRightBtn()
    await nextTick()
    scrollToActiveTab()
  }, time || 0)
}

const dropdownOptions = computed<DropdownOption[]>(() => [
  {
    label: t('label.refreshCurrentPage'),
    key: 'close current',
    props: {
      onClick: handleRefreshPage,
    },
  },
  {
    label: t('label.closeOtherTabs'),
    key: 'close others',
    disabled: disableCloseOtherTabs.value,
    props: {
      onClick: handleOtherTabsClose,
    },
  },
])
</script>

<template>
  <div
    class="route-tabs-root"
    :style="{
      '--border-color': themeVars.borderColor,
      '--bg-color': themeVars.bgColor1,
    }"
  >
    <NButton v-if="showLeftButton" @click="handleLeftBtnClick" class="left-btn">
      <NIcon>
        <IconIonChevronBack />
      </NIcon>
    </NButton>

    <div ref="tabsWrapperRef" class="tabs-wrapper scroll-hide">
      <!-- 选中状态背景 -->
      <div ref="slideBlockElementRef" class="slide-block"></div>

      <!-- tab 标签 -->
      <div
        v-for="menu in routeHistories"
        ref="tabListRef"
        :name="menu.key"
        :key="menu.key"
        class="tab"
        :class="{
          active: currentMenu?.key === menu.key,
        }"
      >
        <button
          class="item"
          type="button"
          @click="handleTabClick(menu.key)"
          :title="typeof menu.title === 'function' ? menu.title() : menu.title"
        >
          {{ typeof menu.label === 'function' ? menu.label() : menu.label }}
        </button>
        <button
          v-if="routeHistories.length > 1"
          type="button"
          :title="t('title.close')"
          class="close"
          @click="handleTabClose(menu.key)"
        >
          <IconIonCloseOutline />
        </button>
      </div>
    </div>

    <NButton v-if="showRightButton" @click="handleRightBtnClick" class="right-btn">
      <NIcon>
        <IconIonChevronForward />
      </NIcon>
    </NButton>

    <NDropdown :options="dropdownOptions">
      <NButton>
        <NIcon>
          <IconIonChevronDown />
        </NIcon>
      </NButton>
    </NDropdown>
  </div>
</template>

<style scoped>
.route-tabs-root {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  background: var(--bg-color);
  border-radius: 0.4rem;
  border: 1px solid var(--border-color);
  height: 3.6rem;
}

.tabs-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  padding: 0.4rem 0;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.left-btn,
.right-btn {
  padding: 0 0.6rem;
}

.left-btn {
  margin-right: 0.2rem;
}

.right-btn {
  margin-left: 0.2rem;
}

.slide-block {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgb(130, 130, 130, 0.1);
  transition-property: left, width;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.4rem;
  z-index: -1;
}

.tab {
  flex-shrink: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  position: relative;
  opacity: 0.7;
  transition: opacity 200ms ease;

  &:hover,
  &.active {
    opacity: 1;

    .item {
      transform: translateX(0);
    }

    .close {
      transform: scale(1);
    }
  }

  .item {
    background: none;
    border: none;
    padding: 0.4rem 1rem;
    cursor: pointer;
    transform: translateX(0.6rem);
    line-height: 1;
    transition: transform 200ms ease 200ms;
  }

  .close {
    transform: scale(0);
    transition:
      transform 200ms ease 200ms,
      opacity 200ms ease;
    background: none;
    border: none;
    line-height: 1;
    padding: 0.3rem;
    position: relative;
    z-index: 1;
    left: -0.4rem;
    cursor: pointer;
    border-radius: 1rem;
    opacity: 0.6;

    &:hover {
      opacity: 1;
      transform: scale(1.5);
      transition-delay: 0;
    }
  }
}
</style>
