<template>
  <div class="dashboard">
    <page-header title="Dashboard" />
    <div class="dashboard__wrapper page-content">
      <div class="dashboard__general-info general-info">
        <div
          v-for="card in cards"
          class="general-info__card card"
        >
          <div class="card__info">
            <div class="card__title">
              {{ card.title }}
              <el-tooltip
                :content="card.description"
                placement="top"
              >
                <el-icon><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="card__value">
              {{ dashboardInfo[card.code] }}
            </div>
          </div>
          <img
            :src="card.icon"
            alt="Icon"
            class="card__icon"
          >
        </div>
      </div>
      <div class="dashboard__charts">
        <div class="dashboard__bar-chart bar-chart">
          <div class="bar-chart__header">
            Penjualan dalam 6 Bulan Terakhir
          </div>
          <div class="bar-chart__content">
            <Bar
              :data="barChartData"
              :options="barChartOptions"
              id="bar-chart-id"
            />
          </div>
        </div>
        
        <div class="dashboard__bar-chart bar-chart">
          <div class="bar-chart__header">
            Progress Pembangunan Unit Per 6 Bulan
          </div>
          <div class="bar-chart__content">
            <Line
              :data="lineChartData"
              :options="lineChartOptions"
              id="line-chart-id"
            />
          </div>
        </div>
      </div>

      <!-- <div class="dashboard__charts">
        <div class="dashboard__bar-chart bar-chart">
          <div class="bar-chart__header">
            Penjualan dalam 6 Bulan Terakhir
          </div>
          <div class="bar-chart__content">
            <Bar
              :data="barChartData"
              :options="barChartOptions"
              id="bar-chart-id"
            />
          </div>
        </div>
        
        <div class="dashboard__bar-chart bar-chart">
          <div class="bar-chart__header">
            Progress Pembangunan Unit Per 6 Bulan
          </div>
          <div class="bar-chart__content">
            <Line
              :data="lineChartData"
              :options="lineChartOptions"
              id="line-chart-id"
            />
          </div>
        </div>

        <div class="dashboard__bar-chart bar-chart">
          <div class="bar-chart__header">
            Statistik Konsumen Berdasarkan Daerah
          </div>
          <div class="bar-chart__content">
            <Pie :data="usiaChart" :options="usiaChartOptions" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script src="./js/dashboard.js"></script>

<style lang="scss" scoped>
  @import "~/assets/scss/main.scss";

  .dashboard {
    .general-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .card {
        margin-bottom: 16px;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #EAEAEA;
        background: #FFF;
        box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
        width: calc((100% - 190px) / 3);
        display: flex;
        justify-content: space-between;

        &__title {
          color: #9D9D9D;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          gap: 5px;
          align-items: center;
        }

        &__value {
          color: #484848;
          font-size: 24px;
          font-weight: 600;
        }

        &__icon {
          height: 48px;
          width: 48px;
        }
      }
    }

    &__charts {
      margin-top: 36px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      
    }

    .bar-chart {
      background-color: white;
      width: calc((100% - 25px) / 2);
      border-radius: 12px;
      box-shadow: 0px 4px 8px 0px rgba(224, 224, 224, 0.20);
      border: 1px solid #EAEAEA;
    
      &__header {
        padding: 14px;
        color: #434343;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid #EAEAEA;
      }

      &__content {
        padding: 14px;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>