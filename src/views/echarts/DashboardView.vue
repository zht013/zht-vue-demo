<script setup lang="ts">
import AppCharts from '@/components/AppCharts.vue'
import {
  getVuejsCommits,
  getVuejsCommitsStat,
  getVuejsForks,
  getVuejsIssues,
  getVuejsRepository,
  getVuejsStargazers,
} from '@/services/githubService'
import type { EChartsOption } from 'echarts'
import { BarChart, LineChart } from 'echarts/charts'
import { AxisPointerComponent, LegendComponent, ToolboxComponent } from 'echarts/components'
import { NCard, NDataTable, NNumberAnimation, useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const totalIssues = ref(0)
const totalForks = ref(0)
const totalStargazers = ref(0)
const commitsTableData = ref<Record<string, string>[]>([])
const isTableDataLoading = ref(true)
const lineChartOption = (color: string): EChartsOption => ({
  grid: {
    top: '5%',
    left: 0,
    bottom: 0,
    right: 0,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    show: false,
    type: 'category',
  },
  yAxis: {
    show: false,
    type: 'value',
  },
  series: [
    {
      name: '总数',
      type: 'line',
      symbol: 'none',
      smooth: true,
      color,
      tooltip: {},
    },
  ],
})
const forksChartOption = shallowRef<EChartsOption>({})
const issuesChartOption = shallowRef<EChartsOption>({})
const stargazersChartOption = shallowRef<EChartsOption>({})

const barChartOption = (): EChartsOption => ({
  legend: {
    left: 'center',
  },
  grid: {
    top: '17%',
    left: '2%',
    bottom: '18%',
    right: 20,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  yAxis: [
    {
      name: '总量',
      type: 'value',
      position: 'left',
    },
  ],
  series: [
    {
      name: '总量',
      type: 'bar',
      encode: {
        tooltip: ['count', 'date'],
      },
    },
  ],
})
const commitsStatChartOption = shallowRef<EChartsOption>({})

onMounted(() => {
  getVuejsRepository().then((data) => {
    totalForks.value = data?.forksCount
    totalIssues.value = data?.issuesCount
    totalStargazers.value = data?.stargazersCount
  })

  getVuejsForks().then((data) => {
    const option = lineChartOption('#41b6ff')
    option.dataset = {
      dimensions: ['date', 'count'],
      source: data,
    }

    forksChartOption.value = option
  })

  getVuejsIssues().then((data) => {
    const option = lineChartOption('#e85f33')
    option.dataset = {
      dimensions: ['date', 'count'],
      source: data,
    }

    issuesChartOption.value = option
  })

  getVuejsStargazers().then((data) => {
    const option = lineChartOption('#26ce83')
    option.dataset = {
      dimensions: ['date', 'count'],
      source: data,
    }

    stargazersChartOption.value = option
  })

  getVuejsCommitsStat().then((data) => {
    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: (value) => {
          return value % 2 !== 0
        },
        formatter: function (value, index) {
          return `{key${index}| }\n{value| ${value}}`
        },
        margin: 10,
        rich: {
          value: {
            lineHeight: 20,
          },
        },
      },
    }

    data.forEach((item, index) => {
      xAxis.axisLabel!.rich!['key' + index] = {
        height: 30,
        align: 'center',
        backgroundColor: {
          image: item.avatarUrl as string,
        },
      }
    })

    const option = barChartOption()
    option.xAxis = xAxis
    option.dataset = {
      dimensions: ['name', 'count', 'date'],
      source: data,
    }

    commitsStatChartOption.value = option
  })

  getVuejsCommits().then((data) => {
    commitsTableData.value = data
    isTableDataLoading.value = false
  })
})

const tableColumns = [
  {
    title: '姓名',
    key: 'name',
    width: '10rem',
    render(row: Record<string, string>) {
      return [
        h('img', {
          src: row.avatarUrl,
          loading: 'lazy',
          style: {
            height: '4rem',
            width: '4rem',
          },
        }),
        row.name,
      ]
    },
  },
  {
    title: '邮箱',
    key: 'email',
    width: '20rem',
  },
  {
    title: '提交信息',
    key: 'message',
  },
  {
    title: '日期',
    key: 'date',
    width: '12rem',
  },
]
</script>

<template>
  <div
    class="v-root"
    :style="{
      '--box-shadow': themeVars.boxShadow4,
    }"
  >
    <div class="line-charts">
      <NCard class="card" title="Forks" size="small">
        <div class="card-wrapper">
          <p class="count">
            Total <br />
            <NNumberAnimation :from="0" :to="totalForks" />
          </p>
          <AppCharts
            class="chart"
            :option="forksChartOption"
            :extensions="[LineChart, AxisPointerComponent, LegendComponent, ToolboxComponent]"
          />
        </div>
      </NCard>
      <NCard class="card" title="Issues" size="small">
        <div class="card-wrapper">
          <p class="count">
            Total <br />
            <NNumberAnimation :from="0" :to="totalIssues" />
          </p>
          <AppCharts
            class="chart"
            :option="issuesChartOption"
            :extensions="[LineChart, AxisPointerComponent, LegendComponent, ToolboxComponent]"
          />
        </div>
      </NCard>
      <NCard class="card" title="Stargazers" size="small">
        <div class="card-wrapper">
          <p class="count">
            Total <br />
            <NNumberAnimation :from="0" :to="totalStargazers" />
          </p>
          <AppCharts
            class="chart"
            :option="stargazersChartOption"
            :extensions="[LineChart, AxisPointerComponent, LegendComponent, ToolboxComponent]"
          />
        </div>
      </NCard>
    </div>
    <NCard class="card" title="提交信息">
      <AppCharts class="bar-chart" :option="commitsStatChartOption" :extensions="[BarChart]" />
    </NCard>
    <NCard class="card" title="数据列表">
      <NDataTable
        remote
        :loading="isTableDataLoading"
        :columns="tableColumns"
        :data="commitsTableData"
        max-height="30rem"
      />
    </NCard>
  </div>
</template>

<style scoped>
.v-root {
  & > div {
    margin-bottom: 1.8rem;
  }
}

.card {
  box-shadow: var(--box-shadow);
}

.line-charts {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  & > div {
    flex: 1;
    min-width: 30rem;
    height: 20rem;
  }

  .card-wrapper {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    overflow: hidden;
  }

  .chart {
    flex: 1;
  }

  .count {
    width: 6rem;
    font-weight: 500;
    font-size: 1.6rem;
    flex-shrink: 0;
  }
}

.bar-chart {
  height: 40rem;
}
</style>
