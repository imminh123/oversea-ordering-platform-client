import { CssBaseline, Container, Box, Card, CardContent } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet-async';
import { useGetStat } from './api/useGetStat';
import Spinner from 'app/layout/async/Spinner';

interface Props {}
interface DashboardStat {
  series: { data: number[] }[];
}

export const HomePage: React.FC<Props> = () => {
  const { data, isLoading } = useGetStat();
  const [state, setState] = useState<DashboardStat>({
    series: [
      {
        data: [],
      },
    ],
  });

  const options: ApexOptions = {
    colors: ['#3C50E0'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Đơn trong giỏ hàng',
        'Tổng đơn hàng',
        'Đơn đặt hàng',
        'Đơn chờ thanh toán',
        'Đơn thanh toán thành công',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inter',

      markers: {
        radius: 99,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
    },
  };
  useEffect(() => {
    if (data?.data && !isLoading) {
      setState({
        series: [
          {
            data: Object.values(data?.data),
          },
        ],
      });
    }
  }, [data, isLoading]);
  return (
    <React.Fragment>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <CssBaseline />
      <Container className='mt-5'>
        {data?.data && !isLoading && (
          <Box className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5'>
            <Box className='col-span-12'>
              <Box className='col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5'>
                <Box>
                  <h3 className='text-xl font-semibold mt-1'>Thống kê đơn hàng</h3>
                </Box>

                <Box className='mb-2'>
                  <Box id='order-stat' className='-ml-5'>
                    <ReactApexChart options={options} series={state.series} type='bar' height={350} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {isLoading && (
          <Card variant='elevation'>
            <CardContent>
              <Box>
                <Spinner />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
};
