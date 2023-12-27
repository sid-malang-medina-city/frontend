<template>
  <div class="dashboard">
    <page-header
      title="Dashboard"
      filter
      @filter-click="toggleFilterModal"
    />
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
      </div> -->

      <!-- <div class="dashboard__filter-chart-title">
        Filter Widget
      </div>
      <div class="dashboard__filter-chart-wrapper">
        <el-select
          v-model="visibleCharts"
          placeholder="Filter Widget"
          class="dashboard__filter-chart"
          position="bottom-left"
          multiple
        >
          <el-option
            v-for="chart in charts"
            :key="chart"
            :label="chart"
            :value="chart"
          />
        </el-select>
      </div> -->
      <div class="dashboard__charts">
        <div
          v-if="visibleCharts.includes('Penjualan 6 Bulan Terakhir')"
          class="dashboard__bar-chart bar-chart"
        >
          <div class="bar-chart__header">
            <div class="bar-chart__header-text">
              Penjualan Unit
            </div>
            <div class="bar-chart__filter-wrapper">
              <el-date-picker
                v-model="filterPenjualan"
                :clearable="false"
                :shortcuts="shortcuts"
                type="monthrange"
                range-separator="-"
                start-placeholder="Start month"
                end-placeholder="End month"
                format="MM-YYYY"
                value-format="YYYY-MM"
                class="bar-chart__filter"
                unlink-panels
                @change="handleFilterPenjualanChange"
              />
            </div>          
          </div>
          <div class="bar-chart__content">
            <Bar
              :data="barChartData"
              :options="barChartOptions"
              id="bar-chart-id"
            />
          </div>
        </div>
        
        <div
          v-if="visibleCharts.includes('Progress Pembangunan Unit')"
          class="dashboard__bar-chart bar-chart"
        >
          <div class="bar-chart__header">
            <div class="bar-chart__header-text">
              Progress Pembangunan Unit
            </div>
            <div class="bar-chart__filter-wrapper">
              <el-date-picker
                v-model="filterPembangunan"
                :clearable="false"
                :shortcuts="shortcuts"
                type="monthrange"
                range-separator="-"
                start-placeholder="Start month"
                end-placeholder="End month"
                format="MM-YYYY"
                value-format="YYYY-MM"
                class="bar-chart__filter"
                unlink-panels
                @change="handleFilterPembangunanChange"
              />
            </div>
          </div>
          <div class="bar-chart__content">
            <Line
              :data="lineChartData"
              :options="lineChartOptions"
              id="line-chart-id"
            />
          </div>
        </div>

        <div
          v-if="visibleCharts.includes('Demografi Usia')"
          class="dashboard__bar-chart bar-chart"
        >
          <div class="bar-chart__header">
            Demografi Usia
          </div>
          <div class="bar-chart__content">
            <Pie :data="usiaChart" :options="pieChartOptions" />
          </div>
        </div>
        
        <div
          v-if="visibleCharts.includes('Demografi Gaji')"
          class="dashboard__bar-chart bar-chart"
        >
          <div class="bar-chart__header">
            Demografi Gaji
          </div>
          <div class="bar-chart__content">
            <Pie :data="gajiChart" :options="pieChartOptions" />
          </div>
        </div>
        
        <div
          v-if="visibleCharts.includes('Demografi Kota')"
          class="dashboard__bar-chart bar-chart"
        >
          <div class="bar-chart__header">
            Demografi Wilayah
          </div>
          <div class="bar-chart__content">
            <Pie :data="kotaChart" :options="pieChartOptions" />
          </div>
        </div>

        <div
          v-if="visibleCharts.includes('Demografi Alasan')"
          class="dashboard__bar-chart bar-chart"
        >
          <div class="bar-chart__header">
            Demografi Alasan
          </div>
          <div class="bar-chart__content">
            <Pie :data="alasanChart" :options="pieChartOptions" />
          </div>
        </div>

        <div
          v-if="visibleCharts.includes('Demografi Pekerjaan')"
          class="dashboard__bar-chart bar-chart"
        >
          <div class="bar-chart__header">
            Demografi Pekerjaan
          </div>
          <div class="bar-chart__content">
            <Pie :data="pekerjaanChart" :options="pieChartOptions" />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="visibleFilterModal"
      title="Filter Bagan"
      width="20%"
    >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetFilterChart">
            Reset
          </el-button>
          <el-button
            type="primary"
            @click="updateFilterChart"
          >
            Simpan
          </el-button>
        </span>
      </template>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        class="dashboard__check-all"
        @change="handleCheckAllChange"
      >
        Pilih semua
      </el-checkbox
      >
      <el-checkbox-group
        v-model="checkedCharts"
        class="dashboard__check-group"
        @change="handleCheckedChartsChange"
      >
        <el-checkbox
          v-for="chart in charts"
          :key="chart"
          :label="chart"
        >
          {{ chart }}
        </el-checkbox>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>

<script src="./js/dashboard.js"></script>

<style lang="scss" scoped>
  @import "~/assets/scss/main.scss";

  .dashboard {
    &__filter-chart-title {
      font-weight: 600;
      margin-bottom: 10px;
    }

    &__filter-chart-wrapper {
      display: flex;
      justify-content: end;
    }
    
    &__filter-chart {
      width: 100%;
      margin-bottom: 20px;
    }

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
        display: flex;
        justify-content: space-between;
        align-items: center;
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

      &__filter-wrapper {
        width: 180px;
      }
    }

    &__check-all {
      width: 100%;
      border-bottom: 1px solid #E9E9E9;
    }

    &__check-group {
      display: flex;
      flex-direction: column;
    }

    :deep(.el-range-editor) {
      box-sizing: border-box;
      width: 180px;
    }
  }
</style>